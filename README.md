# 🎓 Faculty Academic Activity System

<div align="center">

![Version](https://img.shields.io/badge/Version-3.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-CC%20BY%204.0-green?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-orange?style=for-the-badge&logo=firebase)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github)
![Free Forever](https://img.shields.io/badge/Free-Forever-purple?style=for-the-badge)

**A complete, professional, cloud-powered academic activity tracking system for college faculty.**  
*Track · Analyze · Report — from any device, anywhere, anytime.*

🌐 **Live at:** [vkchennuru.github.io](https://vkchennuru.github.io)

---

</div>

## 👩‍💻 About the Author & Copyright

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   © 2025 Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)    ║
║   All Rights Reserved.                                           ║
║                                                                  ║
║   Lecturer in Computer Science & HOD · IQAC Coordinator         ║
║   SKR & SKR Government College for Women (Autonomous)            ║
║   Kadapa, Andhra Pradesh, India — 516 001                        ║
║                                                                  ║
║   🌐 https://cvkrishnaveni.blogspot.com                          ║
║   🐙 https://github.com/vkchennuru                               ║
║   🆔 ORCID: 0000-0003-2209-483X                                  ║
║                                                                  ║
║   This system is free for personal academic use.                 ║
║   Redistribution requires attribution. (CC BY 4.0)              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 📋 Table of Contents

- [What is this?](#-what-is-this)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [App Structure](#-app-structure)
- [Activity Categories](#-activity-categories)
- [How to Use](#-how-to-use)
- [Report Generation Setup](#-report-generation-setup)
- [Firebase Setup](#-firebase-setup)
- [Deploy to GitHub Pages](#-deploy-to-github-pages)
- [Technology Stack](#-technology-stack)
- [License](#-license)

---

## 🌟 What is this?

The **Faculty Academic Activity System** is a **single-file web application** (`index.html`) that combines three powerful tools into one seamless experience:

| Module | Purpose | Audience |
|--------|---------|----------|
| 🏠 **Landing Page** | Beautiful entry point with navigation | Everyone |
| 👩‍💻 **Portfolio** | Public showcase of publications, books, tools, events | Students, Visitors, Auditors |
| 📊 **Activity Tracker** | Private data entry, dashboard, reports | Faculty (You) |

**The core problem it solves:**  
Faculty members spend enormous time maintaining activity records for NAAC, AQAR, and annual reports — scattered across Excel files, notebooks, and emails. This system centralizes everything in one place with real-time cloud sync, beautiful dashboards, and one-click PDF report generation.

---

## 🚀 Live Demo

```
🌐  https://vkchennuru.github.io
```

- Open on **any device** — mobile, tablet, laptop, desktop
- Works on **any browser** — Chrome, Firefox, Edge, Safari
- **No login required** — just open and use
- **Real-time sync** — data entered on phone appears instantly on laptop

---

## ✨ Features

### 🏠 Landing Page
- ✅ Stunning dark gradient design with animated floating orbs
- ✅ Two clear entry points — Portfolio and Activity Tracker
- ✅ Your key stats at a glance
- ✅ Professional academic branding

### 👩‍💻 Portfolio (Public)
- ✅ Sticky navigation with smooth scrolling
- ✅ Hero section with profile card and ORCID link
- ✅ Stats bar (Publications, Lab Manuals, Books, Tools, Patents, FDPs)
- ✅ **5 Lab Solution Manuals** — Python, DBMS, DS, Web, AI & ML
- ✅ **4 Books** — eBooks and Paperbacks with tabbed view
- ✅ **4 Live Tools** — NIRF Assistant, IQAC Collector, Python Playground, DS Visualizer
- ✅ **Publications** — filterable by Journal / Conference / Book Chapter
- ✅ **Events** — filterable by Organized / Attended / FDP / Webinar
- ✅ Contact section with all academic profiles
- ✅ Professional footer with OER license notice

### 📊 Activity Tracker (Private)
- ✅ **Firebase Realtime Database** — instant cloud sync
- ✅ **43 activity categories** — AP01–AP23 + FC01–FC20 + Custom
- ✅ **Academic Year Manager** — add or delete years with one click
- ✅ **Live Dashboard** — infographic cards + 3 interactive charts
- ✅ **Year-wise filter** — see data for any specific academic year
- ✅ **Summary Table** — NAAC/AQAR ready, auto-counted by year
- ✅ **Quick entry forms** — ready to submit the moment activity completes
- ✅ **Delete any entry** — remove incorrect records instantly
- ✅ **One-click Report Generation** — PDF via Google Apps Script → Google Drive
- ✅ **Profile management** — saved to Firebase, syncs everywhere
- ✅ **CSV Export** — download all data as spreadsheet
- ✅ **Connection indicator** — shows live sync status

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  vkchennuru.github.io                    │
│                     (index.html)                         │
│                                                          │
│   ┌──────────┐   ┌─────────────┐   ┌────────────────┐  │
│   │ 🏠 Landing│   │ 👩‍💻 Portfolio│   │ 📊 Tracker App │  │
│   │   Page   │   │  (Public)   │   │  (Private)     │  │
│   └──────────┘   └─────────────┘   └───────┬────────┘  │
└──────────────────────────────────────────────┼──────────┘
                                               │
                              ┌────────────────▼──────────────┐
                              │   Firebase Realtime Database   │
                              │   (Cloud · Free · Always On)   │
                              │                                │
                              │  /faculty_tracker              │
                              │    /profile      → Your info   │
                              │    /academic_years → AY list   │
                              │    /webapp_url   → Script URL  │
                              │    /sheets                     │
                              │      /ap01 → FDP data          │
                              │      /ap02 → Workshop data     │
                              │      /...  → 43 categories     │
                              └────────────────┬──────────────┘
                                               │
                              ┌────────────────▼──────────────┐
                              │    Google Apps Script          │
                              │    (Web App · Free)            │
                              │                                │
                              │  Receives Firebase data        │
                              │  → AI rewrites descriptions    │
                              │  → Builds Google Doc           │
                              │  → Converts to PDF             │
                              │  → Saves to Google Drive       │
                              └───────────────────────────────┘
```

---

## 📁 App Structure

```
index.html                    ← THE ENTIRE APP (single file)
│
├── 🏠 Landing Page
│     └── Entry point with Portfolio & Tracker buttons
│
├── 👩‍💻 Portfolio
│     ├── Sticky Navigation
│     ├── Hero Section
│     ├── Stats Bar
│     ├── Lab Manuals (5)
│     ├── Books & eBooks (4) — tabbed
│     ├── Live Tools (4)
│     ├── Publications (15+) — filterable
│     ├── Events (40+) — filterable
│     ├── Contact & Profiles
│     └── Footer with Copyright
│
└── 📊 Activity Tracker
      ├── Header (sync status · back button)
      ├── Sidebar Navigation (43 categories)
      ├── Dashboard
      │     ├── Academic Year Manager (add/delete)
      │     ├── Year Filter Chips
      │     ├── Infographic Cards (4)
      │     └── Charts (Bar · Donut · Horizontal Bar)
      ├── Summary Table (NAAC/AQAR ready)
      ├── Generate Reports
      │     ├── Setup Guide (5 steps)
      │     ├── Generate Form (AY · Month · Type)
      │     └── Apps Script Code (with copy button)
      ├── My Profile
      └── AP01–AP23 · FC01–FC20 · Custom (43 forms)
```

---

## 📊 Activity Categories

### Academic Proficiency (AP01–AP23)

| Code | Category | Code | Category |
|------|----------|------|----------|
| AP01 | FDPs Attended | AP13 | Books Published |
| AP02 | Workshops Attended | AP14 | LMS eContent Created |
| AP03 | Trainings Attended | AP15 | LMS Subject Expert |
| AP04 | Resource Person | AP16 | Academic Audit |
| AP05 | FDPs Organized | AP17 | Guest Lectures Organized |
| AP06 | Workshops Organized | AP18 | Meetings Attended |
| AP07 | Trainings Organized | AP19 | Certificate Courses Org. |
| AP08 | Webinars / Seminars Org. | AP20 | Committees |
| AP09 | Papers in Seminars | AP21 | Guest Lectures Given |
| AP10 | Conference Papers | AP22 | Exam Duties |
| AP11 | Journal Papers | AP23 | MOOCs |
| AP12 | Book Chapters | — | — |

### Faculty Course File (FC01–FC20)

| Code | Category | Code | Category |
|------|----------|------|----------|
| FC01 | Student Roll List | FC11 | Study Projects |
| FC02 | Time Table | FC12 | Additional Inputs |
| FC03 | Lesson Plan | FC13 | CIA Records |
| FC04 | Annual Curricular Plan | FC14 | Result Analysis |
| FC05 | Teaching Diary | FC15 | CSP (Student Feedback) |
| FC06 | Teaching Notes | FC16 | Short Term Internship |
| FC07 | Student Seminars | FC17 | Long Term Internship |
| FC08 | Quiz Records | FC18 | Mentor-Mentee Records |
| FC09 | Group Discussions | FC19 | Question Papers |
| FC10 | Assignments | FC20 | Teaching Pedagogies |

### ✨ Custom Activities
Add anything that doesn't fit above — Awards, Patents, MoUs, Extension Activities, Community Service, etc.

---

## 📖 How to Use

### Daily Workflow (2 minutes per activity)

```
Activity completes
      ↓
Open vkchennuru.github.io on any device
      ↓
Click "Activity Tracker"
      ↓
Pick the category from sidebar (e.g. AP01 for FDP)
      ↓
Fill the form (Academic Year, Title, Date, etc.)
      ↓
Click "☁️ Save to Firebase"
      ↓
Done! Data synced everywhere instantly ✅
```

### Managing Academic Years

1. Open **Activity Tracker → Dashboard**
2. Find the **Academic Years** box at the top
3. Type `2025-26` → Click **+ Add Year**
4. To remove a year → click **✕** next to it
5. Use the **filter chips** to view data year-wise

### Deleting an Entry

1. Go to the activity category (e.g. AP02)
2. Find the entry in the table
3. Click **✕ Remove** button on that row
4. Confirm deletion → instantly removed from Firebase

### Exporting Data

- Click **⬇️ Export All as CSV** on the Dashboard
- Opens as a spreadsheet in Excel / Google Sheets
- Contains all 43 categories in one file

---

## 📄 Report Generation Setup

### One-Time Setup (5 Steps)

**Step 1 — Create Apps Script Project**
```
1. Go to https://script.google.com
2. Click "New Project"
3. Name it: Faculty Report Generator
```

**Step 2 — Add Script Files**
```
Create 4 files in the project:
  • Code_Receiver.gs   ← from the "Get Script" tab in the app
  • Code_1_MainScript.gs
  • Code_2_AIRewriting.gs
  • Code_3_ReportBuilder.gs
```

**Step 3 — Add Gemini API Key (Free)**
```
1. Go to https://aistudio.google.com/app/apikey
2. Create a free API key
3. Paste it in Code_Receiver.gs → var GEMINI_API_KEY = "YOUR_KEY"
```

**Step 4 — Deploy as Web App**
```
1. Click Deploy → New Deployment
2. Type: Web App
3. Execute as: Me
4. Who has access: Anyone
5. Click Deploy → Copy the Web App URL
```

**Step 5 — Connect to Tracker**
```
1. Open Activity Tracker → Generate Reports → Generate Report
2. Paste your Web App URL
3. Click "💾 Save Web App URL"
4. Done! From now on, reports are one click away.
```

### Generating a Report

```
1. Select Academic Year (e.g. 2025-26)
2. Select Month (or "All Months" for full year report)
3. Select Report Type (Summary / Detailed / NAAC Format)
4. Click "📄 Generate Report → Google Drive"
5. Wait ~30 seconds
6. PDF appears in Google Drive → Faculty_Activity_Reports → Year → Month
```

### Report Output Structure in Google Drive

```
📁 My Drive
  └── 📁 Faculty_Activity_Reports
        └── 📁 2025-26
              ├── 📁 June
              │     └── 📄 DrCVKrishnaveni_Activity_Report_June_2025-26.pdf
              ├── 📁 July
              │     └── 📄 DrCVKrishnaveni_Activity_Report_July_2025-26.pdf
              └── 📁 Full Year
                    └── 📄 DrCVKrishnaveni_Activity_Report_FullYear_2025-26.pdf
```

---

## 🔥 Firebase Setup

Your Firebase project is already configured in the app. For reference:

```javascript
// Firebase Configuration (already in index.html)
const firebaseConfig = {
  apiKey: "XXXXXXXX",
  authDomain: "XXXXXXXX",
  databaseURL: "XXXXXXXX",
  projectId: "XXXXXXXX",
  storageBucket: "XXXXXXXX",
  messagingSenderId:"XXXXXXXX",
  appId: "XXXXXXXX",
};
```

### Firebase Database Structure

```
faculty_tracker/
  ├── profile/           → Your personal & institution details
  ├── academic_years/    → List of active academic years
  ├── webapp_url/        → Your Apps Script Web App URL
  └── sheets/
        ├── ap01/        → FDP attendance records
        ├── ap02/        → Workshop records
        ├── ...          → All 43 activity categories
        └── custom/      → Custom activity records
```

> **Important:** Keep your Firebase project active by using the app regularly. Google's free Spark plan keeps projects alive with regular activity.

---

## 🚀 Deploy to GitHub Pages

Your app is already live! To update it:

```bash
# Option 1 — GitHub Web Interface (easiest)
1. Go to github.com/vkchennuru
2. Open your repository
3. Click on index.html → Edit (pencil icon)
4. Paste the new content
5. Click "Commit changes"
6. Live in ~60 seconds!

# Option 2 — Git Command Line
git clone https://github.com/vkchennuru/vkchennuru.github.io
cd vkchennuru.github.io
# Replace index.html with new version
git add index.html
git commit -m "Update Faculty Activity System"
git push origin main
```

---

## 🛠️ Technology Stack

| Technology | Purpose | Cost |
|-----------|---------|------|
| **HTML5 / CSS3 / JavaScript** | Complete app — single file | Free |
| **Firebase Realtime Database** | Cloud data storage & live sync | Free (Spark Plan) |
| **Chart.js** | Interactive dashboard charts | Free |
| **Google Apps Script** | PDF report generation | Free |
| **Google Drive** | PDF report storage | Free (15GB) |
| **Gemini AI API** | Professional description rewriting | Free tier |
| **GitHub Pages** | App hosting | Free forever |
| **Google Fonts** | Playfair Display, Plus Jakarta Sans | Free |

**Total monthly cost: ₹0** 🎉

---

## 📱 Device Compatibility

| Device | Browser | Status |
|--------|---------|--------|
| 💻 Windows Laptop | Chrome, Edge, Firefox | ✅ Full support |
| 🍎 MacBook | Chrome, Safari, Firefox | ✅ Full support |
| 📱 Android Phone | Chrome | ✅ Full support |
| 🍏 iPhone / iPad | Safari, Chrome | ✅ Full support |
| 🖥️ College Computer | Any modern browser | ✅ Full support |

---

## 🆚 Why This System?

| Feature | Excel Files | Google Forms | This System |
|---------|------------|-------------|-------------|
| Works on any device | ❌ | ✅ | ✅ |
| Real-time sync | ❌ | ❌ | ✅ |
| Dashboard & Charts | ❌ | ❌ | ✅ |
| One-click PDF Reports | ❌ | ❌ | ✅ |
| AI-enhanced reports | ❌ | ❌ | ✅ |
| NAAC Summary Table | Manual | Manual | ✅ Auto |
| Delete entries | ✅ | ❌ | ✅ |
| Public Portfolio | ❌ | ❌ | ✅ |
| Free forever | ✅ | ✅ | ✅ |
| Single URL | ❌ | ❌ | ✅ |

---

## 📞 Support & Updates

This system was built specifically for **Dr. C.V. Krishnaveni** and is maintained by her.

- 🌐 **Portfolio:** [cvkrishnaveni.blogspot.com](https://cvkrishnaveni.blogspot.com)
- 💻 **GitHub:** [github.com/vkchennuru](https://github.com/vkchennuru)
- 🆔 **ORCID:** [0000-0003-2209-483X](https://orcid.org/0000-0003-2209-483X)
- 🔬 **Vidwan:** [Profile Link](https://vidwan.inflibnet.ac.in/profile/76511)

---

## ⚖️ License

```
Copyright © 2025 Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)
All Rights Reserved.

This work is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).

You are FREE to:
  ✅ Use this system for your own academic activity tracking
  ✅ Share this system with proper attribution
  ✅ Adapt this system for your own institution

Under the following conditions:
  📌 Attribution — You must give appropriate credit to Dr. C.V. Krishnaveni
  📌 You must provide a link to the original: vkchennuru.github.io
  📌 Indicate if changes were made

Commercial use is NOT permitted without explicit written permission from the author.

Full license text: https://creativecommons.org/licenses/by/4.0/
```

---

<div align="center">

**Built with ❤️ for Open Education**

*Empowering faculty to track, analyze, and report their academic activities — freely and professionally.*

---

© 2025 **Dr. C.V. Krishnaveni** · SKR & SKR GCW(A), Kadapa · All Rights Reserved

[🌐 Website](https://cvkrishnaveni.blogspot.com) · [💻 GitHub](https://github.com/vkchennuru) · [🆔 ORCID](https://orcid.org/0000-0003-2209-483X)

</div>
