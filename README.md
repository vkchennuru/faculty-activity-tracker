[README.md](https://github.com/user-attachments/files/25891824/README.md)
# Faculty Academic Activity System v4.0

**© 2025 Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)**  
Lecturer in Computer Science & IQAC Coordinator  
SKR & SKR Government College for Women (Autonomous), Kadapa, Andhra Pradesh  
🔗 [cvkrishnaveni.blogspot.com](https://cvkrishnaveni.blogspot.com)

---

## What's Fixed in v4.0

| Issue | Fix |
|-------|-----|
| ❌ Folder not creating in Google Drive | ✅ `getOrCreateFolder()` fully rewritten with correct `getFoldersByName()` logic |
| ❌ PDF not generating | ✅ Two PDF modes: **Browser PDF** (instant, no setup) + **Google Drive PDF** (via Apps Script) |
| ❌ `no-cors` blocked response from Apps Script | ✅ Replaced with JSONP pattern that can read the response |
| ❌ Three separate Apps Script files (Code_1/2/3) required | ✅ Single `Code.gs` file — paste and deploy |
| ❌ Apps Script URL required before generating any PDF | ✅ Browser PDF works with zero setup — print to PDF from any browser |

---

## Files

```
faculty-activity-tracker/
├── index.html              ← Main app (single file, GitHub Pages ready)
├── README.md               ← This file
├── LICENSE
└── apps-script/
    └── Code.gs             ← Google Apps Script (single file, paste into script.google.com)
```

---

## How to Use

### Option A — Browser PDF (No Setup Needed)
1. Open the app → Tracker → Reports
2. Select Academic Year and Month
3. Click **Generate Report**
4. A print-ready report opens in a new tab
5. Press **Ctrl+P** (Windows) or **Cmd+P** (Mac) → **Save as PDF**

### Option B — Google Drive PDF (Apps Script)
1. Go to [script.google.com](https://script.google.com) → New Project → Name it "FacultyTrackerReport"
2. Delete all existing code → paste everything from `apps-script/Code.gs`
3. **Deploy → New Deployment → Web App**  
   - Execute as: **Me**  
   - Who has access: **Anyone**  
   - Click Deploy → **Copy the Web App URL**
4. In the Tracker → Reports → Generate Report → paste the URL → Save
5. Click Generate → PDF is created in Google Drive → `Faculty_Activity_Reports / Year / Month /`

> ⚠️ After any change to Code.gs, always re-deploy: Deploy → Manage Deployments → Edit → New version.

### Optional: Gemini AI Report Enhancement
- Get a free key at [aistudio.google.com](https://aistudio.google.com)
- In `Code.gs`, replace `YOUR_GEMINI_KEY_HERE` with your key
- Activity titles are rewritten to be more formal/professional

---

## Deploy to GitHub Pages
1. Create a repository on GitHub (e.g. `faculty-activity-tracker`)
2. Upload `index.html` and `README.md` to the root
3. Go to Settings → Pages → Source: **main branch / root**
4. Your app will be live at `https://yourusername.github.io/faculty-activity-tracker/`

---

## Features
- 📊 **43 Activity Sheets** — AP01–AP23 (Academic Proficiency) + FC01–FC20 (Course File) + Custom
- ☁️ **Firebase Realtime Database** — syncs across all devices in real time
- 📄 **PDF Reports** — Browser PDF (instant) or Google Drive PDF (via Apps Script)
- 📋 **Summary Table** — NAAC/AQAR ready, auto-counted by academic year
- 📅 **Academic Year Manager** — add/remove years, filter dashboard by year
- 📈 **Charts Dashboard** — activity trends, category breakdown, top 10 chart
- 🌐 **Portfolio Page** — showcases books, lab manuals, tools, publications, events
- ⬇️ **CSV Export** — all data exportable as CSV

---

## License
CC BY 4.0 — Free for personal academic use. Attribution required for redistribution.  
© 2025 Dr. C.V. Krishnaveni. All Rights Reserved.
