/* ═══════════════════════════════════════════════════════════════════════════
   FACULTY ACTIVITY TRACKER — GOOGLE APPS SCRIPT (v4.0)
   © 2025 Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)
   SKR & SKR Government College for Women (Autonomous), Kadapa, AP

   SETUP INSTRUCTIONS:
   1. Go to https://script.google.com → New Project → Name it "FacultyTrackerReport"
   2. Delete the default code and paste ALL of this file's content
   3. Click Deploy → New Deployment → Type: Web App
      • Execute as: Me
      • Who has access: Anyone
   4. Click Deploy → Copy the Web App URL
   5. Paste the URL in the Tracker → Reports → Generate Report → Web App URL field

   WHAT THIS SCRIPT DOES:
   - Receives your Firebase activity data from the Tracker (via POST request)
   - Creates folder structure in Google Drive: Faculty_Activity_Reports/AY/Month/
   - Builds a professional Google Doc report
   - Exports it as PDF and saves to the month folder
   - Returns the Drive folder link so you can find it instantly
═══════════════════════════════════════════════════════════════════════════ */

// ── CONFIGURATION ──────────────────────────────────────────────────────────
var ROOT_FOLDER_NAME = "Faculty_Activity_Reports";
var COLLEGE_NAME     = "SKR & SKR Government College for Women (Autonomous)";
var COLLEGE_ADDR     = "Kadapa, Andhra Pradesh – 516 001";
var GEMINI_API_KEY   = "YOUR_GEMINI_KEY_HERE"; // Optional: get free key from aistudio.google.com


// ══════════════════════════════════════════════════════════════════════════
// ENTRY POINT — doPost
// Receives JSON payload from the Faculty Tracker web app
// ══════════════════════════════════════════════════════════════════════════
function doPost(e) {
  try {
    // Parse incoming data
    var payload    = JSON.parse(e.postData.contents);
    var faculty    = payload.faculty    || "Faculty Member";
    var department = payload.department || "Computer Science";
    var college    = payload.college    || COLLEGE_NAME;
    var year       = payload.year       || getCurrentAY();
    var month      = payload.month      || "Full Year";
    var rtype      = payload.rtype      || "summary";
    var activities = payload.activities || [];

    if (activities.length === 0) {
      return jsonResponse({
        status: "error",
        message: "No activities found for the selected period. Please add activities first."
      });
    }

    // Optional AI rewrite of activity descriptions
    if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_GEMINI_KEY_HERE") {
      try { activities = rewriteWithGemini(activities, GEMINI_API_KEY); }
      catch(aiErr) { Logger.log("Gemini rewrite skipped: " + aiErr); }
    }

    // Create folder structure in Google Drive
    var rootFolder  = getOrCreateFolder(DriveApp.getRootFolder(), ROOT_FOLDER_NAME);
    var yearFolder  = getOrCreateFolder(rootFolder, year);
    var monthFolder = getOrCreateFolder(yearFolder, month);

    // Build the Google Doc report
    var doc = buildReportDocument(faculty, department, college, year, month, rtype, activities);

    // Export as PDF and save to month folder
    var pdfFile = exportAsPDF(doc, faculty, year, month, monthFolder);

    // Delete the temporary Google Doc (keep only the PDF)
    DriveApp.getFileById(doc.getId()).setTrashed(true);

    return jsonResponse({
      status:      "success",
      message:     "Report generated successfully!",
      pdfUrl:      pdfFile.getUrl(),
      folderUrl:   "https://drive.google.com/drive/folders/" + monthFolder.getId(),
      fileName:    pdfFile.getName(),
      activities:  activities.length
    });

  } catch(err) {
    Logger.log("Error in doPost: " + err.toString() + "\n" + err.stack);
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

// Also handle GET for testing
function doGet(e) {
  return jsonResponse({ status: "ok", message: "Faculty Tracker Apps Script is running." });
}


// ══════════════════════════════════════════════════════════════════════════
// FOLDER UTILITIES
// ══════════════════════════════════════════════════════════════════════════

/**
 * Gets an existing folder by name inside parent, or creates it if not found.
 * This is the function that was broken before — now fixed properly.
 */
function getOrCreateFolder(parentFolder, folderName) {
  var folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  // Folder does not exist → create it
  return parentFolder.createFolder(folderName);
}

function getCurrentAY() {
  var now = new Date();
  var m = now.getMonth(); // 0-based; June = 5
  var y = now.getFullYear();
  var startY = (m >= 5) ? y : y - 1;
  return startY + "-" + String(startY + 1).slice(-2);
}


// ══════════════════════════════════════════════════════════════════════════
// PDF EXPORT
// ══════════════════════════════════════════════════════════════════════════
function exportAsPDF(doc, faculty, year, month, folder) {
  doc.saveAndClose();

  var docId   = doc.getId();
  var token   = ScriptApp.getOAuthToken();
  var url     = "https://docs.google.com/document/d/" + docId + "/export?format=pdf";
  var options = {
    headers: { Authorization: "Bearer " + token },
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options);
  var pdfBlob  = response.getBlob();

  // Sanitize names for file system
  var safeFaculty = faculty.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
  var safeMonth   = month.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
  var timestamp   = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmm");
  var fileName    = "Faculty_Report_" + safeFaculty + "_" + year + "_" + safeMonth + "_" + timestamp + ".pdf";

  pdfBlob.setName(fileName);
  return folder.createFile(pdfBlob);
}


// ══════════════════════════════════════════════════════════════════════════
// REPORT BUILDER
// ══════════════════════════════════════════════════════════════════════════
function buildReportDocument(faculty, department, college, year, month, rtype, activities) {
  var docTitle = "Faculty_Report_" + faculty + "_" + year + "_" + month;
  var doc  = DocumentApp.create(docTitle);
  var body = doc.getBody();

  // ── Page Setup ──
  body.setPageWidth(595.28);   // A4 width in points
  body.setPageHeight(841.89);  // A4 height in points
  body.setMarginTop(56);
  body.setMarginBottom(56);
  body.setMarginLeft(56);
  body.setMarginRight(56);

  // ── Header Banner ──
  var header = body.appendParagraph("FACULTY ACADEMIC ACTIVITY REPORT");
  formatPara(header, 18, true, DocumentApp.HorizontalAlignment.CENTER);
  header.setSpacingAfter(4);

  var collegeLine = body.appendParagraph(college);
  formatPara(collegeLine, 10, false, DocumentApp.HorizontalAlignment.CENTER);
  collegeLine.setSpacingAfter(2);

  var addrLine = body.appendParagraph(COLLEGE_ADDR);
  formatPara(addrLine, 9, false, DocumentApp.HorizontalAlignment.CENTER);
  addrLine.setSpacingAfter(12);

  // Divider
  appendDivider(body);

  // ── Faculty Info Box ──
  var infoTable = body.appendTable([
    ["Faculty Name", faculty,    "Academic Year", year],
    ["Department",   department, "Report Period", month],
    ["College",      college,    "Report Type",   rtype.toUpperCase()]
  ]);
  styleInfoTable(infoTable);
  body.appendParagraph("").setSpacingAfter(4);

  // ── Stats Summary ──
  var sheets     = groupBySheet(activities);
  var sheetNames = Object.keys(sheets);

  var sumHead = body.appendParagraph("ACTIVITY SUMMARY");
  formatPara(sumHead, 13, true, DocumentApp.HorizontalAlignment.LEFT);
  sumHead.setSpacingBefore(10).setSpacingAfter(6);

  var sumTable = body.appendTable();
  var sumHdr   = sumTable.appendTableRow();
  appendCell(sumHdr, "Category", true, "#0B1F4B", "#FFFFFF");
  appendCell(sumHdr, "Count",    true, "#0B1F4B", "#FFFFFF");
  appendCell(sumHdr, "Sheet ID", true, "#0B1F4B", "#FFFFFF");

  var total = 0;
  sheetNames.forEach(function(sid) {
    var count = sheets[sid].length;
    total += count;
    var row = sumTable.appendTableRow();
    appendCell(row, getSheetLabel(sid), false, "#EFF6FF", "#0F172A");
    appendCell(row, String(count),       false, "#EFF6FF", "#1D4ED8");
    appendCell(row, sid.toUpperCase(),   false, "#EFF6FF", "#64748B");
  });
  // Total row
  var totRow = sumTable.appendTableRow();
  appendCell(totRow, "GRAND TOTAL", true, "#0B1F4B", "#FFFFFF");
  appendCell(totRow, String(total),   true, "#0B1F4B", "#FFFFFF");
  appendCell(totRow, "",              true, "#0B1F4B", "#FFFFFF");

  body.appendParagraph("").setSpacingAfter(6);

  // ── Detailed Listings ──
  if (rtype === "detailed" || rtype === "naac") {
    sheetNames.forEach(function(sid) {
      var acts = sheets[sid];
      if (!acts.length) return;

      var secHead = body.appendParagraph(getSheetLabel(sid).toUpperCase());
      formatPara(secHead, 11, true, DocumentApp.HorizontalAlignment.LEFT);
      secHead.setSpacingBefore(14).setSpacingAfter(6);
      secHead.editAsText().setForegroundColor("#0B1F4B");

      acts.forEach(function(act, idx) {
        var row = body.appendParagraph((idx + 1) + ". " + (act.title || "Activity"));
        formatPara(row, 10, false, DocumentApp.HorizontalAlignment.LEFT);
        row.setSpacingBefore(4).setSpacingAfter(2);

        var details = [];
        if (act.date)         details.push("Date: " + act.date);
        if (act.organizer)    details.push("Organizer: " + act.organizer);
        if (act.mode)         details.push("Mode: " + act.mode);
        if (act.level)        details.push("Level: " + act.level);
        if (act.role)         details.push("Role: " + act.role);
        if (act.participants) details.push("Participants: " + act.participants);
        if (act.cert)         details.push("Certificate: " + act.cert);
        if (act.venue)        details.push("Venue: " + act.venue);
        if (act.remarks)      details.push("Remarks: " + act.remarks);

        if (details.length) {
          var detPara = body.appendParagraph("   " + details.join("  |  "));
          formatPara(detPara, 9, false, DocumentApp.HorizontalAlignment.LEFT);
          detPara.editAsText().setForegroundColor("#475569");
          detPara.setSpacingAfter(2);
        }

        if (act.url) {
          var urlPara = body.appendParagraph("   Evidence / URL: " + act.url);
          formatPara(urlPara, 9, false, DocumentApp.HorizontalAlignment.LEFT);
          urlPara.editAsText().setForegroundColor("#2563EB");
          urlPara.setSpacingAfter(4);
        }
      });
    });
  }

  // ── NAAC format extra note ──
  if (rtype === "naac") {
    appendDivider(body);
    var naacNote = body.appendParagraph("NOTE: This report is formatted as per NAAC/AQAR criteria. Data sourced from Faculty Activity Tracker (Firebase Realtime Database). For IQAC use only.");
    formatPara(naacNote, 9, false, DocumentApp.HorizontalAlignment.LEFT);
    naacNote.editAsText().setForegroundColor("#64748B");
    naacNote.setSpacingBefore(10);
  }

  // ── Footer ──
  appendDivider(body);
  var footerPara = body.appendParagraph(
    "Generated on: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd-MMM-yyyy HH:mm") +
    "  |  Faculty Activity Tracker v4.0  |  © 2025 Dr. C.V. Krishnaveni"
  );
  formatPara(footerPara, 8, false, DocumentApp.HorizontalAlignment.CENTER);
  footerPara.editAsText().setForegroundColor("#94A3B8");

  // ── Signature Block ──
  body.appendParagraph("").setSpacingBefore(20);
  var sigTable = body.appendTable([
    ["Faculty Signature", "HOD Signature", "IQAC Coordinator Signature"],
    [faculty, "", ""]
  ]);
  styleSignTable(sigTable);

  return doc;
}


// ══════════════════════════════════════════════════════════════════════════
// GEMINI AI REWRITER (Optional)
// ══════════════════════════════════════════════════════════════════════════
function rewriteWithGemini(activities, apiKey) {
  var prompt = "You are an academic report writer. Rewrite the following activity titles to be more formal and professional for an NAAC faculty report. Return ONLY a JSON array of strings matching the original order. Do not add explanations.\n\nTitles:\n";
  var titles = activities.map(function(a) { return a.title || "Activity"; });
  prompt += JSON.stringify(titles);

  var response = UrlFetchApp.fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
    {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
      }),
      muteHttpExceptions: true
    }
  );

  var result = JSON.parse(response.getContentText());
  var text = result.candidates[0].content.parts[0].text;
  // Strip markdown code fences if present
  text = text.replace(/```json|```/g, "").trim();
  var rewritten = JSON.parse(text);

  if (Array.isArray(rewritten) && rewritten.length === activities.length) {
    activities.forEach(function(a, i) { a.title = rewritten[i]; });
  }
  return activities;
}


// ══════════════════════════════════════════════════════════════════════════
// DOCUMENT HELPERS
// ══════════════════════════════════════════════════════════════════════════
function formatPara(para, size, bold, align) {
  var style = {};
  style[DocumentApp.Attribute.FONT_SIZE]             = size;
  style[DocumentApp.Attribute.BOLD]                   = bold;
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]   = align;
  style[DocumentApp.Attribute.FONT_FAMILY]            = "Arial";
  para.setAttributes(style);
}

function appendDivider(body) {
  var d = body.appendParagraph("─".repeat(80));
  formatPara(d, 7, false, DocumentApp.HorizontalAlignment.CENTER);
  d.editAsText().setForegroundColor("#CBD5E1");
  d.setSpacingBefore(4).setSpacingAfter(4);
}

function appendCell(row, text, bold, bgHex, fgHex) {
  var cell = row.appendTableCell(text);
  var style = {};
  style[DocumentApp.Attribute.BOLD]        = bold;
  style[DocumentApp.Attribute.FONT_SIZE]   = 9;
  style[DocumentApp.Attribute.FONT_FAMILY] = "Arial";
  if (fgHex) style[DocumentApp.Attribute.FOREGROUND_COLOR] = fgHex;
  if (bgHex) style[DocumentApp.Attribute.BACKGROUND_COLOR] = bgHex;
  cell.setAttributes(style);
  return cell;
}

function styleInfoTable(table) {
  for (var r = 0; r < table.getNumRows(); r++) {
    var row = table.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      var cell = row.getCell(c);
      var isLabel = (c % 2 === 0);
      var style = {};
      style[DocumentApp.Attribute.FONT_SIZE]          = 9;
      style[DocumentApp.Attribute.FONT_FAMILY]        = "Arial";
      style[DocumentApp.Attribute.BOLD]               = isLabel;
      style[DocumentApp.Attribute.BACKGROUND_COLOR]   = isLabel ? "#EFF6FF" : "#FFFFFF";
      style[DocumentApp.Attribute.FOREGROUND_COLOR]   = isLabel ? "#0B1F4B" : "#0F172A";
      cell.setAttributes(style);
    }
  }
}

function styleSignTable(table) {
  for (var r = 0; r < table.getNumRows(); r++) {
    var row = table.getRow(r);
    for (var c = 0; c < row.getNumCells(); c++) {
      var cell = row.getCell(c);
      var style = {};
      style[DocumentApp.Attribute.FONT_SIZE]          = 9;
      style[DocumentApp.Attribute.FONT_FAMILY]        = "Arial";
      style[DocumentApp.Attribute.BOLD]               = (r === 0);
      style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
      cell.setAttributes(style);
    }
  }
}

function groupBySheet(activities) {
  var map = {};
  activities.forEach(function(act) {
    var sid = act.sheet || "custom";
    if (!map[sid]) map[sid] = [];
    map[sid].push(act);
  });
  return map;
}

function getSheetLabel(sid) {
  var labels = {
    ap01:"AP01 — FDPs Attended",          ap02:"AP02 — Workshops Attended",
    ap03:"AP03 — Trainings Attended",      ap04:"AP04 — Resource Person",
    ap05:"AP05 — FDPs Organized",          ap06:"AP06 — Workshops Organized",
    ap07:"AP07 — Trainings Organized",     ap08:"AP08 — Webinars Organized",
    ap09:"AP09 — Seminar Papers",          ap10:"AP10 — Conference Papers",
    ap11:"AP11 — Journal Papers",          ap12:"AP12 — Book Chapters",
    ap13:"AP13 — Books Published",         ap14:"AP14 — LMS eContent",
    ap15:"AP15 — LMS Expert",             ap16:"AP16 — Academic Audit",
    ap17:"AP17 — Guest Lectures Organized",ap18:"AP18 — Meetings",
    ap19:"AP19 — Certificate Courses",     ap20:"AP20 — Committees",
    ap21:"AP21 — Guest Lectures Given",    ap22:"AP22 — Exam Duties",
    ap23:"AP23 — MOOCs",
    fc01:"FC01 — Student Roll List",       fc02:"FC02 — Time Table",
    fc03:"FC03 — Lesson Plan",             fc04:"FC04 — Annual Curricular Plan",
    fc05:"FC05 — Teaching Diary",          fc06:"FC06 — Teaching Notes",
    fc07:"FC07 — Student Seminars",        fc08:"FC08 — Quiz",
    fc09:"FC09 — Group Discussions",       fc10:"FC10 — Assignment",
    fc11:"FC11 — Study Projects",          fc12:"FC12 — Additional Inputs",
    fc13:"FC13 — CIA",                     fc14:"FC14 — Result Analysis",
    fc15:"FC15 — CSP",                     fc16:"FC16 — Short Internship",
    fc17:"FC17 — Long Internship",         fc18:"FC18 — Mentor-Mentee",
    fc19:"FC19 — Question Papers",         fc20:"FC20 — Teaching Pedagogies",
    custom:"Custom Activities"
  };
  return labels[sid] || sid.toUpperCase();
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
