/* ═══════════════════════════════════════════════════════════════════════════
   FACULTY ACTIVITY TRACKER — GOOGLE APPS SCRIPT (v4.0)
   © 2025 Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)
   SKR & SKR Government College for Women (Autonomous), Kadapa, AP

   SETUP:
   1. script.google.com → New Project → paste this entire file into Code.gs
   2. Deploy → New Deployment → Web App → Execute as: Me → Anyone → Deploy
   3. Copy Web App URL → paste in Tracker → Reports → Generate Report

   FOLDER STRUCTURE CREATED:
   Google Drive /
   └── Faculty_Activity_Reports /
       └── 2025-26 /
           └── AP01 — FDPs Attended /
               ├── FDP_on_AI_Tools_20250612.pdf    ← one PDF per entry
               ├── FDP_on_ML_Workshop_20250715.pdf
               └── ...
           └── AP11 — Journal Papers /
               ├── Paper_on_Data_Mining_....pdf
               └── ...
═══════════════════════════════════════════════════════════════════════════ */

var ROOT_FOLDER_NAME = "Faculty_Activity_Reports";
var COLLEGE_NAME     = "SKR & SKR Government College for Women (Autonomous)";
var COLLEGE_ADDR     = "Kadapa, Andhra Pradesh – 516 001";
var GEMINI_API_KEY   = "YOUR_GEMINI_KEY_HERE"; // Optional: aistudio.google.com


// ══════════════════════════════════════════════════════════════════════════
// ENTRY POINT
// ══════════════════════════════════════════════════════════════════════════
function doPost(e) {
  try {
    var payload    = JSON.parse(e.postData.contents);
    var faculty    = payload.faculty    || "Faculty Member";
    var department = payload.department || "Computer Science";
    var college    = payload.college    || COLLEGE_NAME;
    var year       = payload.year       || getCurrentAY();
    var month      = payload.month      || "Full Year";
    var rtype      = payload.rtype      || "detailed";
    var genMode    = payload.genMode    || "perentry"; // "perentry" or "single"
    var activities = payload.activities || [];

    if (activities.length === 0) {
      return jsonResponse({ status:"error", message:"No activities for the selected period." });
    }

    if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_GEMINI_KEY_HERE") {
      try { activities = rewriteWithGemini(activities); } catch(e) { Logger.log("Gemini skipped: "+e); }
    }

    // Root folder
    var rootFolder = getOrCreateFolder(DriveApp.getRootFolder(), ROOT_FOLDER_NAME);
    var yearFolder = getOrCreateFolder(rootFolder, year);

    var results = [];

    if (genMode === "perentry") {
      // ── Generate one PDF per activity entry ──
      // Folder: Faculty_Activity_Reports / Year / Category / Activity Title
      for (var i = 0; i < activities.length; i++) {
        var act       = activities[i];
        var catLabel  = act.sheetLabel || act.sheet || "Other";
        var catFolder = getOrCreateFolder(yearFolder, catLabel);

        // Activity title folder (sanitized, max 60 chars)
        var actFolderName = sanitizeFolderName(act.title || "Activity_" + (i+1));
        var actFolder     = getOrCreateFolder(catFolder, actFolderName);

        var doc     = buildSingleEntryDoc(act, i+1, faculty, department, college, year, month, rtype);
        var pdfFile = exportAsPDF(doc, actFolderName, year, "", actFolder);
        DriveApp.getFileById(doc.getId()).setTrashed(true);

        results.push({
          title:     act.title || "Activity",
          category:  catLabel,
          pdfUrl:    pdfFile.getUrl(),
          folderUrl: "https://drive.google.com/drive/folders/" + actFolder.getId()
        });
      }

      return jsonResponse({
        status:    "success",
        message:   "Generated " + results.length + " individual PDFs!",
        mode:      "perentry",
        results:   results,
        rootUrl:   "https://drive.google.com/drive/folders/" + yearFolder.getId()
      });

    } else {
      // ── Generate one combined PDF ──
      var monthFolder = getOrCreateFolder(yearFolder, month);
      var doc     = buildCombinedDoc(faculty, department, college, year, month, rtype, activities);
      var pdfFile = exportAsPDF(doc, faculty, year, month, monthFolder);
      DriveApp.getFileById(doc.getId()).setTrashed(true);

      return jsonResponse({
        status:    "success",
        message:   "Combined PDF generated!",
        mode:      "single",
        pdfUrl:    pdfFile.getUrl(),
        folderUrl: "https://drive.google.com/drive/folders/" + monthFolder.getId(),
        fileName:  pdfFile.getName()
      });
    }

  } catch(err) {
    Logger.log("Error: " + err.toString() + "\n" + err.stack);
    return jsonResponse({ status:"error", message: err.toString() });
  }
}

function doGet(e) {
  return jsonResponse({ status:"ok", message:"Faculty Tracker Apps Script v4.0 is running." });
}


// ══════════════════════════════════════════════════════════════════════════
// FOLDER CREATION (FIXED)
// ══════════════════════════════════════════════════════════════════════════
function getOrCreateFolder(parentFolder, folderName) {
  var safe    = sanitizeFolderName(folderName);
  var folders = parentFolder.getFoldersByName(safe);
  if (folders.hasNext()) return folders.next();
  return parentFolder.createFolder(safe);
}

function sanitizeFolderName(name) {
  return String(name)
    .replace(/[\/\\:*?"<>|]/g, "_")  // remove invalid characters
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

function getCurrentAY() {
  var now = new Date(), m = now.getMonth(), y = now.getFullYear();
  var s = (m >= 5) ? y : y - 1;
  return s + "-" + String(s + 1).slice(-2);
}


// ══════════════════════════════════════════════════════════════════════════
// PDF EXPORT (FIXED)
// ══════════════════════════════════════════════════════════════════════════
function exportAsPDF(doc, nameBase, year, month, folder) {
  doc.saveAndClose();
  var token    = ScriptApp.getOAuthToken();
  var url      = "https://docs.google.com/document/d/" + doc.getId() + "/export?format=pdf";
  var response = UrlFetchApp.fetch(url, {
    headers: { Authorization: "Bearer " + token },
    muteHttpExceptions: true
  });
  var pdfBlob = response.getBlob();
  var ts      = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmm");
  var safe    = sanitizeFolderName(nameBase);
  pdfBlob.setName(safe + "_" + ts + ".pdf");
  return folder.createFile(pdfBlob);
}


// ══════════════════════════════════════════════════════════════════════════
// SINGLE ENTRY DOCUMENT BUILDER
// Builds a full A4 document for ONE activity entry
// ══════════════════════════════════════════════════════════════════════════
function buildSingleEntryDoc(act, idx, faculty, department, college, year, month, rtype) {
  var title = sanitizeFolderName(act.title || "Activity_" + idx);
  var doc   = DocumentApp.create("Entry_" + title + "_" + year);
  var body  = doc.getBody();
  setPageA4(body);

  // Header banner
  formatPara(body.appendParagraph("FACULTY ACADEMIC ACTIVITY — INDIVIDUAL RECORD"), 16, true, "CENTER").setSpacingAfter(3);
  formatPara(body.appendParagraph(college), 9, false, "CENTER").setSpacingAfter(2);
  formatPara(body.appendParagraph(COLLEGE_ADDR), 9, false, "CENTER").setSpacingAfter(10);
  appendDivider(body);

  // Category label
  var catPara = body.appendParagraph((act.sheetLabel || act.sheet || "Activity").toUpperCase());
  formatPara(catPara, 10, true, "LEFT");
  catPara.setSpacingBefore(6).setSpacingAfter(4);
  catPara.editAsText().setForegroundColor("#0B1F4B").setBackgroundColor("#EFF6FF");

  // Activity title
  var titlePara = body.appendParagraph(idx + ". " + (act.title || "Activity"));
  formatPara(titlePara, 13, true, "LEFT");
  titlePara.setSpacingBefore(4).setSpacingAfter(8);
  titlePara.editAsText().setForegroundColor("#0F172A");

  // Folder path note
  var fpPara = body.appendParagraph("Saved to: Faculty_Activity_Reports / " + year + " / " + (act.sheetLabel||act.sheet) + " / " + sanitizeFolderName(act.title||"Activity"));
  formatPara(fpPara, 8, false, "LEFT");
  fpPara.editAsText().setForegroundColor("#64748B");
  fpPara.setSpacingAfter(10);
  appendDivider(body);

  // Faculty info table
  styleInfoTable(body.appendTable([
    ["Faculty Name", faculty,     "Academic Year", year],
    ["Department",   department,  "Report Period", month],
    ["Activity No.", String(idx), "Report Type",   rtype.toUpperCase()]
  ]));
  body.appendParagraph("").setSpacingAfter(6);

  // Activity details table
  formatPara(body.appendParagraph("ACTIVITY DETAILS"), 11, true, "LEFT").setSpacingBefore(10).setSpacingAfter(6);

  var rows = [];
  if (act.title)        rows.push(["Activity Title",      act.title]);
  if (act.date)         rows.push(["Date",                act.date]);
  if (act.organizer)    rows.push(["Organizer / By",      act.organizer]);
  if (act.mode)         rows.push(["Mode",                act.mode]);
  if (act.level)        rows.push(["Level",               act.level]);
  if (act.role)         rows.push(["Your Role",           act.role]);
  if (act.participants) rows.push(["No. of Participants", act.participants]);
  if (act.cert)         rows.push(["Certificate",         act.cert]);
  if (act.venue)        rows.push(["Venue / Platform",    act.venue]);
  if (act.remarks)      rows.push(["Remarks / Outcome",   act.remarks]);
  if (act.url)          rows.push(["URL / DOI / Link",    act.url]);

  if (rows.length > 0) {
    var detTable = body.appendTable(rows);
    styleDetailTable(detTable);
  } else {
    var noDetails = body.appendParagraph("No additional details recorded for this activity.");
    formatPara(noDetails, 9, false, "LEFT");
    noDetails.editAsText().setForegroundColor("#64748B");
  }

  // NAAC note
  if (rtype === "naac") {
    appendDivider(body);
    var naacPara = body.appendParagraph("NOTE: This individual activity record is formatted as per NAAC/AQAR criteria. For IQAC use only.");
    formatPara(naacPara, 9, false, "LEFT");
    naacPara.editAsText().setForegroundColor("#92400E").setBackgroundColor("#FFFBEB");
  }

  // Footer
  appendDivider(body);
  var footerPara = body.appendParagraph(
    "Generated: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd-MMM-yyyy HH:mm") +
    "  |  Faculty Activity Tracker v4.0  |  © 2025 Dr. C.V. Krishnaveni"
  );
  formatPara(footerPara, 8, false, "CENTER");
  footerPara.editAsText().setForegroundColor("#94A3B8");

  // Signature
  body.appendParagraph("").setSpacingBefore(24);
  var sigTable = body.appendTable([
    ["Faculty Signature", "HOD Signature", "IQAC Coordinator Signature"],
    [faculty, "", ""]
  ]);
  styleSignTable(sigTable);

  return doc;
}


// ══════════════════════════════════════════════════════════════════════════
// COMBINED DOCUMENT BUILDER (all entries in one PDF)
// ══════════════════════════════════════════════════════════════════════════
function buildCombinedDoc(faculty, department, college, year, month, rtype, activities) {
  var doc  = DocumentApp.create("Faculty_Report_" + faculty + "_" + year + "_" + month);
  var body = doc.getBody();
  setPageA4(body);

  formatPara(body.appendParagraph("FACULTY ACADEMIC ACTIVITY REPORT"), 18, true, "CENTER").setSpacingAfter(4);
  formatPara(body.appendParagraph(college), 10, false, "CENTER").setSpacingAfter(2);
  formatPara(body.appendParagraph(COLLEGE_ADDR), 9, false, "CENTER").setSpacingAfter(12);
  appendDivider(body);

  styleInfoTable(body.appendTable([
    ["Faculty Name", faculty,     "Academic Year", year],
    ["Department",   department,  "Report Period", month],
    ["College",      college,     "Report Type",   rtype.toUpperCase()]
  ]));
  body.appendParagraph("").setSpacingAfter(4);

  // Summary
  var sheets = groupBySheet(activities);
  formatPara(body.appendParagraph("ACTIVITY SUMMARY"), 13, true, "LEFT").setSpacingBefore(10).setSpacingAfter(6);
  var sumT = body.appendTable();
  var hdr  = sumT.appendTableRow();
  appendCell(hdr, "Activity Category", true, "#0B1F4B", "#FFFFFF");
  appendCell(hdr, "Count",             true, "#0B1F4B", "#FFFFFF");
  var total = 0;
  Object.keys(sheets).forEach(function(sid) {
    var n = sheets[sid].length; total += n;
    var row = sumT.appendTableRow();
    appendCell(row, getSheetLabel(sid), false, "#EFF6FF", "#0F172A");
    appendCell(row, String(n),          false, "#EFF6FF", "#1D4ED8");
  });
  var tr = sumT.appendTableRow();
  appendCell(tr, "GRAND TOTAL", true, "#0B1F4B", "#FFFFFF");
  appendCell(tr, String(total),  true, "#0B1F4B", "#FFFFFF");

  // Detailed listing
  if (rtype === "detailed" || rtype === "naac") {
    Object.keys(sheets).forEach(function(sid) {
      var acts = sheets[sid];
      var secPara = body.appendParagraph(getSheetLabel(sid).toUpperCase());
      formatPara(secPara, 11, true, "LEFT").setSpacingBefore(14).setSpacingAfter(6);
      secPara.editAsText().setForegroundColor("#0B1F4B").setBackgroundColor("#EFF6FF");

      acts.forEach(function(act, idx) {
        var rowPara = body.appendParagraph((idx+1) + ". " + (act.title||"Activity"));
        formatPara(rowPara, 10, false, "LEFT").setSpacingBefore(4).setSpacingAfter(2);

        var details = [
          act.date        && "Date: "         + act.date,
          act.organizer   && "Organizer: "    + act.organizer,
          act.mode        && "Mode: "         + act.mode,
          act.level       && "Level: "        + act.level,
          act.role        && "Role: "         + act.role,
          act.participants&& "Participants: " + act.participants,
          act.cert        && "Certificate: "  + act.cert,
          act.venue       && "Venue: "        + act.venue,
          act.remarks     && "Remarks: "      + act.remarks
        ].filter(Boolean).join("  |  ");

        if (details) {
          var dp = body.appendParagraph("   " + details);
          formatPara(dp, 9, false, "LEFT");
          dp.editAsText().setForegroundColor("#475569");
          dp.setSpacingAfter(2);
        }
        if (act.url) {
          var up = body.appendParagraph("   URL: " + act.url);
          formatPara(up, 9, false, "LEFT");
          up.editAsText().setForegroundColor("#2563EB");
        }
      });
    });
  }

  appendDivider(body);
  var ft = body.appendParagraph("Generated: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd-MMM-yyyy HH:mm") + "  |  © 2025 Dr. C.V. Krishnaveni");
  formatPara(ft, 8, false, "CENTER");
  ft.editAsText().setForegroundColor("#94A3B8");

  return doc;
}


// ══════════════════════════════════════════════════════════════════════════
// GEMINI AI (Optional)
// ══════════════════════════════════════════════════════════════════════════
function rewriteWithGemini(activities) {
  var titles = activities.map(function(a) { return a.title || "Activity"; });
  var resp = UrlFetchApp.fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
    {
      method: "post", contentType: "application/json",
      payload: JSON.stringify({ contents:[{ parts:[{ text:"Rewrite these academic titles formally for an NAAC faculty report. Return ONLY a JSON array of strings in the same order:\n" + JSON.stringify(titles) }] }], generationConfig:{ temperature:0.3, maxOutputTokens:2048 } }),
      muteHttpExceptions: true
    }
  );
  try {
    var text = JSON.parse(resp.getContentText()).candidates[0].content.parts[0].text;
    text = text.replace(/```json|```/g,"").trim();
    var rewritten = JSON.parse(text.match(/\[[\s\S]*\]/)[0]);
    if (Array.isArray(rewritten) && rewritten.length === activities.length) {
      activities.forEach(function(a,i){ a.title = rewritten[i]; });
    }
  } catch(e) { Logger.log("Gemini parse error: " + e); }
  return activities;
}


// ══════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════
function setPageA4(body) {
  body.setPageWidth(595.28).setPageHeight(841.89)
      .setMarginTop(56).setMarginBottom(56).setMarginLeft(56).setMarginRight(56);
}

function formatPara(para, size, bold, align) {
  var alignMap = { CENTER: DocumentApp.HorizontalAlignment.CENTER, LEFT: DocumentApp.HorizontalAlignment.LEFT, RIGHT: DocumentApp.HorizontalAlignment.RIGHT };
  para.setAttributes({
    [DocumentApp.Attribute.FONT_SIZE]:           size,
    [DocumentApp.Attribute.BOLD]:                bold,
    [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]:alignMap[align] || DocumentApp.HorizontalAlignment.LEFT,
    [DocumentApp.Attribute.FONT_FAMILY]:         "Arial"
  });
  return para;
}

function appendDivider(body) {
  var d = body.appendParagraph("─".repeat(80));
  formatPara(d, 7, false, "CENTER");
  d.editAsText().setForegroundColor("#CBD5E1");
  d.setSpacingBefore(4).setSpacingAfter(4);
}

function appendCell(row, text, bold, bg, fg) {
  var cell = row.appendTableCell(text);
  cell.setAttributes({
    [DocumentApp.Attribute.BOLD]:            bold,
    [DocumentApp.Attribute.FONT_SIZE]:       9,
    [DocumentApp.Attribute.FONT_FAMILY]:     "Arial",
    [DocumentApp.Attribute.FOREGROUND_COLOR]:fg,
    [DocumentApp.Attribute.BACKGROUND_COLOR]:bg
  });
  return cell;
}

function styleInfoTable(table) {
  for (var r = 0; r < table.getNumRows(); r++) {
    var row = table.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      var isLabel = (c % 2 === 0);
      row.getCell(c).setAttributes({
        [DocumentApp.Attribute.FONT_SIZE]:       9,
        [DocumentApp.Attribute.FONT_FAMILY]:     "Arial",
        [DocumentApp.Attribute.BOLD]:            isLabel,
        [DocumentApp.Attribute.BACKGROUND_COLOR]:isLabel ? "#EFF6FF" : "#FFFFFF",
        [DocumentApp.Attribute.FOREGROUND_COLOR]:isLabel ? "#0B1F4B" : "#0F172A"
      });
    }
  }
}

function styleDetailTable(table) {
  for (var r = 0; r < table.getNumRows(); r++) {
    var row = table.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      var isLabel = (c === 0);
      row.getCell(c).setAttributes({
        [DocumentApp.Attribute.FONT_SIZE]:       9,
        [DocumentApp.Attribute.FONT_FAMILY]:     "Arial",
        [DocumentApp.Attribute.BOLD]:            isLabel,
        [DocumentApp.Attribute.BACKGROUND_COLOR]:isLabel ? "#EFF6FF" : "#FFFFFF",
        [DocumentApp.Attribute.FOREGROUND_COLOR]:isLabel ? "#0B1F4B" : "#0F172A"
      });
    }
  }
}

function styleSignTable(table) {
  for (var r = 0; r < table.getNumRows(); r++) {
    var row = table.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      row.getCell(c).setAttributes({
        [DocumentApp.Attribute.FONT_SIZE]:           9,
        [DocumentApp.Attribute.FONT_FAMILY]:         "Arial",
        [DocumentApp.Attribute.BOLD]:                (r === 0),
        [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]:DocumentApp.HorizontalAlignment.CENTER
      });
    }
  }
}

function groupBySheet(activities) {
  var map = {};
  activities.forEach(function(a) {
    var sid = a.sheet || "custom";
    if (!map[sid]) map[sid] = [];
    map[sid].push(a);
  });
  return map;
}

function getSheetLabel(sid) {
  var L = {
    ap01:"AP01 — FDPs Attended",ap02:"AP02 — Workshops Attended",ap03:"AP03 — Trainings Attended",
    ap04:"AP04 — Resource Person",ap05:"AP05 — FDPs Organized",ap06:"AP06 — Workshops Organized",
    ap07:"AP07 — Trainings Organized",ap08:"AP08 — Webinars Organized",ap09:"AP09 — Seminar Papers",
    ap10:"AP10 — Conference Papers",ap11:"AP11 — Journal Papers",ap12:"AP12 — Book Chapters",
    ap13:"AP13 — Books Published",ap14:"AP14 — LMS eContent",ap15:"AP15 — LMS Expert",
    ap16:"AP16 — Academic Audit",ap17:"AP17 — Guest Lectures Organized",ap18:"AP18 — Meetings",
    ap19:"AP19 — Certificate Courses",ap20:"AP20 — Committees",ap21:"AP21 — Guest Lectures Given",
    ap22:"AP22 — Exam Duties",ap23:"AP23 — MOOCs",
    fc01:"FC01 — Student Roll List",fc02:"FC02 — Time Table",fc03:"FC03 — Lesson Plan",
    fc04:"FC04 — Annual Curricular Plan",fc05:"FC05 — Teaching Diary",fc06:"FC06 — Teaching Notes",
    fc07:"FC07 — Student Seminars",fc08:"FC08 — Quiz",fc09:"FC09 — Group Discussions",
    fc10:"FC10 — Assignment",fc11:"FC11 — Study Projects",fc12:"FC12 — Additional Inputs",
    fc13:"FC13 — CIA",fc14:"FC14 — Result Analysis",fc15:"FC15 — CSP",
    fc16:"FC16 — Short Internship",fc17:"FC17 — Long Internship",fc18:"FC18 — Mentor-Mentee",
    fc19:"FC19 — Question Papers",fc20:"FC20 — Teaching Pedagogies",custom:"Custom Activities"
  };
  return L[sid] || sid.toUpperCase();
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
