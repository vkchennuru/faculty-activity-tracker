<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="Dr. C.V. Krishnaveni — CS Faculty, IQAC Coordinator & OER Creator, SKR & SKR GCW(A), Kadapa"/>
<title>Dr. C.V. Krishnaveni | Portfolio & Faculty Tracker</title>
<!--
  ╔══════════════════════════════════════════════════════════════╗
  ║  FACULTY ACADEMIC ACTIVITY SYSTEM — UNIFIED APP              ║
  ║  © 2025 Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)  ║
  ║  Lecturer in Computer Science & IQAC Coordinator       ║
  ║  SKR & SKR Government College for Women (Autonomous)         ║
  ║  Kadapa, Andhra Pradesh, India — 516 001                     ║
  ║  https://cvkrishnaveni.blogspot.com                          ║
  ║  All Rights Reserved. Free for personal academic use.        ║
  ║  CC BY 4.0 — Attribution required for redistribution.        ║
  ╚══════════════════════════════════════════════════════════════╝
-->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
/* ══════════════════════════════════════════════════════
   CSS VARIABLES
══════════════════════════════════════════════════════ */
:root {
  --navy:#0B1F4B; --blue:#2563EB; --indigo:#4F46E5;
  --teal:#0D9488; --green:#16A34A; --orange:#EA580C;
  --gold:#D97706; --rose:#E11D48; --pink:#DB2777;
  --red:#DC2626; --cyan:#0891B2; --purple:#7C3AED;
  --bg:#F5F7FF; --card:#FFFFFF; --text:#0F172A;
  --muted:#64748B; --border:#E2E8F0;
  --s1:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(11,31,75,.08);
  --s2:0 8px 32px rgba(11,31,75,.14);
  --s3:0 20px 60px rgba(11,31,75,.18);
  --sidebar-w:248px; --hdr-h:64px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}

/* ══════════════════════════════════════════════════════
   LOADING
══════════════════════════════════════════════════════ */
#loading{position:fixed;inset:0;background:linear-gradient(135deg,#0B1F4B,#1e3a8a,#312e81);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .5s}
#loading.hide{opacity:0;pointer-events:none}
.load-logo{font-family:'Playfair Display',serif;font-size:38px;color:#fff;letter-spacing:.02em}
.load-logo span{color:#93C5FD}
.load-sub{font-size:12px;color:#93C5FD;letter-spacing:.1em;text-transform:uppercase}
.load-bar{width:220px;height:4px;background:rgba(255,255,255,.15);border-radius:10px;overflow:hidden}
.load-fill{height:100%;background:linear-gradient(90deg,#60A5FA,#A78BFA);border-radius:10px;animation:loadfill 2s ease forwards}
@keyframes loadfill{from{width:0}to{width:100%}}

/* ══════════════════════════════════════════════════════
   APP SHELL — 3 MODES
══════════════════════════════════════════════════════ */
#app-landing{display:none}
#app-portfolio{display:none}
#app-tracker{display:none}
#app-landing.active{display:block}
#app-portfolio.active{display:block}
#app-tracker.active{display:flex;flex-direction:column;min-height:100vh}

/* ══════════════════════════════════════════════════════
   ██ LANDING PAGE
══════════════════════════════════════════════════════ */
#app-landing{
  min-height:100vh;
  background:linear-gradient(135deg,#060d1f 0%,#0B1F4B 35%,#1e3a8a 65%,#312e81 100%);
  position:relative; overflow:hidden;
}
.ld-decor{position:absolute;border-radius:50%;pointer-events:none}
.ld1{width:700px;height:700px;top:-250px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,.18),transparent 65%)}
.ld2{width:500px;height:500px;bottom:-150px;left:-150px;background:radial-gradient(circle,rgba(8,145,178,.14),transparent 65%)}
.ld3{width:300px;height:300px;top:50%;left:8%;background:radial-gradient(circle,rgba(255,255,255,.05),transparent 65%)}
.ld4{width:200px;height:200px;top:20%;right:25%;background:radial-gradient(circle,rgba(167,139,250,.1),transparent 65%)}
/* animated floating orbs */
.orb{position:absolute;border-radius:50%;animation:orbfloat 8s ease-in-out infinite;pointer-events:none}
.orb1{width:80px;height:80px;top:15%;left:5%;background:rgba(96,165,250,.12);animation-delay:0s}
.orb2{width:50px;height:50px;top:70%;right:8%;background:rgba(167,139,250,.12);animation-delay:-3s}
.orb3{width:100px;height:100px;bottom:20%;left:30%;background:rgba(34,211,238,.08);animation-delay:-5s}
@keyframes orbfloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-30px) scale(1.05)}}

.ld-inner{
  position:relative;z-index:1;
  min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 24px;
}
.ld-badge{
  display:inline-flex;align-items:center;gap:10px;
  font-family:'JetBrains Mono',monospace;font-size:11px;
  letter-spacing:2.5px;text-transform:uppercase;
  color:#93C5FD;margin-bottom:28px;
  background:rgba(147,197,253,.1);border:1px solid rgba(147,197,253,.25);
  padding:8px 20px;border-radius:30px;
}
.ld-badge::before,.ld-badge::after{content:'';width:20px;height:1px;background:rgba(147,197,253,.5)}
.ld-h1{
  font-family:'Playfair Display',serif;
  font-size:clamp(44px,8vw,88px);line-height:1.04;
  color:#fff;text-align:center;margin-bottom:16px;
  letter-spacing:-.02em;
}
.ld-h1 em{font-style:italic;color:#93C5FD}
.ld-role{font-size:19px;font-weight:600;color:#BAE6FD;margin-bottom:8px;text-align:center}
.ld-inst{
  font-size:14px;color:rgba(186,230,253,.65);font-weight:500;
  text-align:center;margin-bottom:48px;line-height:1.6;
}
.ld-chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:56px}
.lchip{
  font-size:12px;font-weight:600;padding:7px 18px;border-radius:30px;
  border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);
  color:#E0E7FF;backdrop-filter:blur(8px);transition:all .2s;cursor:default;
}
.lchip:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.35)}

/* ── TWO BIG CTA CARDS ── */
.ld-cta{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:820px;width:100%;margin-bottom:56px}
.cta-card{
  border-radius:24px;padding:36px 28px;cursor:pointer;
  transition:all .3s cubic-bezier(.4,0,.2,1);
  position:relative;overflow:hidden;text-align:center;text-decoration:none;display:block;
}
.cta-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .3s;border-radius:24px}
.cta-card:hover{transform:translateY(-8px)}
.cta-card:hover::before{opacity:1}
.cta-port{
  background:linear-gradient(135deg,rgba(59,79,216,.25),rgba(99,102,241,.35));
  border:2px solid rgba(99,102,241,.4);
}
.cta-port::before{background:linear-gradient(135deg,rgba(59,79,216,.4),rgba(99,102,241,.5))}
.cta-track{
  background:linear-gradient(135deg,rgba(13,148,136,.2),rgba(8,145,178,.3));
  border:2px solid rgba(8,145,178,.4);
}
.cta-track::before{background:linear-gradient(135deg,rgba(13,148,136,.35),rgba(8,145,178,.45))}
.cta-icon{font-size:52px;margin-bottom:18px;display:block;filter:drop-shadow(0 4px 12px rgba(0,0,0,.3))}
.cta-label{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:8px}
.cta-sub{font-size:13px;color:rgba(255,255,255,.65);line-height:1.5;font-weight:500}
.cta-arr{
  display:inline-flex;align-items:center;gap:6px;
  font-size:13px;font-weight:700;color:rgba(255,255,255,.8);
  margin-top:18px;padding:8px 20px;border-radius:20px;
  border:1.5px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);
  transition:all .2s;
}
.cta-card:hover .cta-arr{background:rgba(255,255,255,.18);color:#fff}

/* ── LANDING STATS ── */
.ld-stats{
  display:flex;gap:48px;justify-content:center;flex-wrap:wrap;
  padding-top:40px;border-top:1px solid rgba(255,255,255,.1);
  max-width:700px;width:100%;
}
.ld-stat .n{font-family:'Playfair Display',serif;font-size:38px;font-weight:900;color:#fff;display:block;line-height:1}
.ld-stat .l{font-size:11px;color:#93C5FD;text-transform:uppercase;letter-spacing:.12em;font-weight:700;margin-top:5px;display:block}

/* ══════════════════════════════════════════════════════
   ██ PORTFOLIO
══════════════════════════════════════════════════════ */
.port-nav{
  position:sticky;top:0;z-index:900;
  background:rgba(255,255,255,0.97);backdrop-filter:blur(18px);
  border-bottom:2px solid var(--blue);
  padding:0 48px;height:68px;
  display:flex;align-items:center;justify-content:space-between;
  box-shadow:0 2px 20px rgba(59,79,216,0.08);
}
.port-logo{display:flex;align-items:center;gap:13px;text-decoration:none;cursor:pointer}
.port-mono{
  width:44px;height:44px;border-radius:11px;
  background:linear-gradient(135deg,var(--blue),var(--teal));
  display:flex;align-items:center;justify-content:center;
  font-family:'Playfair Display',serif;font-size:19px;font-weight:700;
  color:#fff;box-shadow:0 4px 14px rgba(37,99,235,0.3);
}
.port-nav-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#0f1535}
.port-nav-sub{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--blue);letter-spacing:1.8px;text-transform:uppercase;margin-top:1px}
.port-links{display:flex;gap:3px}
.port-link{font-size:13px;font-weight:600;padding:7px 14px;border-radius:8px;color:var(--muted);text-decoration:none;border:none;background:transparent;cursor:pointer;transition:all .18s}
.port-link:hover{color:var(--blue);background:#eef2ff}
.port-link.act{color:#fff;background:var(--blue)}
.btn-tracker{
  font-size:13px;font-weight:700;padding:9px 20px;border-radius:9px;
  background:linear-gradient(135deg,var(--navy),var(--blue));color:#fff;
  border:none;cursor:pointer;transition:all .2s;
  display:flex;align-items:center;gap:8px;
  box-shadow:0 4px 12px rgba(11,31,75,.3);white-space:nowrap;
}
.btn-tracker:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(11,31,75,.4)}

/* ── HERO ── */
.p-hero{
  background:linear-gradient(135deg,#fff 0%,#eef2ff 50%,#f0f4ff 100%);
  padding:72px 48px 60px;border-bottom:1px solid var(--border);
  position:relative;overflow:hidden;
}
.p-hd1{position:absolute;top:-100px;right:-80px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.07),transparent 65%);pointer-events:none}
.p-hd2{position:absolute;bottom:-80px;left:15%;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(13,148,136,.06),transparent 65%);pointer-events:none}
.p-hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 280px;gap:56px;align-items:center;position:relative;z-index:1}
.p-tag{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--blue);margin-bottom:18px;display:flex;align-items:center;gap:10px;font-weight:600}
.p-tag::before{content:'';width:32px;height:2px;background:var(--blue);border-radius:2px}
.p-h1{font-family:'Playfair Display',serif;font-size:clamp(38px,5vw,60px);line-height:1.1;color:#0f1535;margin-bottom:12px;letter-spacing:-.5px}
.p-h1 em{font-style:italic;color:var(--blue)}
.p-role{font-size:18px;font-weight:700;color:#2d3561;margin-bottom:6px}
.p-inst{font-size:15px;color:#5a6285;margin-bottom:28px;font-weight:500}
.p-chips{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:34px}
.chip{font-size:13px;font-weight:600;padding:6px 16px;border-radius:30px;border:1.5px solid}
.ci{background:#eef2ff;color:var(--blue);border-color:#c7d2fe}
.ct{background:#e0f5f9;color:var(--teal);border-color:#cbeef5}
.ca{background:#fef3c7;color:#d97706;border-color:#fde68a}
.cr{background:#fce7ee;color:var(--rose);border-color:#fbb6c8}
.cv{background:#ede9fe;color:var(--purple);border-color:#c4b5fd}
.cg{background:#d1fae5;color:var(--green);border-color:#6ee7b7}
.p-btns{display:flex;gap:14px;flex-wrap:wrap}
.btn-pp{font-size:14px;font-weight:700;padding:12px 26px;border-radius:10px;border:none;cursor:pointer;background:var(--blue);color:#fff;box-shadow:0 5px 18px rgba(37,99,235,.35);transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-pp:hover{background:#1d4ed8;transform:translateY(-2px)}
.btn-po{font-size:14px;font-weight:700;padding:12px 26px;border-radius:10px;cursor:pointer;background:#fff;color:var(--blue);border:2px solid var(--blue);transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-po:hover{background:#eef2ff;transform:translateY(-2px)}
.btn-pt{font-size:14px;font-weight:700;padding:12px 26px;border-radius:10px;border:none;cursor:pointer;background:linear-gradient(135deg,var(--navy),var(--blue));color:#fff;box-shadow:0 5px 18px rgba(11,31,75,.3);transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-pt:hover{transform:translateY(-2px)}

/* Hero profile card */
.hc{background:#fff;border:1px solid var(--border);border-radius:16px;padding:30px 24px;text-align:center;box-shadow:0 8px 48px rgba(37,99,235,.12);position:relative;overflow:hidden}
.hc::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--blue),var(--teal),var(--purple))}
.hc-av{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--teal));display:flex;align-items:center;justify-content:center;font-size:42px;margin:8px auto 18px;box-shadow:0 8px 28px rgba(37,99,235,.22);border:4px solid #fff}
.hc-name{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#0f1535;margin-bottom:3px}
.hc-dept{font-size:13px;color:#5a6285;margin-bottom:18px;font-weight:500}
.hc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
.hc-stat{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:10px 8px}
.hc-n{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--blue);line-height:1}
.hc-l{font-size:11px;color:#5a6285;margin-top:2px;font-weight:600}
.hc-orcid{display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--teal);background:#e0f5f9;border:1.5px solid #cbeef5;padding:8px 12px;border-radius:8px;text-decoration:none;font-weight:600}
.hc-orcid:hover{background:#cbeef5}

/* ── STATS BAR ── */
.p-stats{background:#fff;border-bottom:1px solid var(--border);padding:22px 48px;box-shadow:0 2px 8px rgba(15,21,53,.04)}
.p-stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px}
.scard{background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:16px 14px;text-align:center;transition:all .22s;border-top:3px solid transparent}
.scard:hover{transform:translateY(-4px);box-shadow:var(--s2)}
.si{border-top-color:var(--blue)} .st{border-top-color:var(--teal)} .sa{border-top-color:var(--gold)} .sr{border-top-color:var(--rose)} .sv{border-top-color:var(--purple)} .sg{border-top-color:var(--green)}
.sc-ico{font-size:20px;margin-bottom:5px}
.sc-n{font-family:'Playfair Display',serif;font-size:32px;font-weight:700;line-height:1;margin-bottom:5px}
.si .sc-n{color:var(--blue)} .st .sc-n{color:var(--teal)} .sa .sc-n{color:var(--gold)} .sr .sc-n{color:var(--rose)} .sv .sc-n{color:var(--purple)} .sg .sc-n{color:var(--green)}
.sc-l{font-size:12px;color:var(--muted);font-weight:600;line-height:1.3}

/* ── PORTFOLIO MAIN ── */
.p-main{max-width:1100px;margin:0 auto;padding:52px 48px 100px}
.oer-band{background:linear-gradient(135deg,#eef2ff,#e0f5f9);border:1.5px solid #c7d2fe;border-radius:16px;padding:22px 28px;margin-bottom:56px;display:flex;align-items:center;gap:20px;box-shadow:var(--s1)}
.oer-ico{width:52px;height:52px;flex-shrink:0;border-radius:13px;background:#fff;border:1.5px solid #c7d2fe;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:var(--s1)}
.oer-h{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#0f1535;margin-bottom:4px}
.oer-p{font-size:14px;color:#5a6285;line-height:1.6;font-weight:500}
.oer-p a{color:var(--blue);text-decoration:none;font-weight:700}
.p-section{margin-bottom:64px}
.sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px;padding-bottom:16px;border-bottom:2px solid var(--bg);position:relative}
.sec-hd::after{content:'';position:absolute;bottom:-2px;left:0;width:56px;height:3px;background:var(--blue);border-radius:2px}
.sec-ttl{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#0f1535;display:flex;align-items:center;gap:12px}
.sec-badge{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;background:#eef2ff;color:var(--blue);border:1.5px solid #c7d2fe;padding:4px 12px;border-radius:6px}
.sec-filters{display:flex;gap:7px;flex-wrap:wrap}
.filt{font-size:13px;font-weight:600;padding:6px 16px;border-radius:8px;border:1.5px solid var(--border);background:#fff;color:var(--muted);cursor:pointer;transition:all .15s}
.filt:hover,.filt.on{background:var(--blue);color:#fff;border-color:var(--blue)}

/* ── PORTFOLIO CARDS ── */
.grid3{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:20px}
.grid2{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:20px}
.grid4{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px}
.card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:26px;box-shadow:var(--s1);transition:all .22s;position:relative;overflow:hidden}
.card::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--blue);transform:scaleX(0);transform-origin:left;transition:transform .25s ease}
.card:hover{transform:translateY(-5px);box-shadow:var(--s2)}
.card:hover::after{transform:scaleX(1)}
.card.ta::after{background:var(--gold)} .card.tv::after{background:var(--purple)} .card.tr::after{background:var(--rose)} .card.tt::after{background:var(--teal)} .card.tg::after{background:var(--green)}
.card-ico{font-size:32px;margin-bottom:13px;display:block}
.cbadge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:700;padding:4px 11px;border-radius:5px;margin-bottom:12px;border:1.5px solid}
.cbi{background:#eef2ff;color:var(--blue);border-color:#c7d2fe}
.cbt{background:#e0f5f9;color:var(--teal);border-color:#cbeef5}
.cba{background:#fef3c7;color:var(--gold);border-color:#fde68a}
.cbv{background:#ede9fe;color:var(--purple);border-color:#c4b5fd}
.cbr{background:#fce7ee;color:var(--rose);border-color:#fbb6c8}
.cbg{background:#d1fae5;color:var(--green);border-color:#6ee7b7}
.card-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#0f1535;margin-bottom:6px;line-height:1.3}
.card-sub{font-family:'JetBrains Mono',monospace;font-size:11px;color:#8b91b0;letter-spacing:.5px;margin-bottom:10px;font-weight:500}
.card-desc{font-size:14px;color:#5a6285;line-height:1.7;margin-bottom:16px;font-weight:500}
.card-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px}
.tag{font-size:12px;font-weight:600;padding:4px 11px;border-radius:6px;background:var(--bg);color:var(--muted);border:1px solid var(--border)}
.card-acts{display:flex;gap:9px;flex-wrap:wrap}
.btn-c{font-size:13px;font-weight:700;padding:9px 18px;border-radius:8px;border:none;cursor:pointer;transition:all .18s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.bcp{background:var(--blue);color:#fff;box-shadow:0 3px 10px rgba(37,99,235,.25)} .bcp:hover{background:#1d4ed8}
.bco{background:#fff;color:var(--blue);border:2px solid #c7d2fe} .bco:hover{background:#eef2ff;border-color:var(--blue)}
.bcg{background:var(--bg);color:var(--muted);border:1px solid var(--border)} .bcg:hover{background:var(--border)}
.bca{background:var(--gold);color:#fff;box-shadow:0 3px 10px rgba(217,119,6,.2)} .bca:hover{opacity:.9}

/* ── BOOKS ── */
.book-card{background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:var(--s1);transition:all .22s}
.book-card:hover{transform:translateY(-5px);box-shadow:var(--s2)}
.book-cover{height:130px;display:flex;align-items:center;justify-content:center;font-size:54px}
.bc-i{background:linear-gradient(135deg,#eef2ff,#c7d2fe)}
.bc-r{background:linear-gradient(135deg,#fce7ee,#fbb6c8)}
.bc-a{background:linear-gradient(135deg,#fef3c7,#fde68a)}
.bc-t{background:linear-gradient(135deg,#e0f5f9,#cbeef5)}
.book-body{padding:20px}
.book-type{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#8b91b0;margin-bottom:7px;font-weight:600}
.book-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#0f1535;line-height:1.35;margin-bottom:6px}
.book-meta{font-size:13px;color:#5a6285;margin-bottom:4px;font-weight:500}
.book-isbn{font-family:'JetBrains Mono',monospace;font-size:11px;color:#8b91b0;margin-bottom:16px}

/* ── TOOL CARDS ── */
.tool-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:26px;box-shadow:var(--s1);transition:all .22s}
.tool-card:hover{transform:translateY(-5px);box-shadow:var(--s2)}
.live-pill{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:700;padding:5px 12px;border-radius:5px;margin-bottom:16px;background:#d1fae5;color:var(--green);border:1.5px solid #6ee7b7}
.live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:ldpulse 1.8s infinite}
@keyframes ldpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}

/* ── PUBLICATIONS ── */
.pub-item{background:#fff;border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:12px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;box-shadow:var(--s1);transition:all .18s}
.pub-item:hover{transform:translateX(5px);box-shadow:var(--s2)}
.pub-item.conf{border-left-color:var(--teal)}
.pub-item.book-ch{border-left-color:var(--purple)}
.pub-item.seminar{border-left-color:var(--gold)}
.pub-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:600;color:#0f1535;margin-bottom:5px;line-height:1.4}
.pub-venue{font-size:13px;color:#5a6285;font-style:italic;margin-bottom:8px;font-weight:500}
.pub-row{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.pub-yr{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--blue);font-weight:700}
.pub-type{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.5px;font-weight:700;padding:3px 9px;border-radius:4px;border:1.5px solid}

/* ── EVENTS ── */
.event-item{background:#fff;border:1px solid var(--border);border-radius:12px;padding:18px 20px;margin-bottom:12px;display:flex;align-items:flex-start;gap:16px;box-shadow:var(--s1);transition:all .18s}
.event-item:hover{transform:translateY(-3px);box-shadow:var(--s2)}
.ebox{flex-shrink:0;width:58px;text-align:center;background:#eef2ff;border:1.5px solid #c7d2fe;border-radius:10px;padding:10px 6px}
.ebox-yr{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--blue);font-weight:600;line-height:1}
.ebox-mo{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#2d3561}
.einfo{flex:1}
.etitle{font-size:15px;font-weight:700;color:#0f1535;margin-bottom:4px;line-height:1.3}
.eorg{font-size:13px;color:#5a6285;margin-bottom:8px;font-weight:500}
.etags{display:flex;gap:6px;flex-wrap:wrap}
.etag{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;padding:3px 9px;border-radius:4px}
.et-org{background:#fce7ee;color:var(--rose)} .et-att{background:#eef2ff;color:var(--blue)} .et-fdp{background:#fef3c7;color:var(--gold)} .et-sem{background:#e0f5f9;color:var(--teal)} .et-wkp{background:#ede9fe;color:var(--purple)} .et-web{background:#d1fae5;color:var(--green)}

/* ── TABS ── */
.tab-bar{display:flex;gap:6px;margin-bottom:24px;flex-wrap:wrap}
.tabbtn{font-size:13px;font-weight:700;padding:9px 20px;border-radius:9px;border:2px solid var(--border);background:#fff;color:var(--muted);cursor:pointer;transition:all .18s}
.tabbtn:hover{border-color:var(--blue);color:var(--blue)}
.tabbtn.on{background:var(--blue);color:#fff;border-color:var(--blue)}
.tab-pane{display:none}
.tab-pane.on{display:block;animation:fadeUp .3s ease both}

/* ── CONTACT ── */
.contact-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.contact-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:22px 18px;text-align:center;cursor:pointer;transition:all .2s;text-decoration:none;display:block;box-shadow:var(--s1)}
.contact-card:hover{border-color:var(--blue);transform:translateY(-4px);box-shadow:var(--s3)}
.contact-ico{font-size:28px;margin-bottom:9px}
.contact-lbl{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#8b91b0;margin-bottom:6px;font-weight:600}
.contact-val{font-size:14px;font-weight:700;color:var(--blue)}

/* ── FOOTER ── */
.p-footer{background:#0f1535;color:#c8cedf;padding:44px 48px 28px;border-top:3px solid var(--blue)}
.p-footer-inner{max-width:1100px;margin:0 auto}
.p-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:44px;margin-bottom:32px}
.f-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:8px}
.f-inst{font-size:13px;color:#8892b0;line-height:1.7;margin-bottom:16px}
.f-lic{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#8892b0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);padding:7px 14px;border-radius:6px}
.f-col-h{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8892b0;margin-bottom:16px}
.f-a{display:block;font-size:14px;color:#8892b0;text-decoration:none;margin-bottom:9px;font-weight:500;transition:color .18s}
.f-a:hover{color:#c7d2fe}
.f-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.f-copy{font-family:'JetBrains Mono',monospace;font-size:12px;color:#5a6285}
.f-copy strong{color:#8892b0}

/* ══════════════════════════════════════════════════════
   ██ TRACKER APP — HEADER
══════════════════════════════════════════════════════ */
#t-hdr{position:fixed;top:0;left:0;right:0;z-index:200;height:var(--hdr-h);background:rgba(11,31,75,.97);backdrop-filter:blur(12px);display:flex;align-items:center;padding:0 20px;gap:14px;border-bottom:1px solid rgba(255,255,255,.08)}
.t-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.t-logo-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--blue),var(--indigo));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.t-logo-text{font-family:'Playfair Display',serif;font-size:18px;color:#fff;letter-spacing:.01em}
.t-logo-text span{color:#93C5FD}
#t-hdr-name{font-size:12px;color:#BAE6FD;font-weight:600;padding:4px 12px;background:rgba(255,255,255,.07);border-radius:20px;white-space:nowrap}
.t-hdr-spacer{flex:1}
#sync-pill{display:flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);font-size:11px;color:#fff;font-weight:600;white-space:nowrap;transition:all .3s}
#sync-pill.live{background:rgba(34,197,94,.15);border-color:rgba(34,197,94,.3);color:#86EFAC}
#sync-pill.error{background:rgba(239,68,68,.15);border-color:rgba(239,68,68,.3);color:#FCA5A5}
#sync-dot{width:7px;height:7px;border-radius:50%;background:#94A3B8;flex-shrink:0}
#sync-pill.live #sync-dot{background:#22C55E;box-shadow:0 0 6px #22C55E}
#sync-pill.error #sync-dot{background:#EF4444}
.pulse{animation:dotpulse 1s infinite}
@keyframes dotpulse{0%,100%{opacity:1}50%{opacity:.3}}
#t-menu-btn{display:none;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;padding:4px}
.btn-back-home{
  display:flex;align-items:center;gap:7px;padding:6px 14px;border-radius:20px;
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);
  color:#BAE6FD;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;
}
.btn-back-home:hover{background:rgba(255,255,255,.15);color:#fff}

/* ══ SIDEBAR ══ */
#t-sidebar{width:var(--sidebar-w);background:linear-gradient(180deg,#0B1F4B,#0f2a5e);position:fixed;top:var(--hdr-h);bottom:0;left:0;overflow-y:auto;z-index:100;transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.1) transparent}
.nav-section{padding:6px 0}
.nav-label{font-size:9px;font-weight:800;letter-spacing:.14em;color:#60A5FA;text-transform:uppercase;padding:8px 16px 3px;display:flex;align-items:center;gap:6px}
.nav-label::after{content:'';flex:1;height:1px;background:rgba(96,165,250,.2)}
.nav-item{display:flex;align-items:center;gap:9px;padding:8px 16px;cursor:pointer;color:#94A3B8;font-size:12px;font-weight:500;transition:all .18s;border-left:3px solid transparent;position:relative}
.nav-item:hover{background:rgba(255,255,255,.06);color:#E2E8F0;border-left-color:rgba(96,165,250,.4)}
.nav-item.active{background:linear-gradient(90deg,rgba(37,99,235,.25),rgba(37,99,235,.05));color:#fff;border-left-color:#60A5FA;font-weight:600}
.nav-icon{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;background:rgba(255,255,255,.06)}
.nav-item.active .nav-icon{background:rgba(96,165,250,.2)}
.nav-badge{margin-left:auto;font-size:10px;font-family:'JetBrains Mono',monospace;background:rgba(255,255,255,.1);color:#E2E8F0;padding:1px 7px;border-radius:8px;min-width:22px;text-align:center;font-weight:600}
.nav-badge.has{background:rgba(37,99,235,.4);color:#93C5FD}
.nav-divider{height:1px;background:rgba(255,255,255,.06);margin:4px 12px}
.dev-card{margin:12px;border-radius:14px;background:linear-gradient(135deg,rgba(37,99,235,.3),rgba(79,70,229,.3));border:1px solid rgba(255,255,255,.1);padding:14px;flex-shrink:0}
.dev-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--purple));display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:8px}
.dev-name{font-size:13px;font-weight:700;color:#fff;line-height:1.3}
.dev-role{font-size:10px;color:#93C5FD;margin-top:2px;line-height:1.4}
.dev-college{font-size:10px;color:#BAE6FD;margin-top:3px;line-height:1.4}
.dev-link{display:inline-flex;align-items:center;gap:4px;margin-top:6px;font-size:10px;color:#60A5FA;text-decoration:none;font-weight:600}
.dev-copy{font-size:9px;color:#475569;margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.08)}

/* ══ MAIN CONTENT ══ */
#t-main{margin-left:var(--sidebar-w);flex:1;padding:28px;min-height:calc(100vh - var(--hdr-h));margin-top:var(--hdr-h)}

/* ══ VIEWS ══ */
.view{display:none;animation:pageIn .25s ease}
.view.active{display:block}
@keyframes pageIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.fade{animation:fadeUp .5s ease both}
.d1{animation-delay:.05s} .d2{animation-delay:.1s} .d3{animation-delay:.15s} .d4{animation-delay:.2s} .d5{animation-delay:.25s} .d6{animation-delay:.3s}

/* ══ PAGE HEADER ══ */
.pg-header{margin-bottom:24px}
.pg-title{font-family:'Playfair Display',serif;font-size:28px;color:var(--navy);line-height:1.2}
.pg-sub{font-size:13px;color:var(--muted);margin-top:4px;display:flex;align-items:center;gap:8px}
.live-badge{display:inline-flex;align-items:center;gap:5px;background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700}
.live-dot-g{width:6px;height:6px;border-radius:50%;background:#10B981;animation:ldpulse 1.5s infinite}

/* ══ WELCOME BANNER ══ */
.wb{background:linear-gradient(135deg,#0B1F4B,#1e3a8a,#312e81);border-radius:20px;padding:28px 32px;margin-bottom:26px;color:#fff;display:flex;align-items:center;gap:24px;position:relative;overflow:hidden}
.wb::before{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.04)}
.wb::after{content:'';position:absolute;right:60px;bottom:-60px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.03)}
.wb-icon{font-size:52px;flex-shrink:0;position:relative;z-index:1}
.wb-text{position:relative;z-index:1}
.wb-text h2{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:5px}
.wb-text p{font-size:13px;color:#93C5FD;line-height:1.6}
.wb-stats{margin-left:auto;display:flex;gap:20px;position:relative;z-index:1;flex-shrink:0}
.wb-stat .n{font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:#fff;display:block}
.wb-stat .l{font-size:9px;color:#93C5FD;text-transform:uppercase;letter-spacing:.1em;font-weight:700}

/* ══ STAT CARDS ══ */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;margin-bottom:26px}
.stat-card{background:var(--card);border-radius:18px;padding:20px;box-shadow:var(--s1);position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--card-accent,var(--blue))}
.stat-card::after{content:var(--card-emoji,'📊');position:absolute;right:14px;top:14px;font-size:28px;opacity:.12}
.stat-card:hover{transform:translateY(-3px);box-shadow:var(--s2)}
.stat-num{font-family:'Playfair Display',serif;font-size:38px;color:var(--navy);line-height:1;font-weight:900}
.stat-label{font-size:11px;color:var(--muted);margin-top:5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em}
.stat-change{font-size:10px;margin-top:4px;color:#10B981;font-weight:600}

/* ══ CHART GRID ══ */
.chart-grid{display:grid;grid-template-columns:2fr 1fr;gap:18px;margin-bottom:26px}
.chart-card{background:var(--card);border-radius:18px;padding:22px;box-shadow:var(--s1)}
.chart-card.full{grid-column:1/-1}
.chart-title{font-size:13px;font-weight:800;color:var(--navy);margin-bottom:16px;text-transform:uppercase;letter-spacing:.06em;display:flex;align-items:center;gap:8px}
.chart-title::before{content:'';width:4px;height:16px;border-radius:2px;background:var(--blue);display:block}
.chart-inner{position:relative;height:200px}

/* ══ AY FILTER ══ */
.filter-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;align-items:center}
.filter-label{font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.ay-chip{padding:5px 16px;border-radius:20px;border:2px solid var(--border);background:var(--card);font-size:12px;font-weight:600;cursor:pointer;transition:all .18s;color:var(--muted)}
.ay-chip:hover{border-color:var(--blue);color:var(--blue);transform:translateY(-1px)}
.ay-chip.active{background:var(--navy);color:#fff;border-color:var(--navy);box-shadow:0 4px 12px rgba(11,31,75,.25)}

/* ══ INFOGRAPHIC ══ */
.infographic{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:26px}
.info-card{border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:8px;position:relative;overflow:hidden}
.info-card .info-icon{font-size:32px;line-height:1}
.info-card .info-num{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#fff;line-height:1}
.info-card .info-label{font-size:11px;font-weight:700;color:rgba(255,255,255,.8);text-transform:uppercase;letter-spacing:.06em}
.info-card .info-bg{position:absolute;right:-10px;bottom:-10px;font-size:70px;opacity:.12;line-height:1}
.ic1{background:linear-gradient(135deg,#1D4ED8,#4F46E5)}
.ic2{background:linear-gradient(135deg,var(--teal),var(--green))}
.ic3{background:linear-gradient(135deg,var(--gold),var(--orange))}
.ic4{background:linear-gradient(135deg,var(--purple),var(--pink))}

/* ══ FORMS ══ */
.form-card{background:var(--card);border-radius:18px;padding:26px;box-shadow:var(--s1);margin-bottom:20px;border:1px solid rgba(37,99,235,.06)}
.form-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid var(--bg)}
.form-header-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.form-header-text h3{font-size:15px;font-weight:800;color:var(--navy)}
.form-header-text p{font-size:12px;color:var(--muted);margin-top:2px}
.form-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
.form-group{display:flex;flex-direction:column;gap:5px}
.form-group.full{grid-column:1/-1}
.form-group label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;display:flex;align-items:center;gap:4px}
.form-group label .req{color:#EF4444;font-size:13px}
.form-group input,.form-group select,.form-group textarea{padding:10px 13px;border:2px solid var(--border);border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:var(--text);background:#FAFBFF;transition:all .2s;outline:none;width:100%}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(37,99,235,.08);background:#fff}
.form-group input.error{border-color:#EF4444;box-shadow:0 0 0 4px rgba(239,68,68,.08)}
.form-group textarea{resize:vertical;min-height:60px}
.form-actions{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap}
.btn{padding:10px 22px;border-radius:10px;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:7px;letter-spacing:.01em}
.btn-primary{background:linear-gradient(135deg,#1D4ED8,#4F46E5);color:#fff;box-shadow:0 4px 14px rgba(29,78,216,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(29,78,216,.4)}
.btn-secondary{background:var(--bg);color:var(--muted);border:2px solid var(--border)}
.btn-secondary:hover{background:var(--border);color:var(--text)}
.btn-success{background:linear-gradient(135deg,#059669,#0D9488);color:#fff;box-shadow:0 4px 14px rgba(5,150,105,.3)}
.btn-success:hover{transform:translateY(-2px)}
.btn-danger{background:#FEF2F2;color:#DC2626;border:2px solid #FECACA}
.btn-danger:hover{background:#FEE2E2}
.btn-report{background:linear-gradient(135deg,#D97706,#EA580C);color:#fff;box-shadow:0 4px 14px rgba(217,119,6,.3)}
.btn-report:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(217,119,6,.4)}

/* ══ AY MANAGER ══ */
.ay-manager{background:var(--card);border-radius:18px;padding:24px;box-shadow:var(--s1);margin-bottom:24px;border:1px solid rgba(37,99,235,.06)}
.ay-manager-title{font-size:14px;font-weight:800;color:var(--navy);margin-bottom:16px;display:flex;align-items:center;gap:8px}
.ay-manager-title::before{content:'';width:4px;height:16px;border-radius:2px;background:var(--blue);display:block}
.ay-tags{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.ay-tag{display:flex;align-items:center;gap:8px;padding:8px 16px;background:linear-gradient(135deg,#EFF6FF,#EEF2FF);border:1.5px solid #BFDBFE;border-radius:10px;font-size:13px;font-weight:700;color:var(--navy)}
.ay-tag .del-ay{background:none;border:none;color:#94A3B8;cursor:pointer;font-size:14px;padding:0 2px;line-height:1;transition:color .15s}
.ay-tag .del-ay:hover{color:#DC2626}
.ay-add-form{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.ay-add-form input{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:var(--text);background:#FAFBFF;outline:none;transition:all .2s;width:160px}
.ay-add-form input:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(37,99,235,.08);background:#fff}

/* ══ TABLE ══ */
.table-card{background:var(--card);border-radius:18px;box-shadow:var(--s1);overflow:hidden;margin-bottom:20px;border:1px solid rgba(37,99,235,.06)}
.table-hdr{padding:16px 22px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border)}
.table-hdr-left{display:flex;align-items:center;gap:10px}
.table-hdr-icon{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px}
.table-hdr-title{font-size:14px;font-weight:800;color:var(--navy)}
.table-hdr-sub{font-size:11px;color:var(--muted);margin-top:1px}
.table-count-pill{font-family:'JetBrains Mono',monospace;font-size:11px;padding:4px 12px;border-radius:20px;font-weight:700}
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:12px}
th{background:#F8FAFF;color:var(--navy);font-weight:800;padding:11px 16px;text-align:left;border-bottom:2px solid var(--border);white-space:nowrap;font-size:10px;letter-spacing:.05em;text-transform:uppercase}
td{padding:10px 16px;border-bottom:1px solid #F1F5F9;vertical-align:middle;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
tr:last-child td{border-bottom:none}
tr:hover td{background:#F8FAFF}
.td-ay{font-family:'JetBrains Mono',monospace;font-size:10px;background:#EFF6FF;color:#1D4ED8;padding:3px 9px;border-radius:6px;display:inline-block;font-weight:600;border:1px solid #BFDBFE}
.del-btn{background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:7px;padding:4px 10px;cursor:pointer;font-size:10px;font-weight:700;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
.del-btn:hover{background:#FEE2E2;transform:scale(1.05)}
.empty-state{text-align:center;padding:52px 20px;color:var(--muted)}
.empty-icon{font-size:48px;margin-bottom:10px;display:block;opacity:.5}
.empty-title{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:4px}
.empty-sub{font-size:12px}

/* ══ SUMMARY TABLE ══ */
.summary-wrap{overflow-x:auto}
.summary-table{width:100%;border-collapse:collapse;font-size:11px}
.summary-table th{background:var(--navy);color:#fff;padding:10px 14px;font-size:9px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.summary-table th:first-child{text-align:left;min-width:200px}
.summary-table td{padding:8px 14px;border-bottom:1px solid #F1F5F9;text-align:center}
.summary-table td:first-child{text-align:left;font-size:11px;color:var(--text)}
.summary-table .sec-row td{background:#EFF6FF;font-weight:800;color:var(--navy);font-size:11px;text-align:left}
.summary-table .sec-row td:not(:first-child){text-align:center}
.summary-table .total-row td{background:linear-gradient(90deg,var(--navy),#1e3a8a);color:#fff;font-weight:800;font-family:'JetBrains Mono',monospace;font-size:11px}
.num-cell{font-family:'JetBrains Mono',monospace;font-weight:600;color:#94A3B8}
.num-cell.has{color:#2563EB;font-weight:800}

/* ══ REPORT VIEW ══ */
.report-hero{background:linear-gradient(135deg,#0B1F4B,#1e3a8a,#312e81);border-radius:20px;padding:32px;margin-bottom:26px;color:#fff;position:relative;overflow:hidden}
.report-hero::before{content:'';position:absolute;right:-60px;top:-60px;width:250px;height:250px;border-radius:50%;background:rgba(255,255,255,.04)}
.report-hero h2{font-family:'Playfair Display',serif;font-size:24px;margin-bottom:8px;position:relative;z-index:1}
.report-hero p{font-size:13px;color:#93C5FD;line-height:1.6;position:relative;z-index:1}
.report-options{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-bottom:26px}
.report-option{background:var(--card);border-radius:18px;padding:26px;box-shadow:var(--s1);border:2px solid var(--border);transition:all .2s;cursor:pointer}
.report-option:hover{border-color:var(--blue);transform:translateY(-3px);box-shadow:var(--s2)}
.report-option-icon{font-size:36px;margin-bottom:14px;display:block}
.report-option-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--navy);margin-bottom:6px}
.report-option-desc{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:16px}
.report-form{background:var(--card);border-radius:18px;padding:28px;box-shadow:var(--s1);margin-bottom:20px;border:1px solid rgba(37,99,235,.06)}
.script-block{background:#0f172a;border-radius:14px;padding:20px;margin-top:16px;position:relative}
.script-block code{font-family:'JetBrains Mono',monospace;font-size:11px;color:#94A3B8;white-space:pre-wrap;line-height:1.7;display:block}
.script-block .copy-btn{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#94A3B8;border-radius:7px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif}
.script-block .copy-btn:hover{background:rgba(255,255,255,.2);color:#fff}
.step-list{list-style:none;margin-top:16px}
.step-list li{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted)}
.step-list li:last-child{border-bottom:none}
.step-num{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;margin-top:1px}
.step-list li strong{color:var(--navy)}

/* ══ PROFILE ══ */
.profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.profile-section{background:var(--card);border-radius:18px;padding:22px;box-shadow:var(--s1);border:1px solid rgba(37,99,235,.06)}
.profile-section.full{grid-column:1/-1}
.profile-section-title{font-size:12px;font-weight:800;color:var(--navy);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--bg);display:flex;align-items:center;gap:7px}

/* ══ TOAST ══ */
#toast{position:fixed;bottom:24px;right:24px;z-index:9999;padding:13px 20px;border-radius:14px;font-size:13px;font-weight:700;box-shadow:var(--s3);transform:translateY(100px);opacity:0;transition:all .35s cubic-bezier(.34,1.56,.64,1);pointer-events:none;max-width:320px;display:flex;align-items:center;gap:10px}
#toast.show{transform:translateY(0);opacity:1}
#toast.success{background:#fff;color:#065F46;border-left:4px solid #10B981;border:1px solid #A7F3D0}
#toast.error{background:#fff;color:#991B1B;border-left:4px solid #EF4444;border:1px solid #FECACA}
#toast.info{background:#fff;color:#1E40AF;border-left:4px solid var(--blue);border:1px solid #BFDBFE}

/* ══ RESPONSIVE ══ */
@media(max-width:900px){
  #t-menu-btn{display:block}
  #t-sidebar{transform:translateX(-100%)}
  #t-sidebar.open{transform:none}
  #t-main{margin-left:0;padding:16px}
  .chart-grid{grid-template-columns:1fr}
  .infographic{grid-template-columns:repeat(2,1fr)}
  .profile-grid{grid-template-columns:1fr}
  .wb-stats{display:none}
  #t-hdr-name{display:none}
  .ld-cta{grid-template-columns:1fr}
  .p-hero-inner{grid-template-columns:1fr}
  .port-nav{padding:0 20px}
  .port-links{display:none}
  .p-hero{padding:48px 20px 40px}
  .p-stats{padding:16px 20px}
  .p-main{padding:36px 20px 80px}
  .p-footer-grid{grid-template-columns:1fr;gap:28px}
  .p-footer{padding:36px 20px 24px}
}
@media(max-width:480px){
  .infographic{grid-template-columns:1fr 1fr}
  .stat-grid{grid-template-columns:repeat(2,1fr)}
  .ld-h1{font-size:clamp(36px,10vw,56px)}
}
</style>
</head>
<body>

<!-- ══════════════════ LOADING ══════════════════ -->
<div id="loading">
  <div class="load-logo">CV<span>K</span> Academic</div>
  <div class="load-sub">Faculty Activity System · Firebase Connect</div>
  <div class="load-bar"><div class="load-fill"></div></div>
</div>

<!-- ══════════════════════════════════════════════
     🏠 LANDING PAGE
══════════════════════════════════════════════ -->
<div id="app-landing">
  <div class="ld-decor ld1"></div>
  <div class="ld-decor ld2"></div>
  <div class="ld-decor ld3"></div>
  <div class="ld-decor ld4"></div>
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>
  <div class="ld-inner">
    <div class="ld-badge">SKR &amp; SKR GCW(A) · Kadapa · Est. 2025</div>
    <h1 class="ld-h1">Dr. C.V.<br/><em>Krishnaveni</em></h1>
    <div class="ld-role">Lecturer in Computer Science &amp; IQAC Coordinator</div>
    <div class="ld-inst">SKR &amp; SKR Government College for Women (Autonomous)<br/>Kadapa, Andhra Pradesh, India</div>
    <div class="ld-chips">
      <span class="lchip">🤖 Artificial Intelligence</span>
      <span class="lchip">📊 Machine Learning</span>
      <span class="lchip">🗄️ Data Mining</span>
      <span class="lchip">🏛️ IQAC Coordinator</span>
      <span class="lchip">🎓 NAAC · NIRF</span>
      <span class="lchip">🌍 Open Education</span>
    </div>
    <div class="ld-cta">
      <div class="cta-card cta-port" onclick="goPortfolio()">
        <span class="cta-icon">👩‍💻</span>
        <div class="cta-label">My Portfolio</div>
        <div class="cta-sub">Books, Lab Manuals, Publications,<br/>Live Tools &amp; Events</div>
        <div class="cta-arr">Explore Portfolio →</div>
      </div>
      <div class="cta-card cta-track" onclick="goTracker()">
        <span class="cta-icon">📊</span>
        <div class="cta-label">Activity Tracker</div>
        <div class="cta-sub">Track AP01–AP23, FC01–FC20,<br/>Generate Reports &amp; NAAC Data</div>
        <div class="cta-arr">Open Tracker →</div>
      </div>
    </div>
    <div class="ld-stats">
      <div class="ld-stat"><span class="n">15+</span><span class="l">Publications</span></div>
      <div class="ld-stat"><span class="n">5</span><span class="l">Lab Manuals</span></div>
      <div class="ld-stat"><span class="n">4</span><span class="l">Books</span></div>
      <div class="ld-stat"><span class="n">40+</span><span class="l">FDPs &amp; Events</span></div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     👩‍💻 PORTFOLIO
══════════════════════════════════════════════ -->
<div id="app-portfolio">
  <!-- NAV -->
  <nav class="port-nav">
    <div class="port-logo" onclick="goLanding()">
      <div class="port-mono">VK</div>
      <div>
        <div class="port-nav-name">Dr. C.V. Krishnaveni</div>
        <div class="port-nav-sub">CS Faculty · IQAC Coordinator · OER</div>
      </div>
    </div>
    <div class="port-links">
      <button class="port-link act" onclick="pNavTo('p-home',this)">Home</button>
      <button class="port-link" onclick="pNavTo('p-lab',this)">Lab Manuals</button>
      <button class="port-link" onclick="pNavTo('p-books',this)">Books</button>
      <button class="port-link" onclick="pNavTo('p-tools',this)">Tools</button>
      <button class="port-link" onclick="pNavTo('p-pubs',this)">Publications</button>
      <button class="port-link" onclick="pNavTo('p-events',this)">Events</button>
      <button class="port-link" onclick="pNavTo('p-contact',this)">Contact</button>
    </div>
    <button class="btn-tracker" onclick="goTracker()">📊 Activity Tracker</button>
  </nav>

  <!-- HERO -->
  <section class="p-hero" id="p-home">
    <div class="p-hd1"></div><div class="p-hd2"></div>
    <div class="p-hero-inner">
      <div class="fade">
        <div class="p-tag">Ph.D · University of Hyderabad · 2022</div>
        <h1 class="p-h1">Dr. Venkata<br/><em>Krishnaveni</em> Chennuru</h1>
        <div class="p-role">Lecturer — Department of Computer Science</div>
        <div class="p-inst">SKR &amp; SKR Government College for Women (Autonomous) · Kadapa, Andhra Pradesh</div>
        <div class="p-chips">
          <span class="chip ci">Artificial Intelligence</span>
          <span class="chip ca">Machine Learning</span>
          <span class="chip cv">Data Mining</span>
          <span class="chip cr">IQAC Coordinator</span>
          <span class="chip ct">NAAC · NIRF</span>
          <span class="chip cg">Open Education</span>
        </div>
        <div class="p-btns">
          <a class="btn-pp" href="#p-lab">📥 Free Lab Manuals</a>
          <a class="btn-po" href="#p-pubs">📄 Publications</a>
          <button class="btn-pt" onclick="goTracker()">📊 Open Tracker</button>
        </div>
      </div>
      <div class="hc fade d2">
        <div class="hc-av">👩‍💻</div>
        <div class="hc-name">Dr. C.V. Krishnaveni</div>
        <div class="hc-dept">Dept. of Computer Science</div>
        <div class="hc-grid">
          <div class="hc-stat"><div class="hc-n">15+</div><div class="hc-l">Publications</div></div>
          <div class="hc-stat"><div class="hc-n">3</div><div class="hc-l">Patents</div></div>
          <div class="hc-stat"><div class="hc-n">5</div><div class="hc-l">Lab Manuals</div></div>
          <div class="hc-stat"><div class="hc-n">7+</div><div class="hc-l">Yrs Teaching</div></div>
        </div>
        <a class="hc-orcid" href="https://orcid.org/0000-0003-2209-483X" target="_blank">🆔 ORCID: 0000-0003-2209-483X</a>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <section class="p-stats">
    <div class="p-stats-inner">
      <div class="scard si fade d1"><div class="sc-ico">🧪</div><div class="sc-n">5</div><div class="sc-l">Lab Solution Manuals</div></div>
      <div class="scard st fade d2"><div class="sc-ico">⚡</div><div class="sc-n">4</div><div class="sc-l">Live Tools on GitHub</div></div>
      <div class="scard sa fade d3"><div class="sc-ico">📚</div><div class="sc-n">4</div><div class="sc-l">Books Published</div></div>
      <div class="scard sr fade d4"><div class="sc-ico">📝</div><div class="sc-n">15+</div><div class="sc-l">Research Publications</div></div>
      <div class="scard sv fade d5"><div class="sc-ico">🏛️</div><div class="sc-n">3</div><div class="sc-l">Patents Filed</div></div>
      <div class="scard sg fade d6"><div class="sc-ico">🎓</div><div class="sc-n">40+</div><div class="sc-l">FDPs &amp; Events</div></div>
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <main class="p-main">
    <div class="oer-band fade">
      <div class="oer-ico">🌍</div>
      <div>
        <div class="oer-h">Open Educational Resources — Free for All Learners</div>
        <div class="oer-p">All materials published under <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>. Free to use, share, and adapt for educational purposes with attribution. Developed at SKR &amp; SKR GCW(A), Kadapa.</div>
      </div>
    </div>

    <!-- LAB MANUALS -->
    <section class="p-section" id="p-lab">
      <div class="sec-hd"><div class="sec-ttl"><span>🧪</span> Lab Solution Manuals <span class="sec-badge">5 Manuals</span></div></div>
      <div class="grid3">
        <div class="card fade d1"><span class="card-ico">🐍</span><span class="cbadge cbi">Python Lab</span><div class="card-title">Python Programming Lab Solution Manual</div><div class="card-sub">B.Sc. Computer Science · II Year</div><div class="card-desc">Complete step-by-step solutions for all Python lab exercises. Covers basics, OOP, file handling, and mini projects.</div><div class="card-tags"><span class="tag">50+ Programs</span><span class="tag">With Output</span><span class="tag">Viva Q&A</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('Python Lab Manual — Download starting!')">📥 Download PDF</button><button class="btn-c bco" onclick="pToast('Viewing online...')">👁 View Online</button></div></div>
        <div class="card tt fade d2"><span class="card-ico">🗄️</span><span class="cbadge cbt">DBMS Lab</span><div class="card-title">Database Management System Lab Manual</div><div class="card-sub">B.Sc. Computer Science · III Year</div><div class="card-desc">SQL queries, PL/SQL programs, triggers, procedures, and functions with complete solutions. Oracle and MySQL compatible.</div><div class="card-tags"><span class="tag">40+ Queries</span><span class="tag">PL/SQL</span><span class="tag">Normalization</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('DBMS Lab Manual — Download starting!')">📥 Download PDF</button><button class="btn-c bco" onclick="pToast('Viewing online...')">👁 View Online</button></div></div>
        <div class="card tv fade d3"><span class="card-ico">🌲</span><span class="cbadge cbv">DS Lab</span><div class="card-title">Data Structures Lab Solution Manual</div><div class="card-sub">B.Sc. Computer Science · II Year</div><div class="card-desc">Arrays, linked lists, stacks, queues, trees, graphs — all algorithms with C programs and complexity analysis.</div><div class="card-tags"><span class="tag">45+ Programs</span><span class="tag">C Language</span><span class="tag">Algorithm Trace</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('DS Lab Manual — Download starting!')">📥 Download PDF</button><button class="btn-c bco" onclick="pToast('Viewing online...')">👁 View Online</button></div></div>
        <div class="card ta fade d4"><span class="card-ico">🌐</span><span class="cbadge cba">Web Lab</span><div class="card-title">Web Technology Lab Manual</div><div class="card-sub">B.Sc. Computer Science · III Year</div><div class="card-desc">HTML, CSS, JavaScript, PHP exercises with complete source code and browser output screenshots.</div><div class="card-tags"><span class="tag">HTML/CSS/JS</span><span class="tag">PHP</span><span class="tag">Screenshots</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('Web Lab Manual — Download starting!')">📥 Download PDF</button><button class="btn-c bco" onclick="pToast('Viewing online...')">👁 View Online</button></div></div>
        <div class="card tr fade d5"><span class="card-ico">🤖</span><span class="cbadge cbr">AI & ML Lab</span><div class="card-title">Artificial Intelligence &amp; ML Lab Manual</div><div class="card-sub">B.Sc. Computer Science · III Year</div><div class="card-desc">Search algorithms, ML models using Python &amp; scikit-learn, neural networks basics. Complete practical record solutions.</div><div class="card-tags"><span class="tag">Python</span><span class="tag">scikit-learn</span><span class="tag">30+ Programs</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('AI Lab Manual — Download starting!')">📥 Download PDF</button><button class="btn-c bco" onclick="pToast('Viewing online...')">👁 View Online</button></div></div>
      </div>
    </section>

    <!-- BOOKS -->
    <section class="p-section" id="p-books">
      <div class="sec-hd"><div class="sec-ttl"><span>📚</span> Books &amp; eBooks <span class="sec-badge">4 Publications</span></div></div>
      <div class="tab-bar">
        <button class="tabbtn on" onclick="switchTab('bk','ebooks',this)">📱 eBooks (2)</button>
        <button class="tabbtn" onclick="switchTab('bk','paperbacks',this)">📖 Paperback (2)</button>
      </div>
      <div id="bk-ebooks" class="tab-pane on">
        <div class="grid4">
          <div class="book-card"><div class="book-cover bc-i">📘</div><div class="book-body"><div class="book-type">eBook · Free Download · 2025</div><div class="book-title">Python Programming for Beginners — A Complete Guide</div><div class="book-meta">Venkata Krishnaveni Chennuru · 155 pages</div><div class="book-isbn">Co-authored with T V Sai Sudharshini</div><div class="card-acts" style="margin-top:14px"><button class="btn-c bcp" onclick="pToast('eBook downloading!')">📥 Free Download</button><button class="btn-c bcg" onclick="pToast('Link copied!')">🔗 Share</button></div></div></div>
          <div class="book-card"><div class="book-cover bc-r">📗</div><div class="book-body"><div class="book-type">eBook · Free Download · 2026</div><div class="book-title">Applications of Artificial Intelligence Lab Solution Manual</div><div class="book-meta">Venkata Krishnaveni Chennuru · 2026</div><div class="book-isbn">Maths, Physics, Chemistry &amp; Sciences</div><div class="card-acts" style="margin-top:14px"><button class="btn-c bcp" onclick="pToast('eBook downloading!')">📥 Free Download</button><button class="btn-c bcg" onclick="pToast('Link copied!')">🔗 Share</button></div></div></div>
        </div>
      </div>
      <div id="bk-paperbacks" class="tab-pane">
        <div class="grid4">
          <div class="book-card"><div class="book-cover bc-a">📙</div><div class="book-body"><div class="book-type">Paperback · Published · 2026</div><div class="book-title">Mastering Excel: Beginner, Intermediate, and Advanced Levels</div><div class="book-meta">Venkata Krishnaveni Chennuru · 2026</div><div class="book-isbn">ISBN: (in press)</div><div class="card-acts" style="margin-top:14px"><button class="btn-c bca" onclick="pToast('Redirecting to publisher...')">🛒 Buy Online</button><button class="btn-c bcg" onclick="pToast('Preview opening...')">👁 Preview</button></div></div></div>
          <div class="book-card"><div class="book-cover bc-t">📕</div><div class="book-body"><div class="book-type">Paperback · Published · 2024</div><div class="book-title">Information and Communication Technology — Life Skill Course</div><div class="book-meta">Venkata Krishnaveni Chennuru · 2024 · pp. 127–149</div><div class="book-isbn">Life Skill Course Vol. 1</div><div class="card-acts" style="margin-top:14px"><button class="btn-c bca" onclick="pToast('Redirecting to publisher...')">🛒 Buy Online</button><button class="btn-c bcg" onclick="pToast('Preview opening...')">👁 Preview</button></div></div></div>
        </div>
      </div>
    </section>

    <!-- TOOLS -->
    <section class="p-section" id="p-tools">
      <div class="sec-hd"><div class="sec-ttl"><span>⚡</span> Live Tools &amp; Playgrounds <span class="sec-badge">4 Live</span></div></div>
      <div class="grid2">
        <div class="tool-card fade d1"><div class="live-pill"><div class="live-dot"></div>Live on GitHub</div><div class="card-title">🎓 NIRF Ranking Assistant</div><div class="card-desc">AI-powered chatbot for NIRF guidance — covers all 5 parameters, data collection, score improvement, and submission portal. Powered by Google Gemini.</div><div class="card-tags"><span class="tag">Gemini AI</span><span class="tag">Arts &amp; Science</span><span class="tag">Universities</span><span class="tag">Free</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('Opening NIRF Assist...')">🚀 Open Tool</button><a class="btn-c bco" href="https://github.com/vkchennuru" target="_blank">⭐ GitHub</a></div></div>
        <div class="tool-card fade d2"><div class="live-pill"><div class="live-dot"></div>Live on GitHub</div><div class="card-title">📋 IQAC Department Data Collector</div><div class="card-desc">Web app for IQAC coordinators to collect NAAC, NIRF, AQAR data from all departments. Live dashboard, department status tracking, auto-reminders, Excel export.</div><div class="card-tags"><span class="tag">NAAC · NIRF · AQAR</span><span class="tag">Firebase</span><span class="tag">Dashboard</span><span class="tag">Free</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('Opening IQAC Collector...')">🚀 Open Tool</button><a class="btn-c bco" href="https://github.com/vkchennuru" target="_blank">⭐ GitHub</a></div></div>
        <div class="tool-card fade d3"><div class="live-pill" style="background:#ede9fe;color:var(--purple);border-color:#c4b5fd"><div class="live-dot" style="background:var(--purple)"></div>Playground</div><div class="card-title">🐍 Python Code Playground</div><div class="card-desc">Interactive Python playground for students. Write, run, and test Python code directly in browser. Includes starter templates for all lab exercises.</div><div class="card-tags"><span class="tag">Browser-based</span><span class="tag">Lab Exercises</span><span class="tag">Beginner Friendly</span></div><div class="card-acts"><button class="btn-c bcp" onclick="pToast('Opening Python Playground...')">🚀 Try Now</button><a class="btn-c bco" href="https://github.com/vkchennuru" target="_blank">⭐ GitHub</a></div></div>
        <div class="tool-card fade d4"><div class="live-pill" style="background:#eef2ff;color:var(--blue);border-color:#c7d2fe"><div class="live-dot" style="background:var(--blue)"></div>This App</div><div class="card-title">📊 Faculty Activity Tracker</div><div class="card-desc">Track AP01–AP23 &amp; FC01–FC20 activities with Firebase sync, dashboard charts, summary tables, and one-click report generation.</div><div class="card-tags"><span class="tag">Firebase</span><span class="tag">NAAC Ready</span><span class="tag">PDF Reports</span></div><div class="card-acts"><button class="btn-c bcp" onclick="goTracker()">🚀 Open Tracker</button><a class="btn-c bco" href="https://github.com/vkchennuru" target="_blank">⭐ GitHub</a></div></div>
      </div>
    </section>

    <!-- PUBLICATIONS -->
    <section class="p-section" id="p-pubs">
      <div class="sec-hd">
        <div class="sec-ttl"><span>📝</span> Publications <span class="sec-badge">15+ Works</span></div>
        <div class="sec-filters">
          <button class="filt on" onclick="filterPubs('all',this)">All</button>
          <button class="filt" onclick="filterPubs('journal',this)">Journals</button>
          <button class="filt" onclick="filterPubs('conf',this)">Conferences</button>
          <button class="filt" onclick="filterPubs('book-ch',this)">Book Chapters</button>
        </div>
      </div>
      <div id="pub-list">
        <div class="pub-item" data-type="journal"><div style="flex:1"><div class="pub-title">Simulated Annealing Based Undersampling (SAUS): A Hybrid Multi-Objective Optimization Method to Tackle Class Imbalance</div><div class="pub-venue">Applied Intelligence · Vol. 52 · pp. 2092–2110 · Springer</div><div class="pub-row"><span class="pub-yr">2022</span><span class="pub-type" style="background:#eef2ff;color:var(--blue);border-color:#c7d2fe">JOURNAL · SCOPUS</span></div></div><a class="btn-c bco" href="https://doi.org/10.1007/s10489-021-02804-0" target="_blank">📄 View</a></div>
        <div class="pub-item conf" data-type="conf"><div style="flex:1"><div class="pub-title">Solid Waste Classification Using Transformer Model</div><div class="pub-venue">Lecture Notes in Networks and Systems · Vol. 1229 LNNS · pp. 284–291</div><div class="pub-row"><span class="pub-yr">2025</span><span class="pub-type" style="background:#e0f5f9;color:var(--teal);border-color:#cbeef5">CONFERENCE</span></div></div><button class="btn-c bco" onclick="pToast('Opening paper...')">📄 View</button></div>
        <div class="pub-item conf" data-type="conf"><div style="flex:1"><div class="pub-title">Text Recognition from Images Using Deep Learning Techniques</div><div class="pub-venue">Smart Innovation Systems and Technologies · Vol. 315 · pp. 265–279</div><div class="pub-row"><span class="pub-yr">2023</span><span class="pub-type" style="background:#e0f5f9;color:var(--teal);border-color:#cbeef5">CONFERENCE</span><span class="tag">Scopus</span></div></div><button class="btn-c bco" onclick="pToast('Opening paper...')">📄 View</button></div>
        <div class="pub-item conf" data-type="conf"><div style="flex:1"><div class="pub-title">COVID-19 Detection Using Deep Learning</div><div class="pub-venue">Advances in Intelligent Systems and Computing · Vol. 1375 · pp. 263–269</div><div class="pub-row"><span class="pub-yr">2021</span><span class="pub-type" style="background:#e0f5f9;color:var(--teal);border-color:#cbeef5">CONFERENCE</span></div></div><button class="btn-c bco" onclick="pToast('Opening paper...')">📄 View</button></div>
        <div class="pub-item" data-type="journal"><div style="flex:1"><div class="pub-title">Telecom Churn Prediction using Machine Learning</div><div class="pub-venue">World Journal of Advanced Engineering Technology and Sciences · Vol. 7 · pp. 087–096</div><div class="pub-row"><span class="pub-yr">2022</span><span class="pub-type" style="background:#eef2ff;color:var(--blue);border-color:#c7d2fe">JOURNAL</span></div></div><button class="btn-c bco" onclick="pToast('Opening paper...')">📄 View</button></div>
        <div class="pub-item book-ch" data-type="book-ch"><div style="flex:1"><div class="pub-title">MahalCUSFilter: A Hybrid Undersampling Method to Improve Minority Classification Rate of Imbalanced Datasets</div><div class="pub-venue">Lecture Notes in Computer Science (LNAI) · Vol. 10682 · pp. 43–53 · Springer</div><div class="pub-row"><span class="pub-yr">2017</span><span class="pub-type" style="background:#ede9fe;color:var(--purple);border-color:#c4b5fd">BOOK CHAPTER</span></div></div><button class="btn-c bco" onclick="pToast('Opening chapter...')">📄 View</button></div>
        <div class="pub-item" data-type="journal"><div style="flex:1"><div class="pub-title">Machine Unlearning: A Comprehensive Survey and Unified Framework</div><div class="pub-venue">Zenodo · 2026</div><div class="pub-row"><span class="pub-yr">2026</span><span class="pub-type" style="background:#fef3c7;color:var(--gold);border-color:#fde68a">PREPRINT</span></div></div><button class="btn-c bco" onclick="pToast('Opening paper...')">📄 View</button></div>
      </div>
      <div style="text-align:center;margin-top:24px"><button class="btn-po" style="font-size:14px;padding:11px 26px" onclick="pToast('Loading all 15+ publications...')">📋 View All Publications →</button></div>
    </section>

    <!-- EVENTS -->
    <section class="p-section" id="p-events">
      <div class="sec-hd">
        <div class="sec-ttl"><span>🎓</span> FDPs, Seminars &amp; Workshops <span class="sec-badge">40+ Events</span></div>
        <div class="sec-filters">
          <button class="filt on" onclick="filterEvents('all',this)">All</button>
          <button class="filt" onclick="filterEvents('org',this)">Organized</button>
          <button class="filt" onclick="filterEvents('att',this)">Attended</button>
          <button class="filt" onclick="filterEvents('fdp',this)">FDPs</button>
          <button class="filt" onclick="filterEvents('web',this)">Webinars</button>
        </div>
      </div>
      <div id="event-list">
        <div class="event-item" data-t="org fdp"><div class="ebox"><div class="ebox-yr">2025</div><div class="ebox-mo">Dec</div></div><div class="einfo"><div class="etitle">FDP on AI Tools for Higher Education — Google Gemini, NotebookLM &amp; Veo</div><div class="eorg">Organized at SKR &amp; SKR GCW(A), Kadapa · 5 Days · 60 Participants</div><div class="etags"><span class="etag et-org">Organized</span><span class="etag et-fdp">FDP</span></div></div></div>
        <div class="event-item" data-t="org"><div class="ebox"><div class="ebox-yr">2025</div><div class="ebox-mo">Oct</div></div><div class="einfo"><div class="etitle">National Seminar on Open Educational Resources in Computer Science</div><div class="eorg">Organized at SKR &amp; SKR GCW(A) in collaboration with IQAC · 2 Days</div><div class="etags"><span class="etag et-org">Organized</span><span class="etag et-sem">Seminar</span></div></div></div>
        <div class="event-item" data-t="att fdp"><div class="ebox"><div class="ebox-yr">2025</div><div class="ebox-mo">Aug</div></div><div class="einfo"><div class="etitle">AICTE ATAL Academy — FDP on Python for Data Science</div><div class="eorg">ATAL Academy Online · 1 Week · Certificate Awarded</div><div class="etags"><span class="etag et-att">Attended</span><span class="etag et-fdp">FDP</span></div></div></div>
        <div class="event-item" data-t="att web"><div class="ebox"><div class="ebox-yr">2025</div><div class="ebox-mo">Jun</div></div><div class="einfo"><div class="etitle">Webinar on NAAC Accreditation 2.0 — New Framework &amp; DVV Process</div><div class="eorg">NAAC Bangalore · Online · 500+ Participants Nationally</div><div class="etags"><span class="etag et-att">Attended</span><span class="etag et-web">Webinar</span></div></div></div>
        <div class="event-item" data-t="org"><div class="ebox"><div class="ebox-yr">2025</div><div class="ebox-mo">Mar</div></div><div class="einfo"><div class="etitle">Workshop on NIRF Data Preparation for Affiliated Colleges</div><div class="eorg">Organized at District Level · Kadapa · 45 IQAC Coordinators attended</div><div class="etags"><span class="etag et-org">Organized</span><span class="etag et-wkp">Workshop</span></div></div></div>
        <div class="event-item" data-t="att fdp"><div class="ebox"><div class="ebox-yr">2024</div><div class="ebox-mo">Nov</div></div><div class="einfo"><div class="etitle">Google for Education Certified Educator Training Program</div><div class="eorg">Google India · Online · Level 1 &amp; Level 2 Certified</div><div class="etags"><span class="etag et-att">Attended</span><span class="etag et-fdp">FDP</span></div></div></div>
        <div class="event-item" data-t="org web"><div class="ebox"><div class="ebox-yr">2024</div><div class="ebox-mo">Jul</div></div><div class="einfo"><div class="etitle">Webinar on Free AI Tools for Students — ChatGPT, Gemini, Copilot</div><div class="eorg">Organized for B.Sc. CS Students · Online · 200+ Students</div><div class="etags"><span class="etag et-org">Organized</span><span class="etag et-web">Webinar</span></div></div></div>
      </div>
      <div style="text-align:center;margin-top:24px"><button class="btn-po" style="font-size:14px;padding:11px 26px" onclick="pToast('Loading all 40+ events...')">📅 View All Events →</button></div>
    </section>

    <!-- CONTACT -->
    <section class="p-section" id="p-contact">
      <div class="sec-hd"><div class="sec-ttl"><span>📬</span> Contact &amp; Profiles</div></div>
      <div class="contact-grid">
        <div class="contact-card"><div class="contact-ico">🏛️</div><div class="contact-lbl">Institution</div><div class="contact-val" style="font-size:13px;color:#2d3561">SKR &amp; SKR GCW(A)<br/>Kadapa, Andhra Pradesh</div></div>
        <a class="contact-card" href="mailto:vkchennuru@gmail.com"><div class="contact-ico">📧</div><div class="contact-lbl">Email</div><div class="contact-val" style="font-size:12px">vkchennuru@gmail.com</div></a>
        <a class="contact-card" href="https://github.com/vkchennuru" target="_blank"><div class="contact-ico">💻</div><div class="contact-lbl">GitHub</div><div class="contact-val">github.com/vkchennuru</div></a>
        <a class="contact-card" href="https://orcid.org/0000-0003-2209-483X" target="_blank"><div class="contact-ico">🆔</div><div class="contact-lbl">ORCID</div><div class="contact-val" style="font-size:12px">0000-0003-2209-483X</div></a>
        <a class="contact-card" href="https://vidwan.inflibnet.ac.in/profile/76511" target="_blank"><div class="contact-ico">🔬</div><div class="contact-lbl">Vidwan Profile</div><div class="contact-val">View Profile →</div></a>
        <div class="contact-card" onclick="pToast('Search: Venkata Krishnaveni Chennuru on Google Scholar')"><div class="contact-ico">🎓</div><div class="contact-lbl">Google Scholar</div><div class="contact-val">View Publications →</div></div>
        <a class="contact-card" href="https://cvkrishnaveni.blogspot.com" target="_blank"><div class="contact-ico">📝</div><div class="contact-lbl">Blog</div><div class="contact-val">cvkrishnaveni.blogspot.com</div></a>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="p-footer">
    <div class="p-footer-inner">
      <div class="p-footer-grid">
        <div>
          <div class="f-name">Dr. Venkata Krishnaveni Chennuru</div>
          <div class="f-inst">Lecturer, Dept. of Computer Science &amp; IQAC Coordinator<br/>SKR &amp; SKR Government College for Women (Autonomous)<br/>Kadapa, Andhra Pradesh, India — 516 001</div>
          <div class="f-lic">🌍 CC BY-NC 4.0 · © 2025 Dr. C.V. Krishnaveni · All Rights Reserved</div>
        </div>
        <div>
          <div class="f-col-h">Quick Links</div>
          <a class="f-a" href="#p-lab">🧪 Lab Solution Manuals</a>
          <a class="f-a" href="#p-books">📚 Books &amp; eBooks</a>
          <a class="f-a" href="#p-tools">⚡ Live Tools</a>
          <a class="f-a" href="#p-pubs">📝 Publications</a>
          <a class="f-a" href="#p-events">🎓 FDPs &amp; Events</a>
        </div>
        <div>
          <div class="f-col-h">Copyright Notice</div>
          <a class="f-a" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0 License</a>
          <a class="f-a" href="#">Free to use with attribution</a>
          <a class="f-a" href="#">Not for commercial use</a>
          <a class="f-a" href="https://github.com/vkchennuru" target="_blank">GitHub Repository</a>
        </div>
      </div>
      <div class="f-bottom">
        <div class="f-copy">Copyright © 2025 · <strong>Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)</strong> · All Rights Reserved</div>
        <div class="f-copy">Built with ❤️ for Open Education · vkchennuru.github.io</div>
      </div>
    </div>
  </footer>
</div>

<!-- ══════════════════════════════════════════════
     📊 TRACKER APP
══════════════════════════════════════════════ -->
<div id="app-tracker">
  <!-- HEADER -->
  <header id="t-hdr">
    <button id="t-menu-btn" onclick="toggleSidebar()">☰</button>
    <a class="t-logo" href="#">
      <div class="t-logo-icon">🎓</div>
      <div class="t-logo-text">Faculty<span>Tracker</span></div>
    </a>
    <div id="t-hdr-name"></div>
    <div class="t-hdr-spacer"></div>
    <div id="sync-pill">
      <div id="sync-dot"></div>
      <span id="sync-text">Connecting…</span>
    </div>
    <button class="btn-back-home" onclick="goLanding()">🏠 Home</button>
  </header>

  <!-- SIDEBAR -->
  <nav id="t-sidebar">
    <div style="flex:1;overflow-y:auto;padding-bottom:8px">
      <div class="nav-section">
        <div class="nav-label">Overview</div>
        <div class="nav-item active" onclick="showView('dashboard')"><div class="nav-icon">📊</div>Dashboard</div>
        <div class="nav-item" onclick="showView('summary')"><div class="nav-icon">📋</div>Summary Table</div>
        <div class="nav-item" onclick="showView('reports')"><div class="nav-icon">📄</div>Generate Reports</div>
        <div class="nav-item" onclick="showView('profile')"><div class="nav-icon">👤</div>My Profile</div>
      </div>
      <div class="nav-divider"></div>
      <div class="nav-section">
        <div class="nav-label">Academic Proficiency</div>
        <div class="nav-item" onclick="showView('ap01')"><div class="nav-icon">🎓</div>AP01 FDPs Attended<span class="nav-badge" id="badge-ap01">0</span></div>
        <div class="nav-item" onclick="showView('ap02')"><div class="nav-icon">🔧</div>AP02 Workshops<span class="nav-badge" id="badge-ap02">0</span></div>
        <div class="nav-item" onclick="showView('ap03')"><div class="nav-icon">💡</div>AP03 Trainings<span class="nav-badge" id="badge-ap03">0</span></div>
        <div class="nav-item" onclick="showView('ap04')"><div class="nav-icon">🎤</div>AP04 Resource Person<span class="nav-badge" id="badge-ap04">0</span></div>
        <div class="nav-item" onclick="showView('ap05')"><div class="nav-icon">📅</div>AP05 FDPs Organized<span class="nav-badge" id="badge-ap05">0</span></div>
        <div class="nav-item" onclick="showView('ap06')"><div class="nav-icon">🏛️</div>AP06 Workshops Org.<span class="nav-badge" id="badge-ap06">0</span></div>
        <div class="nav-item" onclick="showView('ap07')"><div class="nav-icon">🏋️</div>AP07 Trainings Org.<span class="nav-badge" id="badge-ap07">0</span></div>
        <div class="nav-item" onclick="showView('ap08')"><div class="nav-icon">🌐</div>AP08 Webinars Org.<span class="nav-badge" id="badge-ap08">0</span></div>
        <div class="nav-item" onclick="showView('ap09')"><div class="nav-icon">📝</div>AP09 Papers-Seminars<span class="nav-badge" id="badge-ap09">0</span></div>
        <div class="nav-item" onclick="showView('ap10')"><div class="nav-icon">🏆</div>AP10 Conf. Papers<span class="nav-badge" id="badge-ap10">0</span></div>
        <div class="nav-item" onclick="showView('ap11')"><div class="nav-icon">📰</div>AP11 Journal Papers<span class="nav-badge" id="badge-ap11">0</span></div>
        <div class="nav-item" onclick="showView('ap12')"><div class="nav-icon">📖</div>AP12 Book Chapters<span class="nav-badge" id="badge-ap12">0</span></div>
        <div class="nav-item" onclick="showView('ap13')"><div class="nav-icon">📚</div>AP13 Books Published<span class="nav-badge" id="badge-ap13">0</span></div>
        <div class="nav-item" onclick="showView('ap14')"><div class="nav-icon">💻</div>AP14 LMS eContent<span class="nav-badge" id="badge-ap14">0</span></div>
        <div class="nav-item" onclick="showView('ap15')"><div class="nav-icon">🖥️</div>AP15 LMS Expert<span class="nav-badge" id="badge-ap15">0</span></div>
        <div class="nav-item" onclick="showView('ap16')"><div class="nav-icon">🔍</div>AP16 Academic Audit<span class="nav-badge" id="badge-ap16">0</span></div>
        <div class="nav-item" onclick="showView('ap17')"><div class="nav-icon">👨‍🏫</div>AP17 Guest Lec Org.<span class="nav-badge" id="badge-ap17">0</span></div>
        <div class="nav-item" onclick="showView('ap18')"><div class="nav-icon">🤝</div>AP18 Meetings<span class="nav-badge" id="badge-ap18">0</span></div>
        <div class="nav-item" onclick="showView('ap19')"><div class="nav-icon">📜</div>AP19 Cert. Courses<span class="nav-badge" id="badge-ap19">0</span></div>
        <div class="nav-item" onclick="showView('ap20')"><div class="nav-icon">👥</div>AP20 Committees<span class="nav-badge" id="badge-ap20">0</span></div>
        <div class="nav-item" onclick="showView('ap21')"><div class="nav-icon">🎙️</div>AP21 Guest Lec Given<span class="nav-badge" id="badge-ap21">0</span></div>
        <div class="nav-item" onclick="showView('ap22')"><div class="nav-icon">📋</div>AP22 Exam Duties<span class="nav-badge" id="badge-ap22">0</span></div>
        <div class="nav-item" onclick="showView('ap23')"><div class="nav-icon">🏅</div>AP23 MOOCs<span class="nav-badge" id="badge-ap23">0</span></div>
      </div>
      <div class="nav-divider"></div>
      <div class="nav-section">
        <div class="nav-label">Faculty Course File</div>
        <div class="nav-item" onclick="showView('fc01')"><div class="nav-icon">📃</div>FC01 Roll List<span class="nav-badge" id="badge-fc01">0</span></div>
        <div class="nav-item" onclick="showView('fc02')"><div class="nav-icon">🗓️</div>FC02 Time Table<span class="nav-badge" id="badge-fc02">0</span></div>
        <div class="nav-item" onclick="showView('fc03')"><div class="nav-icon">📑</div>FC03 Lesson Plan<span class="nav-badge" id="badge-fc03">0</span></div>
        <div class="nav-item" onclick="showView('fc04')"><div class="nav-icon">📆</div>FC04 Annual Plan<span class="nav-badge" id="badge-fc04">0</span></div>
        <div class="nav-item" onclick="showView('fc05')"><div class="nav-icon">📓</div>FC05 Teaching Diary<span class="nav-badge" id="badge-fc05">0</span></div>
        <div class="nav-item" onclick="showView('fc06')"><div class="nav-icon">📒</div>FC06 Teaching Notes<span class="nav-badge" id="badge-fc06">0</span></div>
        <div class="nav-item" onclick="showView('fc07')"><div class="nav-icon">🎓</div>FC07 Student Seminars<span class="nav-badge" id="badge-fc07">0</span></div>
        <div class="nav-item" onclick="showView('fc08')"><div class="nav-icon">❓</div>FC08 Quiz<span class="nav-badge" id="badge-fc08">0</span></div>
        <div class="nav-item" onclick="showView('fc09')"><div class="nav-icon">💬</div>FC09 Grp. Discussions<span class="nav-badge" id="badge-fc09">0</span></div>
        <div class="nav-item" onclick="showView('fc10')"><div class="nav-icon">✏️</div>FC10 Assignment<span class="nav-badge" id="badge-fc10">0</span></div>
        <div class="nav-item" onclick="showView('fc11')"><div class="nav-icon">🔬</div>FC11 Study Projects<span class="nav-badge" id="badge-fc11">0</span></div>
        <div class="nav-item" onclick="showView('fc12')"><div class="nav-icon">➕</div>FC12 Addl. Inputs<span class="nav-badge" id="badge-fc12">0</span></div>
        <div class="nav-item" onclick="showView('fc13')"><div class="nav-icon">📊</div>FC13 CIA<span class="nav-badge" id="badge-fc13">0</span></div>
        <div class="nav-item" onclick="showView('fc14')"><div class="nav-icon">📈</div>FC14 Result Analysis<span class="nav-badge" id="badge-fc14">0</span></div>
        <div class="nav-item" onclick="showView('fc15')"><div class="nav-icon">⭐</div>FC15 CSP<span class="nav-badge" id="badge-fc15">0</span></div>
        <div class="nav-item" onclick="showView('fc16')"><div class="nav-icon">🏢</div>FC16 Short Internship<span class="nav-badge" id="badge-fc16">0</span></div>
        <div class="nav-item" onclick="showView('fc17')"><div class="nav-icon">🏭</div>FC17 Long Internship<span class="nav-badge" id="badge-fc17">0</span></div>
        <div class="nav-item" onclick="showView('fc18')"><div class="nav-icon">🧑‍🤝‍🧑</div>FC18 Mentor-Mentee<span class="nav-badge" id="badge-fc18">0</span></div>
        <div class="nav-item" onclick="showView('fc19')"><div class="nav-icon">📝</div>FC19 Question Papers<span class="nav-badge" id="badge-fc19">0</span></div>
        <div class="nav-item" onclick="showView('fc20')"><div class="nav-icon">🎯</div>FC20 Pedagogies<span class="nav-badge" id="badge-fc20">0</span></div>
      </div>
      <div class="nav-divider"></div>
      <div class="nav-section">
        <div class="nav-label">Custom</div>
        <div class="nav-item" onclick="showView('custom')"><div class="nav-icon">✨</div>Custom Activities<span class="nav-badge" id="badge-custom">0</span></div>
      </div>
    </div>
    <div class="dev-card">
      <div class="dev-avatar">👩‍💻</div>
      <div class="dev-name">Dr. C.V. Krishnaveni</div>
      <div class="dev-role">Lecturer in CS &amp; HOD · IQAC Coordinator</div>
      <div class="dev-college">SKR &amp; SKR Govt. College for Women (A), Kadapa, AP</div>
      <a href="https://cvkrishnaveni.blogspot.com" target="_blank" class="dev-link">🔗 cvkrishnaveni.blogspot.com</a>
      <div class="dev-copy">© 2025 Dr. C.V. Krishnaveni · All Rights Reserved</div>
    </div>
  </nav>

  <!-- MAIN CONTENT AREA -->
  <main id="t-main">

    <!-- ══ DASHBOARD ══ -->
    <div id="view-dashboard" class="view active">
      <div class="wb" id="t-wb">
        <div class="wb-icon">🎓</div>
        <div class="wb-text">
          <h2 id="wb-name">Faculty Activity Tracker</h2>
          <p id="wb-sub">Loading your profile…</p>
        </div>
        <div class="wb-stats" id="wb-stats"></div>
      </div>

      <!-- AY Manager -->
      <div class="ay-manager">
        <div class="ay-manager-title">📅 Academic Years — Add or Remove</div>
        <div class="ay-tags" id="ay-tags-list"></div>
        <div class="ay-add-form">
          <input type="text" id="ay-new-input" placeholder="e.g. 2025-26" maxlength="12" onkeydown="if(event.key==='Enter')addAY()"/>
          <button class="btn btn-primary" onclick="addAY()">+ Add Year</button>
          <span style="font-size:12px;color:var(--muted);margin-left:4px">Use format: 2025-26</span>
        </div>
      </div>

      <div class="filter-bar">
        <span class="filter-label">📅 Filter:</span>
        <div id="ay-chips"></div>
      </div>

      <div class="infographic" id="t-infographic"></div>

      <div class="chart-grid">
        <div class="chart-card">
          <div class="chart-title">Activities by Academic Year</div>
          <div class="chart-inner"><canvas id="chart-ay"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">AP · FC · Custom</div>
          <div class="chart-inner"><canvas id="chart-donut"></canvas></div>
        </div>
        <div class="chart-card full">
          <div class="chart-title">Top 10 Activity Categories</div>
          <div class="chart-inner" style="height:240px"><canvas id="chart-top"></canvas></div>
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px">
        <button class="btn btn-primary" onclick="exportCSV()">⬇️ Export All as CSV</button>
        <button class="btn btn-report" onclick="showView('reports')">📄 Generate Reports</button>
      </div>
    </div>

    <!-- ══ SUMMARY ══ -->
    <div id="view-summary" class="view">
      <div class="pg-header">
        <div class="pg-title">📋 Summary Table</div>
        <div class="pg-sub"><span class="live-badge"><span class="live-dot-g"></span>Live Firebase Data</span> Auto-counted by Academic Year — NAAC/AQAR ready</div>
      </div>
      <div class="table-card"><div class="summary-wrap"><div id="summary-content"></div></div></div>
    </div>

    <!-- ══ REPORTS ══ -->
    <div id="view-reports" class="view">
      <div class="pg-header">
        <div class="pg-title">📄 Generate Reports</div>
        <div class="pg-sub">Professional PDF reports via Google Apps Script · Your data from Firebase</div>
      </div>

      <div class="report-hero">
        <h2>📄 One-Click Report Generation</h2>
        <p>Your activities from Firebase are sent to Google Apps Script → AI rewrites descriptions → builds a professional PDF report → saves to your Google Drive. No Google Form needed anymore.</p>
      </div>

      <div class="report-options">
        <div class="report-option" onclick="showReportSection('setup')">
          <span class="report-option-icon">⚙️</span>
          <div class="report-option-title">Setup Guide</div>
          <div class="report-option-desc">First time? Deploy your Apps Script Web App and connect it to this tracker in 5 easy steps.</div>
          <button class="btn btn-primary" style="pointer-events:none">View Setup →</button>
        </div>
        <div class="report-option" onclick="showReportSection('generate')">
          <span class="report-option-icon">🚀</span>
          <div class="report-option-title">Generate Report</div>
          <div class="report-option-desc">Select Academic Year and Month, then click Generate. PDF will appear in your Google Drive.</div>
          <button class="btn btn-success" style="pointer-events:none">Generate Now →</button>
        </div>
        <div class="report-option" onclick="showReportSection('webappscript')">
          <span class="report-option-icon">📜</span>
          <div class="report-option-title">Apps Script Code</div>
          <div class="report-option-desc">Get the updated Apps Script that reads from Firebase instead of Google Forms. Copy and paste.</div>
          <button class="btn btn-report" style="pointer-events:none">Get Script →</button>
        </div>
      </div>

      <!-- Setup Section -->
      <div id="report-setup" class="report-form" style="display:none">
        <div class="pg-title" style="font-size:20px;margin-bottom:16px">⚙️ Setup Guide — 5 Steps</div>
        <ul class="step-list">
          <li><div class="step-num">1</div><div><strong>Open Google Apps Script:</strong> Go to <a href="https://script.google.com" target="_blank" style="color:var(--blue);font-weight:700">script.google.com</a> → New Project → Name it "Faculty Report Generator"</div></li>
          <li><div class="step-num">2</div><div><strong>Paste the Script:</strong> Click "Get Script" tab above. Copy all 3 code files (Code_1, Code_2, Code_3) and paste into 3 separate .gs files in your project.</div></li>
          <li><div class="step-num">3</div><div><strong>Deploy as Web App:</strong> Click Deploy → New Deployment → Type: Web App → Execute as: Me → Who has access: Anyone → Deploy → Copy the Web App URL.</div></li>
          <li><div class="step-num">4</div><div><strong>Paste URL here:</strong> In the "Generate Report" section below, paste your Web App URL and save it.</div></li>
          <li><div class="step-num">5</div><div><strong>Generate!</strong> Select Academic Year + Month → Click Generate Report → PDF appears in your Google Drive folder "Faculty_Activity_Reports".</div></li>
        </ul>
      </div>

      <!-- Generate Section -->
      <div id="report-generate" class="report-form" style="display:none">
        <div class="pg-title" style="font-size:20px;margin-bottom:16px">🚀 Generate Report</div>
        <div class="form-grid" style="margin-bottom:16px">
          <div class="form-group">
            <label>Apps Script Web App URL <span class="req">*</span></label>
            <input type="url" id="webapp-url" placeholder="https://script.google.com/macros/s/.../exec"/>
          </div>
          <div class="form-group">
            <label>Academic Year <span class="req">*</span></label>
            <select id="report-ay"><option value="">— Select Year —</option></select>
          </div>
          <div class="form-group">
            <label>Report Month</label>
            <select id="report-month">
              <option value="all">All Months (Full Year)</option>
              <option>June</option><option>July</option><option>August</option>
              <option>September</option><option>October</option><option>November</option>
              <option>December</option><option>January</option><option>February</option>
              <option>March</option><option>April</option><option>May</option>
            </select>
          </div>
          <div class="form-group">
            <label>Report Type</label>
            <select id="report-type">
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report (with descriptions)</option>
              <option value="naac">NAAC/AQAR Format</option>
            </select>
          </div>
        </div>
        <div style="background:#F0FDF4;border:1.5px solid #A7F3D0;border-radius:12px;padding:16px;margin-bottom:16px;font-size:13px;color:#065F46">
          <strong>💡 How it works:</strong> Clicking Generate sends your Firebase data directly to your Apps Script Web App. The script builds a professional PDF and saves it to your Google Drive → Faculty_Activity_Reports folder. No Google Form needed!
        </div>
        <div class="form-actions">
          <button class="btn btn-report" onclick="generateReport()">📄 Generate Report → Google Drive</button>
          <button class="btn btn-primary" onclick="saveWebAppUrl()">💾 Save Web App URL</button>
          <button class="btn btn-secondary" onclick="showToast('Opening Google Drive…','info');window.open('https://drive.google.com','_blank')">📁 Open Google Drive</button>
        </div>
        <div id="report-status" style="margin-top:16px;display:none"></div>
      </div>

      <!-- Apps Script Code -->
      <div id="report-webappscript" class="report-form" style="display:none">
        <div class="pg-title" style="font-size:20px;margin-bottom:8px">📜 Apps Script Web App — Receiver Code</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Create a new Apps Script project, paste this as <strong>Code_Receiver.gs</strong>. This replaces reading from Google Sheets — it now reads data sent from this Tracker directly.</p>
        <div class="script-block">
          <button class="copy-btn" onclick="copyScript()">📋 Copy</button>
          <code id="script-code">/* ═══════════════════════════════════════════════════════════
   FACULTY TRACKER — APPS SCRIPT RECEIVER
   © 2025 Dr. C.V. Krishnaveni
   Paste into Google Apps Script → Deploy as Web App
   Then paste your Web App URL into this Tracker's Report section.
═══════════════════════════════════════════════════════════ */

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var faculty  = payload.faculty  || "Dr. C.V. Krishnaveni";
    var year     = payload.year     || "2025-26";
    var month    = payload.month    || "All";
    var rtype    = payload.rtype    || "summary";
    var acts     = payload.activities || [];

    if (acts.length === 0) {
      return ContentService.createTextOutput(
        JSON.stringify({status:"error", message:"No activities for selected period."})
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // AI rewrite if Gemini key is set
    if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_KEY") {
      acts = rewriteActivitiesWithAI_(acts);
    }

    // Build report and save PDF
    var doc = buildReport_(faculty, year, month, acts, rtype);
    var rootFolder = getOrCreateFolder_(DriveApp.getRootFolder(), ROOT_FOLDER_NAME);
    var yearFolder = getOrCreateFolder_(rootFolder, year);
    var monthFolder = getOrCreateFolder_(yearFolder, month);
    var pdf = exportToPDF_(doc, faculty, year, month, monthFolder);
    DriveApp.getFileById(doc.getId()).setTrashed(true);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Report generated!",
        driveUrl: "https://drive.google.com/drive/folders/" + monthFolder.getId(),
        pdfUrl: pdf.getUrl()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService.createTextOutput(
      JSON.stringify({status:"error", message: err.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── CONFIG ─────────────────────────────────────────
var ROOT_FOLDER_NAME = "Faculty_Activity_Reports";
var COLLEGE_NAME     = "SKR & SKR Government College for Women (Autonomous)";
var COLLEGE_ADDR     = "Kadapa, Andhra Pradesh – 516 001";
var GEMINI_API_KEY   = "YOUR_KEY"; // get free key from aistudio.google.com

// Keep your existing Code_2_AIRewriting.gs and Code_3_ReportBuilder.gs
// as separate files in the same project — they work unchanged.</code>
        </div>
        <p style="font-size:12px;color:var(--muted);margin-top:12px">Also keep your original <strong>Code_2_AIRewriting.gs</strong> and <strong>Code_3_ReportBuilder.gs</strong> files — they work unchanged with this receiver.</p>
      </div>
    </div>

    <!-- ══ PROFILE ══ -->
    <div id="view-profile" class="view">
      <div class="pg-header">
        <div class="pg-title">👤 My Profile</div>
        <div class="pg-sub">Saved to Firebase — syncs across all devices automatically</div>
      </div>
      <div class="profile-grid" id="profile-grid"></div>
    </div>

    <!-- All dynamic sheet views -->
    <div id="view-ap01" class="view"></div><div id="view-ap02" class="view"></div><div id="view-ap03" class="view"></div><div id="view-ap04" class="view"></div><div id="view-ap05" class="view"></div><div id="view-ap06" class="view"></div><div id="view-ap07" class="view"></div><div id="view-ap08" class="view"></div><div id="view-ap09" class="view"></div><div id="view-ap10" class="view"></div><div id="view-ap11" class="view"></div><div id="view-ap12" class="view"></div><div id="view-ap13" class="view"></div><div id="view-ap14" class="view"></div><div id="view-ap15" class="view"></div><div id="view-ap16" class="view"></div><div id="view-ap17" class="view"></div><div id="view-ap18" class="view"></div><div id="view-ap19" class="view"></div><div id="view-ap20" class="view"></div><div id="view-ap21" class="view"></div><div id="view-ap22" class="view"></div><div id="view-ap23" class="view"></div>
    <div id="view-fc01" class="view"></div><div id="view-fc02" class="view"></div><div id="view-fc03" class="view"></div><div id="view-fc04" class="view"></div><div id="view-fc05" class="view"></div><div id="view-fc06" class="view"></div><div id="view-fc07" class="view"></div><div id="view-fc08" class="view"></div><div id="view-fc09" class="view"></div><div id="view-fc10" class="view"></div><div id="view-fc11" class="view"></div><div id="view-fc12" class="view"></div><div id="view-fc13" class="view"></div><div id="view-fc14" class="view"></div><div id="view-fc15" class="view"></div><div id="view-fc16" class="view"></div><div id="view-fc17" class="view"></div><div id="view-fc18" class="view"></div><div id="view-fc19" class="view"></div><div id="view-fc20" class="view"></div>
    <div id="view-custom" class="view"></div>
  </main>
</div>

<div id="toast"></div>

<!-- ══════════════════════════════════════════════
     JAVASCRIPT
══════════════════════════════════════════════ -->
<script>
/* ════════════════════════════════════════════════
   FIREBASE CONFIG  (from your original file)
════════════════════════════════════════════════ */
const firebaseConfig = {
  apiKey: "AIzaSyCdlvqiZ60z3BZ8osjlmN-J3shMWl7Z6cM",
  authDomain: "aai-drcvk-interactive-webapp.firebaseapp.com",
  databaseURL: "https://aai-drcvk-interactive-webapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aai-drcvk-interactive-webapp",
  storageBucket: "aai-drcvk-interactive-webapp.firebasestorage.app",
  messagingSenderId: "1008860491414",
  appId: "1:1008860491414:web:fbfa1dbede3b7f6501dcb7",
  measurementId: "G-P3C9WDSZT0"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database(), ROOT = 'faculty_tracker';

/* ════════════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════════════ */
const MODES   = ["Online","Offline","Hybrid"];
const LEVELS  = ["Department","Institutional","State","National","International"];
const CERTS   = ["Yes","No","Applied","Not Applicable"];
const STATUS  = ["Completed","Ongoing","Planned"];
const MONTHS  = ["June","July","August","September","October","November","December","January","February","March","April","May"];
const CC = ['#2563EB','#7C3AED','#0D9488','#DB2777','#EA580C','#16A34A','#D97706','#0891B2','#DC2626','#4F46E5','#9B1C1C','#0B1F4B','#6D28D9','#065F46','#92400E'];

/* ════════════════════════════════════════════════
   SHEET DEFINITIONS — ALL 43 SHEETS
════════════════════════════════════════════════ */
const SHEETS = {
ap01:{label:"AP01 — FDPs Attended",color:"#1D4ED8",emoji:"🎓",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Title of FDP',type:'text',required:true,full:true},{id:'organizer',label:'Organizer / Institution',type:'text',required:true,full:true},{id:'start',label:'Start Date',type:'date',required:true},{id:'end',label:'End Date',type:'date'},{id:'duration',label:'Duration',type:'text'},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'venue',label:'Venue / Platform',type:'text'},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'cert',label:'Certificate?',type:'select',opts:CERTS},{id:'certno',label:'Certificate No.',type:'text'},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','organizer','start','mode','level','cert']},
ap02:{label:"AP02 — Workshops Attended",color:"#0891B2",emoji:"🔧",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'Workshop Title',type:'text',required:true,full:true},{id:'organizer',label:'Organizer',type:'text',required:true},{id:'date',label:'Date',type:'date',required:true},{id:'duration',label:'Duration',type:'text'},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'venue',label:'Venue / Platform',type:'text'},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'cert',label:'Certificate?',type:'select',opts:CERTS},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','organizer','date','mode','level','cert']},
ap03:{label:"AP03 — Trainings Attended",color:"#0D9488",emoji:"💡",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2023-24'},{id:'title',label:'Training Title',type:'text',required:true,full:true},{id:'organizer',label:'Organizer',type:'text',required:true},{id:'date',label:'Date',type:'date',required:true},{id:'duration',label:'Duration',type:'text'},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'cert',label:'Certificate?',type:'select',opts:CERTS},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','organizer','date','mode','level','cert']},
ap04:{label:"AP04 — Resource Person",color:"#7C3AED",emoji:"🎤",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Event Title',type:'text',required:true,full:true},{id:'invitedby',label:'Invited By',type:'text',required:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'topic',label:'Topic Delivered',type:'text',full:true},{id:'participants',label:'No. of Participants',type:'number'},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','invitedby','date','level','participants']},
ap05:{label:"AP05 — FDPs Organized",color:"#EA580C",emoji:"📅",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'FDP Title',type:'text',required:true,full:true},{id:'cobody',label:'Co-Organizing Body',type:'text'},{id:'start',label:'Start Date',type:'date',required:true},{id:'end',label:'End Date',type:'date'},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'participants',label:'No. of Participants',type:'number'},{id:'role',label:'Your Role',type:'select',opts:['Organizer','Coordinator','Convenor','Co-Convenor']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','start','mode','level','participants','role']},
ap06:{label:"AP06 — Workshops Organized",color:"#16A34A",emoji:"🏛️",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Workshop Title',type:'text',required:true,full:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'participants',label:'No. of Participants',type:'number'},{id:'role',label:'Your Role',type:'select',opts:['Organizer','Coordinator','Convenor']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','date','level','participants','role']},
ap07:{label:"AP07 — Trainings Organized",color:"#D97706",emoji:"🏋️",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'Training Title',type:'text',required:true,full:true},{id:'target',label:'Target Group',type:'text'},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'participants',label:'No. of Participants',type:'number'},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','target','date','level','participants']},
ap08:{label:"AP08 — Webinars / Seminars Organized",color:"#DB2777",emoji:"🌐",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Event Title',type:'text',required:true,full:true},{id:'cobody',label:'Co-Organizing Body',type:'text'},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'participants',label:'No. of Participants',type:'number'},{id:'speaker',label:'Chief Guest / Speaker',type:'text'},{id:'role',label:'Your Role',type:'select',opts:['Organizer','IQAC Coordinator','Coordinator','Convenor']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','date','level','participants','role']},
ap09:{label:"AP09 — Papers in Seminars",color:"#DC2626",emoji:"📝",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'Paper Title',type:'text',required:true,full:true},{id:'event',label:'Event Name',type:'text',required:true,full:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'role',label:'Your Role',type:'select',opts:['Presenter','Co-Presenter']},{id:'cert',label:'Certificate?',type:'select',opts:CERTS},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','event','date','level','role']},
ap10:{label:"AP10 — Conference Papers",color:"#0B1F4B",emoji:"🏆",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'Paper Title',type:'text',required:true,full:true},{id:'conference',label:'Conference Name',type:'text',required:true,full:true},{id:'date',label:'Date',type:'date',required:true},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'indexed',label:'Indexed In',type:'select',opts:['Scopus','Web of Science','UGC-CARE','Others']},{id:'isbn',label:'ISBN / ISSN',type:'text'},{id:'published',label:'Published?',type:'select',opts:CERTS},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','conference','date','level','indexed']},
ap11:{label:"AP11 — Journal Papers",color:"#7C3AED",emoji:"📰",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'Paper Title',type:'text',required:true,full:true},{id:'journal',label:'Journal Name',type:'text',required:true,full:true},{id:'indexing',label:'Indexing',type:'select',opts:['Scopus','Web of Science','UGC-CARE','ISSN','Others']},{id:'issn',label:'ISSN',type:'text'},{id:'vol',label:'Vol, Issue, Pages',type:'text'},{id:'doi',label:'DOI',type:'text'},{id:'pubdate',label:'Publication Date',type:'date',required:true},{id:'role',label:'Your Role',type:'select',opts:['Author','Co-Author','Corresponding Author']},{id:'coauthors',label:'Co-Authors',type:'text'},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','journal','pubdate','indexing','role']},
ap12:{label:"AP12 — Book Chapters",color:"#0D9488",emoji:"📖",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2023-24'},{id:'title',label:'Chapter Title',type:'text',required:true,full:true},{id:'book',label:'Book Title',type:'text',required:true,full:true},{id:'publisher',label:'Publisher',type:'text',required:true},{id:'isbn',label:'ISBN',type:'text'},{id:'doi',label:'DOI',type:'text'},{id:'pubdate',label:'Publication Date',type:'date',required:true},{id:'role',label:'Your Role',type:'select',opts:['Author','Co-Author']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','book','publisher','pubdate','role']},
ap13:{label:"AP13 — Books Published",color:"#EA580C",emoji:"📚",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Book Title',type:'text',required:true,full:true},{id:'publisher',label:'Publisher',type:'text',required:true},{id:'isbn',label:'ISBN',type:'text'},{id:'doi',label:'DOI / URL',type:'text'},{id:'pubdate',label:'Publication Date',type:'date',required:true},{id:'edition',label:'Edition',type:'text'},{id:'role',label:'Your Role',type:'select',opts:['Single Author','Co-Author','Editor']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','publisher','isbn','pubdate','role']},
ap14:{label:"AP14 — LMS eContent",color:"#16A34A",emoji:"💻",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Content Title',type:'text',required:true,full:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'type',label:'Content Type',type:'select',opts:['Chapter','Lab Manual','Video','MOOC','Course','E-Book','Study Material','Quiz']},{id:'platform',label:'Platform',type:'select',opts:['Zenodo','SWAYAM','Moodle','Google Classroom','YouTube','Others']},{id:'url',label:'URL / DOI',type:'text',full:true},{id:'date',label:'Date Created',type:'date',required:true}],cols:['ay','title','subject','type','platform','date']},
ap15:{label:"AP15 — LMS Subject Expert",color:"#0891B2",emoji:"🖥️",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'Subject / Module',type:'text',required:true,full:true},{id:'platform',label:'Platform',type:'select',opts:['SWAYAM','Moodle','Google Classroom','YouTube','Others']},{id:'date',label:'Date',type:'date',required:true},{id:'students',label:'No. of Students',type:'number'},{id:'status',label:'Status',type:'select',opts:STATUS},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','platform','date','students','status']},
ap16:{label:"AP16 — Academic Audit",color:"#0B1F4B",emoji:"🔍",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'type',label:'Audit Type',type:'text',required:true},{id:'institution',label:'Institution Audited',type:'text',required:true,full:true},{id:'date',label:'Date',type:'date',required:true},{id:'role',label:'Your Role',type:'select',opts:['Audit Adviser','IQAC Coordinator','Academic Advisor']},{id:'report',label:'Report Prepared?',type:'select',opts:CERTS},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','type','institution','date','role','report']},
ap17:{label:"AP17 — Guest Lectures Organized",color:"#DB2777",emoji:"👨‍🏫",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'topic',label:'Topic / Title',type:'text',required:true,full:true},{id:'speaker',label:'Speaker Name',type:'text',required:true},{id:'speakerorg',label:'Speaker Institution',type:'text'},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'participants',label:'No. of Participants',type:'number'},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','topic','speaker','date','mode','participants']},
ap18:{label:"AP18 — Meetings Attended",color:"#D97706",emoji:"🤝",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Meeting Title / Purpose',type:'text',required:true,full:true},{id:'organizer',label:'Organized By',type:'text',required:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'role',label:'Your Role',type:'select',opts:['Member','Chair','Secretary','IQAC Coordinator','HOD']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','organizer','date','mode','role']},
ap19:{label:"AP19 — Certificate Courses Organized",color:"#16A34A",emoji:"📜",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'title',label:'Course Title',type:'text',required:true,full:true},{id:'duration',label:'Duration',type:'text',required:true},{id:'start',label:'Start Date',type:'date',required:true},{id:'end',label:'End Date',type:'date'},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'enrolled',label:'Students Enrolled',type:'number'},{id:'role',label:'Your Role',type:'select',opts:['Organizer','Coordinator','Instructor']},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','title','duration','start','level','enrolled']},
ap20:{label:"AP20 — Committees",color:"#0D9488",emoji:"👥",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'committee',label:'Committee Name',type:'text',required:true,full:true},{id:'appointedby',label:'Appointed By',type:'text',required:true},{id:'role',label:'Your Role',type:'select',opts:['Member','Chair','Convenor','Secretary','IQAC Coordinator','HOD']},{id:'date',label:'Date',type:'date',required:true},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'meetings',label:'Meetings Attended',type:'number'},{id:'remarks',label:'Remarks',type:'text'}],cols:['ay','committee','appointedby','role','level','meetings']},
ap21:{label:"AP21 — Guest Lectures Given",color:"#7C3AED",emoji:"🎙️",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'topic',label:'Topic / Title',type:'text',required:true,full:true},{id:'invitedby',label:'Invited By',type:'text',required:true},{id:'institution',label:'Institution Name',type:'text',required:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'participants',label:'No. of Participants',type:'number'},{id:'url',label:'Remarks / URL',type:'text'}],cols:['ay','topic','institution','date','mode','participants']},
ap22:{label:"AP22 — Exam Duties",color:"#DC2626",emoji:"📋",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'type',label:'Duty Type',type:'select',opts:['Invigilation','External Examiner','Paper Valuation','Question Paper Setter'],required:true},{id:'institution',label:'Institution / Board',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text'},{id:'date',label:'Date',type:'date',required:true},{id:'order',label:'Appointment Order?',type:'select',opts:CERTS},{id:'remarks',label:'Remarks',type:'text'}],cols:['ay','type','institution','subject','date','order']},
ap23:{label:"AP23 — MOOCs",color:"#EA580C",emoji:"🏅",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2024-25'},{id:'title',label:'MOOC Title',type:'text',required:true,full:true},{id:'platform',label:'Platform',type:'select',opts:['SWAYAM','Coursera','edX','NPTEL','Udemy','LinkedIn Learning','Others'],required:true},{id:'offeredby',label:'Offered By',type:'text'},{id:'start',label:'Start Date',type:'date',required:true},{id:'end',label:'End Date',type:'date'},{id:'weeks',label:'Duration (Weeks)',type:'number'},{id:'cert',label:'Certificate Earned?',type:'select',opts:CERTS},{id:'grade',label:'Score / Grade',type:'text'}],cols:['ay','title','platform','start','weeks','cert','grade']},
fc01:{label:"FC01 — Student Roll List",color:"#0B1F4B",emoji:"📃",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'class',label:'Class / Section',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'semester',label:'Semester',type:'text'},{id:'total',label:'Total Enrolled',type:'number'},{id:'filelink',label:'Roll List File / Link',type:'text',full:true},{id:'remarks',label:'Remarks',type:'text'}],cols:['ay','class','subject','semester','total']},
fc02:{label:"FC02 — Time Table",color:"#0891B2",emoji:"🗓️",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'semester',label:'Semester',type:'text',required:true},{id:'class',label:'Class / Section',type:'text',required:true},{id:'subject',label:'Subject',type:'text',required:true},{id:'hours',label:'Hours / Week',type:'number'},{id:'days',label:'Days',type:'text'},{id:'filelink',label:'Timetable File / Link',type:'text',full:true}],cols:['ay','semester','class','subject','hours','days']},
fc03:{label:"FC03 — Lesson Plan",color:"#0D9488",emoji:"📑",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'semester',label:'Semester',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'unit',label:'Unit No.',type:'text'},{id:'unittitle',label:'Unit Title',type:'text'},{id:'hours',label:'No. of Hours',type:'number'},{id:'method',label:'Teaching Method',type:'text'},{id:'filelink',label:'Lesson Plan File / Link',type:'text',full:true},{id:'status',label:'Status',type:'select',opts:STATUS}],cols:['ay','semester','subject','class','unit','hours','status']},
fc04:{label:"FC04 — Annual Curricular Plan",color:"#7C3AED",emoji:"📆",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'semester',label:'Semester',type:'text'},{id:'units',label:'No. of Units',type:'number'},{id:'hours',label:'Total Hours Planned',type:'number'},{id:'filelink',label:'ACP File / Link',type:'text',full:true}],cols:['ay','subject','class','semester','units','hours']},
fc05:{label:"FC05 — Teaching Diary",color:"#DB2777",emoji:"📓",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'month',label:'Month',type:'select',opts:MONTHS,required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'classes',label:'No. of Classes Taken',type:'number'},{id:'topics',label:'Topics Covered',type:'textarea',full:true},{id:'filelink',label:'Teaching Diary File / Link',type:'text',full:true}],cols:['ay','month','subject','class','classes']},
fc06:{label:"FC06 — Teaching Notes",color:"#D97706",emoji:"📒",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'unit',label:'Unit No.',type:'text'},{id:'unittitle',label:'Unit Title',type:'text'},{id:'class',label:'Class',type:'text',required:true},{id:'filelink',label:'Notes File / Link',type:'text',full:true}],cols:['ay','subject','unit','unittitle','class']},
fc07:{label:"FC07 — Student Seminars",color:"#16A34A",emoji:"🎓",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'topic',label:'Seminar Topic',type:'text',full:true},{id:'date',label:'Date',type:'date',required:true},{id:'students',label:'No. of Students',type:'number'},{id:'filelink',label:'Report / Link',type:'text'}],cols:['ay','subject','class','date','students']},
fc08:{label:"FC08 — Quiz",color:"#EA580C",emoji:"❓",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'title',label:'Quiz Title',type:'text'},{id:'date',label:'Date',type:'date',required:true},{id:'questions',label:'No. of Questions',type:'number'},{id:'marks',label:'Max Marks',type:'number'},{id:'mode',label:'Mode',type:'select',opts:MODES}],cols:['ay','subject','class','date','questions','marks']},
fc09:{label:"FC09 — Group Discussions",color:"#DC2626",emoji:"💬",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'topic',label:'Topic',type:'text',full:true},{id:'date',label:'Date',type:'date',required:true},{id:'students',label:'No. of Students',type:'number'},{id:'outcome',label:'Outcome',type:'text',full:true}],cols:['ay','subject','class','date','students']},
fc10:{label:"FC10 — Assignment",color:"#0B1F4B",emoji:"✏️",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'title',label:'Assignment Title',type:'text',full:true},{id:'given',label:'Date Given',type:'date',required:true},{id:'submission',label:'Submission Date',type:'date'},{id:'marks',label:'Max Marks',type:'number'},{id:'submitted',label:'Students Submitted',type:'number'}],cols:['ay','subject','class','given','marks','submitted']},
fc11:{label:"FC11 — Study Projects",color:"#0891B2",emoji:"🔬",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'title',label:'Project Title',type:'text',full:true},{id:'teamsize',label:'Team Size',type:'number'},{id:'duration',label:'Duration',type:'text'},{id:'evaldate',label:'Evaluation Date',type:'date',required:true}],cols:['ay','subject','class','title','teamsize','evaldate']},
fc12:{label:"FC12 — Additional Inputs",color:"#0D9488",emoji:"➕",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'topic',label:'Topic',type:'text',full:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES}],cols:['ay','subject','class','date','mode']},
fc13:{label:"FC13 — CIA",color:"#7C3AED",emoji:"📊",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'semester',label:'Semester',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'ciatype',label:'CIA Type',type:'select',opts:['Mid Exam','Seminar','Assignment','Project','Quiz','Lab Record','Others']},{id:'date',label:'Date',type:'date',required:true},{id:'marks',label:'Max Marks',type:'number'},{id:'avg',label:'Avg Score',type:'number'},{id:'pass',label:'Pass %',type:'number'}],cols:['ay','semester','subject','class','ciatype','date','pass']},
fc14:{label:"FC14 — Result Analysis",color:"#DB2777",emoji:"📈",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'semester',label:'Semester',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'appeared',label:'Students Appeared',type:'number'},{id:'pass',label:'Pass',type:'number'},{id:'fail',label:'Fail',type:'number'},{id:'passpct',label:'Pass %',type:'number'},{id:'highest',label:'Highest Marks',type:'number'},{id:'avg',label:'Average Marks',type:'number'}],cols:['ay','semester','subject','class','appeared','pass','passpct']},
fc15:{label:"FC15 — CSP",color:"#D97706",emoji:"⭐",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'semester',label:'Semester',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'responses',label:'No. of Responses',type:'number'},{id:'rating',label:'Avg Rating (out of 5)',type:'number'},{id:'feedback',label:'Key Feedback',type:'textarea',full:true},{id:'action',label:'Action Taken',type:'textarea',full:true}],cols:['ay','semester','subject','class','responses','rating']},
fc16:{label:"FC16 — Short Term Internship",color:"#16A34A",emoji:"🏢",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'class',label:'Class',type:'text',required:true},{id:'students',label:'No. of Students',type:'number'},{id:'org',label:'Organisation',type:'text',required:true,full:true},{id:'duration',label:'Duration',type:'text'},{id:'start',label:'Start Date',type:'date',required:true},{id:'end',label:'End Date',type:'date'},{id:'domain',label:'Domain / Area',type:'text'}],cols:['ay','class','students','org','start','domain']},
fc17:{label:"FC17 — Long Term Internship",color:"#EA580C",emoji:"🏭",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'class',label:'Class',type:'text',required:true},{id:'students',label:'No. of Students',type:'number'},{id:'org',label:'Organisation',type:'text',required:true,full:true},{id:'duration',label:'Duration',type:'text'},{id:'start',label:'Start Date',type:'date',required:true},{id:'end',label:'End Date',type:'date'},{id:'domain',label:'Domain / Area',type:'text'},{id:'stipend',label:'Stipend?',type:'select',opts:['Yes','No','Partial']}],cols:['ay','class','students','org','start','domain']},
fc18:{label:"FC18 — Mentor-Mentee",color:"#DC2626",emoji:"🧑‍🤝‍🧑",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'class',label:'Class',type:'text',required:true},{id:'mentees',label:'No. of Mentees',type:'number'},{id:'date',label:'Meeting Date',type:'date',required:true},{id:'meetno',label:'Meeting No.',type:'number'},{id:'topics',label:'Topics Discussed',type:'textarea',full:true},{id:'action',label:'Action Taken',type:'text',full:true}],cols:['ay','class','mentees','date','meetno']},
fc19:{label:"FC19 — Question Papers",color:"#0B1F4B",emoji:"📝",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'semester',label:'Semester',type:'text',required:true},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'examtype',label:'Exam Type',type:'select',opts:['Mid Exam','End Semester','Supplementary','Model','Practice']},{id:'date',label:'Date of Exam',type:'date',required:true},{id:'marks',label:'Max Marks',type:'number'},{id:'filelink',label:'QP File / Link',type:'text',full:true}],cols:['ay','semester','subject','class','examtype','date','marks']},
fc20:{label:"FC20 — Teaching Pedagogies",color:"#7C3AED",emoji:"🎯",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'subject',label:'Subject / Course',type:'text',required:true},{id:'class',label:'Class',type:'text',required:true},{id:'method',label:'Pedagogy / Method',type:'select',opts:['Flipped Classroom','Collaborative Learning','Problem Based Learning','Case Study','Role Play','Peer Teaching','Project Based','Others']},{id:'date',label:'Date Implemented',type:'date',required:true},{id:'students',label:'No. of Students',type:'number'},{id:'outcome',label:'Outcome',type:'text',full:true},{id:'filelink',label:'Evidence Link / File',type:'text'}],cols:['ay','subject','class','method','date','students']},
custom:{label:"Custom Activities",color:"#4F46E5",emoji:"✨",fields:[{id:'ay',label:'Academic Year',type:'text',required:true,placeholder:'e.g. 2025-26'},{id:'category',label:'Your Category Name',type:'text',required:true,placeholder:'e.g. Award, Patent, MoU'},{id:'title',label:'Activity Title',type:'text',required:true,full:true},{id:'date',label:'Date',type:'date',required:true},{id:'mode',label:'Mode',type:'select',opts:MODES},{id:'level',label:'Level',type:'select',opts:LEVELS},{id:'organizer',label:'Organizer / Publisher',type:'text'},{id:'role',label:'Your Role',type:'text'},{id:'cert',label:'Certificate / Evidence?',type:'select',opts:CERTS},{id:'url',label:'Remarks / URL',type:'text',full:true}],cols:['ay','category','title','date','level','role','cert']}
};

/* ════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════ */
let fbData={}, fbProfile={}, fbAcademicYears=[], fbWebAppUrl='';
let activeAY='All', currentView='dashboard', charts={};

/* ════════════════════════════════════════════════
   APP NAVIGATION
════════════════════════════════════════════════ */
function goLanding(){
  document.getElementById('app-landing').classList.add('active');
  document.getElementById('app-portfolio').classList.remove('active');
  document.getElementById('app-tracker').classList.remove('active');
}
function goPortfolio(){
  document.getElementById('app-landing').classList.remove('active');
  document.getElementById('app-portfolio').classList.add('active');
  document.getElementById('app-tracker').classList.remove('active');
}
function goTracker(){
  document.getElementById('app-landing').classList.remove('active');
  document.getElementById('app-portfolio').classList.remove('active');
  document.getElementById('app-tracker').classList.add('active');
  showView('dashboard');
}

/* ════════════════════════════════════════════════
   FIREBASE INIT
════════════════════════════════════════════════ */
function initFirebase(){
  setSyncState('loading');
  // Profile
  db.ref(`${ROOT}/profile`).on('value', s=>{
    fbProfile = s.val()||{};
    if(currentView==='profile') renderProfile();
    updateHdrName();
    if(currentView==='dashboard') renderDashboard();
  });
  // Academic Years
  db.ref(`${ROOT}/academic_years`).on('value', s=>{
    const val = s.val();
    fbAcademicYears = val ? (Array.isArray(val) ? val : Object.values(val)) : [];
    renderAYManager();
    renderAYChips();
    populateReportAY();
    if(currentView==='dashboard') renderDashboard();
  });
  // Web App URL
  db.ref(`${ROOT}/webapp_url`).on('value', s=>{
    fbWebAppUrl = s.val()||'';
    const el = document.getElementById('webapp-url');
    if(el && fbWebAppUrl) el.value = fbWebAppUrl;
  });
  // All sheets
  Object.keys(SHEETS).forEach(k=>{
    fbData[k]={};
    db.ref(`${ROOT}/sheets/${k}`).on('value', s=>{
      fbData[k] = s.val()||{};
      updateBadge(k);
      if(currentView===k) renderSheet(k);
      if(currentView==='dashboard') renderDashboard();
      if(currentView==='summary') renderSummary();
    }, e=>{setSyncState('error');console.error(e)});
  });
  // Connection state
  db.ref('.info/connected').on('value', s=>{
    if(s.val()){
      setSyncState('live');
      setTimeout(()=>{ document.getElementById('loading').classList.add('hide') }, 700);
    } else {
      setSyncState('loading');
    }
  });
}

function setSyncState(s){
  const pill=document.getElementById('sync-pill');
  const dot=document.getElementById('sync-dot');
  const txt=document.getElementById('sync-text');
  if(!pill) return;
  pill.className='';
  dot.className='';
  if(s==='live'){pill.classList.add('live');txt.textContent='Live ✓'}
  else if(s==='error'){pill.classList.add('error');dot.classList.add('pulse');txt.textContent='Connection Error'}
  else{dot.classList.add('pulse');txt.textContent='Connecting…'}
}

/* ════════════════════════════════════════════════
   ACADEMIC YEAR MANAGER
════════════════════════════════════════════════ */
function renderAYManager(){
  const el = document.getElementById('ay-tags-list');
  if(!el) return;
  if(!fbAcademicYears.length){
    el.innerHTML = '<span style="font-size:13px;color:var(--muted)">No academic years added yet. Add one below.</span>';
    return;
  }
  el.innerHTML = fbAcademicYears.map(ay=>`
    <div class="ay-tag">
      <span>📅 ${ay}</span>
      <button class="del-ay" onclick="deleteAY('${ay}')" title="Remove ${ay}">✕</button>
    </div>`).join('');
}
async function addAY(){
  const inp = document.getElementById('ay-new-input');
  const val = inp.value.trim();
  if(!val){showToast('⚠️ Enter an academic year (e.g. 2025-26)','error');return;}
  if(fbAcademicYears.includes(val)){showToast('⚠️ This year already exists','error');return;}
  const updated = [...fbAcademicYears, val].sort();
  try{
    await db.ref(`${ROOT}/academic_years`).set(updated);
    inp.value='';
    showToast(`✅ Academic Year ${val} added!`,'success');
  }catch(e){showToast('❌ Failed to add year','error')}
}
async function deleteAY(ay){
  if(!confirm(`Remove Academic Year "${ay}"?\n\nNote: Your activity entries for this year are NOT deleted — only the year label is removed from the filter.`)) return;
  const updated = fbAcademicYears.filter(y=>y!==ay);
  try{
    await db.ref(`${ROOT}/academic_years`).set(updated);
    showToast(`🗑️ Year ${ay} removed`,'info');
    if(activeAY===ay){activeAY='All'; renderDashboard();}
  }catch(e){showToast('❌ Failed to remove year','error')}
}
function renderAYChips(){
  const el = document.getElementById('ay-chips');
  if(!el) return;
  let html = `<div class="ay-chip ${activeAY==='All'?'active':''}" onclick="setAY('All')">All Years</div>`;
  fbAcademicYears.forEach(ay=>{
    html+=`<div class="ay-chip ${activeAY===ay?'active':''}" onclick="setAY('${ay}')">${ay}</div>`;
  });
  el.innerHTML = html;
}
function setAY(ay){activeAY=ay; renderAYChips(); renderDashboard();}
function populateReportAY(){
  const sel = document.getElementById('report-ay');
  if(!sel) return;
  sel.innerHTML = '<option value="">— Select Year —</option>';
  fbAcademicYears.forEach(ay=>{ sel.innerHTML+=`<option value="${ay}">${ay}</option>`; });
}

/* ════════════════════════════════════════════════
   TRACKER NAVIGATION
════════════════════════════════════════════════ */
function showView(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const view = document.getElementById('view-'+id);
  if(view) view.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>{
    if(n.getAttribute('onclick')===`showView('${id}')`) n.classList.add('active');
  });
  currentView = id;
  if(id==='dashboard') renderDashboard();
  else if(id==='summary') renderSummary();
  else if(id==='profile') renderProfile();
  else if(id==='reports') populateReportAY();
  else if(SHEETS[id]) renderSheet(id);
  if(window.innerWidth<=900) document.getElementById('t-sidebar').classList.remove('open');
}
function toggleSidebar(){ document.getElementById('t-sidebar').classList.toggle('open') }

/* ════════════════════════════════════════════════
   SHEET RENDERER
════════════════════════════════════════════════ */
function renderSheet(sheetId){
  const sh = SHEETS[sheetId];
  const records = Object.entries(fbData[sheetId]||{});
  const c = document.getElementById('view-'+sheetId);
  const bgL = sh.color+'18';

  let html = `<div class="pg-header">
    <div class="pg-title">${sh.emoji} ${sh.label}</div>
    <div class="pg-sub"><span class="live-badge"><span class="live-dot-g"></span>Firebase Sync</span> ${records.length} entr${records.length===1?'y':'ies'} saved</div>
  </div>
  <div class="form-card">
    <div class="form-header">
      <div class="form-header-icon" style="background:${bgL}">${sh.emoji}</div>
      <div class="form-header-text">
        <h3>Add New Entry — Quick Save</h3>
        <p>Fills instantly to Firebase · Ready to submit as soon as activity completes</p>
      </div>
    </div>
    <div class="form-grid">`;

  sh.fields.forEach(f=>{
    const cls = f.full?' full':'';
    html+=`<div class="form-group${cls}"><label>${f.label}${f.required?'<span class="req">*</span>':''}</label>`;
    if(f.type==='select')
      html+=`<select id="f-${sheetId}-${f.id}"><option value="">— Select —</option>${(f.opts||[]).map(o=>`<option>${o}</option>`).join('')}</select>`;
    else if(f.type==='textarea')
      html+=`<textarea id="f-${sheetId}-${f.id}" rows="2" placeholder="${f.placeholder||''}"></textarea>`;
    else
      html+=`<input type="${f.type||'text'}" id="f-${sheetId}-${f.id}" placeholder="${f.placeholder||''}">`;
    html+=`</div>`;
  });

  html+=`</div>
    <div class="form-actions">
      <button class="btn btn-primary" onclick="addRecord('${sheetId}')">☁️ Save to Firebase</button>
      <button class="btn btn-secondary" onclick="clearForm('${sheetId}')">🗑️ Clear</button>
    </div>
  </div>`;

  // Table
  html+=`<div class="table-card">
    <div class="table-hdr">
      <div class="table-hdr-left">
        <div class="table-hdr-icon" style="background:${bgL}">${sh.emoji}</div>
        <div><div class="table-hdr-title">${sh.label}</div><div class="table-hdr-sub">All entries from Firebase — click ✕ to delete</div></div>
      </div>
      <span class="table-count-pill" style="background:${bgL};color:${sh.color}">${records.length} entries</span>
    </div>
    <div class="table-wrap">`;

  if(!records.length){
    html+=`<div class="empty-state"><span class="empty-icon">📭</span><div class="empty-title">No entries yet</div><div class="empty-sub">Fill the form above and click Save to Firebase</div></div>`;
  } else {
    const cols = sh.cols;
    html+=`<table><thead><tr>${cols.map(c=>`<th>${sh.fields.find(f=>f.id===c)?.label||c}</th>`).join('')}<th>Delete</th></tr></thead><tbody>`;
    records.forEach(([fbKey,rec])=>{
      html+=`<tr>`;
      cols.forEach(col=>{
        const v = rec[col]||'—';
        html+=`<td title="${v}">${col==='ay'?`<span class="td-ay">${v}</span>`:v}</td>`;
      });
      html+=`<td><button class="del-btn" onclick="delRecord('${sheetId}','${fbKey}')">✕ Remove</button></td></tr>`;
    });
    html+=`</tbody></table>`;
  }
  html+=`</div></div>`;
  c.innerHTML = html;
}

async function addRecord(sheetId){
  const sh = SHEETS[sheetId];
  const rec = {_ts:Date.now()};
  let valid = true;
  sh.fields.forEach(f=>{
    const el = document.getElementById(`f-${sheetId}-${f.id}`);
    if(!el) return;
    const val = el.value.trim();
    if(f.required&&!val){el.classList.add('error');valid=false;}
    else{el.classList.remove('error');rec[f.id]=val;}
  });
  if(!valid){showToast('⚠️ Please fill all required fields (marked *)','error');return;}
  setSyncState('loading');
  try{
    await db.ref(`${ROOT}/sheets/${sheetId}`).push(rec);
    clearForm(sheetId);
    setSyncState('live');
    showToast(`✅ Saved! Synced to all devices.`,'success');
  }catch(e){
    setSyncState('error');
    showToast('❌ Save failed — check internet connection','error');
  }
}
async function delRecord(sheetId,fbKey){
  if(!confirm('Remove this entry from Firebase?\nThis cannot be undone.')) return;
  try{
    await db.ref(`${ROOT}/sheets/${sheetId}/${fbKey}`).remove();
    showToast('🗑️ Entry deleted','info');
  }catch(e){showToast('❌ Delete failed','error')}
}
function clearForm(sheetId){
  SHEETS[sheetId].fields.forEach(f=>{
    const el = document.getElementById(`f-${sheetId}-${f.id}`);
    if(el){el.value='';el.classList.remove('error')}
  });
}
function updateBadge(k){
  const el = document.getElementById('badge-'+k);
  if(!el) return;
  const n = Object.keys(fbData[k]||{}).length;
  el.textContent=n;
  el.className='nav-badge'+(n>0?' has':'');
}

/* ════════════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════════════ */
function getAllRecords(){
  const all=[];
  Object.keys(SHEETS).forEach(k=>{
    Object.values(fbData[k]||{}).forEach(r=>all.push({...r,_sheet:k,_ay:r.ay||''}));
  });
  return all;
}
function renderDashboard(){
  const p = fbProfile;
  const name = p.name||'Dr. C.V. Krishnaveni';
  const dept = p.dept||'Computer Science';
  const college = p.college||'SKR & SKR GCW(A), Kadapa';
  document.getElementById('wb-name').textContent = name;
  document.getElementById('wb-sub').textContent = `${dept} · ${college} · Firebase Live Sync`;
  updateHdrName();
  const allData = getAllRecords();
  const usedAYs = fbAcademicYears.length ? fbAcademicYears : [...new Set(allData.map(r=>r._ay).filter(Boolean))].sort();
  document.getElementById('wb-stats').innerHTML = `
    <div class="wb-stat"><span class="n">${allData.length}</span><span class="l">Total</span></div>
    <div class="wb-stat"><span class="n">${usedAYs.length}</span><span class="l">Years</span></div>
    <div class="wb-stat"><span class="n">${Object.keys(SHEETS).length}</span><span class="l">Categories</span></div>`;

  const filtered = activeAY==='All' ? allData : allData.filter(r=>r._ay===activeAY);
  const apC  = filtered.filter(r=>r._sheet.startsWith('ap')).length;
  const fcC  = filtered.filter(r=>r._sheet.startsWith('fc')).length;
  const cuC  = filtered.filter(r=>r._sheet==='custom').length;
  const pubC = filtered.filter(r=>['ap11','ap12','ap13','ap10'].includes(r._sheet)).length;

  document.getElementById('t-infographic').innerHTML = `
    <div class="info-card ic1"><div class="info-icon">📋</div><div class="info-num">${filtered.length}</div><div class="info-label">Total Activities</div><div class="info-bg">📋</div></div>
    <div class="info-card ic2"><div class="info-icon">🏫</div><div class="info-num">${apC}</div><div class="info-label">Academic Proficiency</div><div class="info-bg">🏫</div></div>
    <div class="info-card ic3"><div class="info-icon">📚</div><div class="info-num">${fcC}</div><div class="info-label">Course File Items</div><div class="info-bg">📚</div></div>
    <div class="info-card ic4"><div class="info-icon">📰</div><div class="info-num">${pubC}</div><div class="info-label">Publications</div><div class="info-bg">📰</div></div>`;

  renderCharts(filtered, usedAYs);
}

function renderCharts(filtered, usedAYs){
  const ayMap={};
  usedAYs.forEach(ay=>ayMap[ay]=0);
  filtered.forEach(r=>{if(r._ay)ayMap[r._ay]=(ayMap[r._ay]||0)+1});
  const sortedAYs = Object.keys(ayMap).sort();

  if(charts.ay) charts.ay.destroy();
  charts.ay = new Chart(document.getElementById('chart-ay'),{
    type:'bar',
    data:{labels:sortedAYs.length?sortedAYs:['No data yet'],datasets:[{label:'Activities',data:sortedAYs.map(ay=>ayMap[ay]||0),backgroundColor:CC,borderRadius:8,borderSkipped:false}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1},grid:{color:'#F1F5F9'}},x:{grid:{display:false}}}}
  });

  const apC=filtered.filter(r=>r._sheet.startsWith('ap')).length;
  const fcC=filtered.filter(r=>r._sheet.startsWith('fc')).length;
  const cuC=filtered.filter(r=>r._sheet==='custom').length;
  if(charts.donut) charts.donut.destroy();
  charts.donut = new Chart(document.getElementById('chart-donut'),{
    type:'doughnut',
    data:{labels:['Academic Proficiency','Course File','Custom'],datasets:[{data:[apC,fcC,cuC],backgroundColor:['#2563EB','#0D9488','#4F46E5'],borderWidth:4,borderColor:'#fff',hoverOffset:8}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:11,weight:'700'},padding:12,usePointStyle:true,pointStyle:'circle'}}},cutout:'68%'}
  });

  const catMap={};
  filtered.forEach(r=>{const lbl=SHEETS[r._sheet]?.label?.split(' — ')[1]||r._sheet;catMap[lbl]=(catMap[lbl]||0)+1});
  const sorted=Object.entries(catMap).sort((a,b)=>b[1]-a[1]).slice(0,10);
  if(charts.top) charts.top.destroy();
  charts.top = new Chart(document.getElementById('chart-top'),{
    type:'bar',
    data:{labels:sorted.map(x=>x[0]),datasets:[{label:'Count',data:sorted.map(x=>x[1]),backgroundColor:CC,borderRadius:6}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,ticks:{stepSize:1},grid:{color:'#F1F5F9'}},y:{grid:{display:false}}}}
  });
}

/* ════════════════════════════════════════════════
   SUMMARY TABLE
════════════════════════════════════════════════ */
function renderSummary(){
  const allRecs = getAllRecords();
  const usedAYs = fbAcademicYears.length ? fbAcademicYears :
    [...new Set(allRecs.map(r=>r._ay).filter(Boolean))].sort();
  const el = document.getElementById('summary-content');
  if(!usedAYs.length){el.innerHTML='<div class="empty-state"><span class="empty-icon">📭</span><div class="empty-title">No data yet</div><div class="empty-sub">Add Academic Years and Activities to see the summary table</div></div>';return;}
  const countFor=(sid,ay)=>Object.values(fbData[sid]||{}).filter(r=>r.ay===ay).length;
  let html=`<table class="summary-table"><thead><tr><th>Activity</th>${usedAYs.map(ay=>`<th>${ay}</th>`).join('')}<th>TOTAL</th></tr></thead><tbody>`;
  const apKeys=Object.keys(SHEETS).filter(k=>k.startsWith('ap'));
  const fcKeys=Object.keys(SHEETS).filter(k=>k.startsWith('fc'));
  html+=`<tr class="sec-row"><td colspan="${usedAYs.length+2}">◆ ACADEMIC PROFICIENCY (AP01–AP23)</td></tr>`;
  apKeys.forEach(k=>{const counts=usedAYs.map(ay=>countFor(k,ay));const total=counts.reduce((a,b)=>a+b,0);html+=`<tr><td>${SHEETS[k].label}</td>${counts.map(c=>`<td class="num-cell ${c>0?'has':''}">${c||'—'}</td>`).join('')}<td class="num-cell has" style="color:#2563EB;font-weight:800">${total||'—'}</td></tr>`;});
  html+=`<tr class="sec-row"><td colspan="${usedAYs.length+2}">◆ FACULTY COURSE FILE (FC01–FC20)</td></tr>`;
  fcKeys.forEach(k=>{const counts=usedAYs.map(ay=>countFor(k,ay));const total=counts.reduce((a,b)=>a+b,0);html+=`<tr><td>${SHEETS[k].label}</td>${counts.map(c=>`<td class="num-cell ${c>0?'has':''}">${c||'—'}</td>`).join('')}<td class="num-cell has" style="color:#0D9488;font-weight:800">${total||'—'}</td></tr>`;});
  html+=`<tr class="sec-row"><td colspan="${usedAYs.length+2}">◆ CUSTOM ACTIVITIES</td></tr>`;
  const cc=usedAYs.map(ay=>countFor('custom',ay));const ct=cc.reduce((a,b)=>a+b,0);
  html+=`<tr><td>All Custom Activities</td>${cc.map(c=>`<td class="num-cell ${c>0?'has':''}">${c||'—'}</td>`).join('')}<td class="num-cell has" style="color:#4F46E5;font-weight:800">${ct||'—'}</td></tr>`;
  const gTotals=usedAYs.map(ay=>Object.keys(SHEETS).reduce((s,k)=>s+countFor(k,ay),0));
  const grand=gTotals.reduce((a,b)=>a+b,0);
  html+=`<tr class="total-row"><td>GRAND TOTAL</td>${gTotals.map(c=>`<td class="num-cell">${c||'—'}</td>`).join('')}<td class="num-cell">${grand}</td></tr>`;
  html+=`</tbody></table>`;
  el.innerHTML=html;
}

/* ════════════════════════════════════════════════
   REPORT GENERATION
════════════════════════════════════════════════ */
function showReportSection(id){
  ['setup','generate','webappscript'].forEach(s=>{
    const el=document.getElementById('report-'+s);
    if(el) el.style.display='none';
  });
  const target=document.getElementById('report-'+id);
  if(target) target.style.display='block';
  target.scrollIntoView({behavior:'smooth',block:'start'});
}
async function saveWebAppUrl(){
  const url = document.getElementById('webapp-url').value.trim();
  if(!url){showToast('⚠️ Enter your Apps Script Web App URL','error');return;}
  try{
    await db.ref(`${ROOT}/webapp_url`).set(url);
    showToast('✅ Web App URL saved to Firebase!','success');
  }catch(e){showToast('❌ Save failed','error')}
}
async function generateReport(){
  const url = document.getElementById('webapp-url').value.trim();
  const ay  = document.getElementById('report-ay').value;
  const month = document.getElementById('report-month').value;
  const rtype = document.getElementById('report-type').value;
  if(!url){showToast('⚠️ Enter your Apps Script Web App URL first','error');return;}
  if(!ay){showToast('⚠️ Select an Academic Year','error');return;}

  const statusEl = document.getElementById('report-status');
  statusEl.style.display='block';
  statusEl.innerHTML=`<div style="background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:12px;padding:16px;font-size:13px;color:#1E40AF;display:flex;align-items:center;gap:10px"><div style="animation:ldpulse 1s infinite;font-size:20px">⏳</div><div><strong>Generating your report…</strong><br/>Sending Firebase data to Apps Script → Building PDF → Saving to Google Drive</div></div>`;

  // Collect activities for the selected AY
  const allRecs = getAllRecords().filter(r=>{
    if(r._ay!==ay) return false;
    if(month!=='all'){
      // filter by month — check if any date field contains the month
      const dateStr = (r.date||r.start||r.pubdate||'').toLowerCase();
      return dateStr.includes(month.toLowerCase());
    }
    return true;
  });

  const payload = {
    faculty: fbProfile.name||'Dr. C.V. Krishnaveni',
    department: fbProfile.dept||'Computer Science',
    college: fbProfile.college||'SKR & SKR Government College for Women (Autonomous)',
    year: ay,
    month: month==='all'?'Full Year':month,
    rtype: rtype,
    activities: allRecs.map(r=>({
      sheet: r._sheet,
      sheetLabel: SHEETS[r._sheet]?.label||r._sheet,
      ay: r._ay,
      title: r.title||r.topic||r.committee||r.type||'Activity',
      organizer: r.organizer||r.invitedby||r.institution||r.org||'',
      date: r.date||r.start||r.pubdate||'',
      mode: r.mode||'',
      level: r.level||'',
      venue: r.venue||r.platform||'',
      participants: r.participants||r.students||r.enrolled||'',
      role: r.role||'',
      cert: r.cert||'',
      url: r.url||r.doi||r.filelink||'',
      remarks: r.remarks||r.outcome||''
    }))
  };

  try{
    const resp = await fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload),
      mode:'cors'
    });
    const data = await resp.json();
    if(data.status==='success'){
      statusEl.innerHTML=`<div style="background:#F0FDF4;border:1.5px solid #A7F3D0;border-radius:12px;padding:16px;font-size:13px;color:#065F46">
        <div style="font-size:18px;margin-bottom:8px">✅ Report Generated Successfully!</div>
        <div><strong>PDF saved to:</strong> Google Drive → Faculty_Activity_Reports → ${ay} → ${month==='all'?'Full Year':month}</div>
        <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
          <a href="${data.driveUrl||'https://drive.google.com'}" target="_blank" class="btn btn-success" style="text-decoration:none">📁 Open in Google Drive</a>
          ${data.pdfUrl?`<a href="${data.pdfUrl}" target="_blank" class="btn btn-primary" style="text-decoration:none">📄 Download PDF</a>`:''}
        </div>
      </div>`;
      showToast('✅ Report ready in Google Drive!','success');
    } else {
      statusEl.innerHTML=`<div style="background:#FEF2F2;border:1.5px solid #FECACA;border-radius:12px;padding:16px;font-size:13px;color:#991B1B">❌ Error: ${data.message||'Unknown error'}</div>`;
      showToast('❌ Report generation failed','error');
    }
  }catch(err){
    statusEl.innerHTML=`<div style="background:#FEF2F2;border:1.5px solid #FECACA;border-radius:12px;padding:16px;font-size:13px;color:#991B1B">
      ❌ Could not reach your Apps Script. Check:<br/>
      • Web App URL is correct<br/>
      • Deployed as "Anyone can access"<br/>
      • Script is re-deployed after changes<br/><br/>
      <strong>Error:</strong> ${err.message}
    </div>`;
    showToast('❌ Could not connect to Apps Script','error');
  }
}
function copyScript(){
  const txt = document.getElementById('script-code').textContent;
  navigator.clipboard.writeText(txt).then(()=>showToast('📋 Script copied to clipboard!','success'));
}

/* ════════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════════ */
function renderProfile(){
  const p = fbProfile;
  const f=(id,label,val,type='text')=>
    `<div class="form-group"><label>${label}</label><input type="${type}" id="prof-${id}" value="${val||''}" placeholder="${label}"></div>`;
  document.getElementById('profile-grid').innerHTML=`
    <div class="profile-section">
      <div class="profile-section-title">🧑 Personal Details</div>
      <div class="form-grid">
        ${f('name','Full Name',p.name)}${f('desig','Designation',p.desig)}
        ${f('dept','Department',p.dept)}${f('spec','Specialization',p.spec)}
        ${f('join','Date of Joining',p.join,'date')}${f('qual','Qualification',p.qual)}
        ${f('empid','Employee ID',p.empid)}
      </div>
    </div>
    <div class="profile-section">
      <div class="profile-section-title">🏛️ Institution Details</div>
      <div class="form-grid">
        ${f('college','College Name',p.college)}${f('district','District',p.district)}
        ${f('state','State',p.state)}${f('university','Affiliated University',p.university)}
        ${f('naac','NAAC Grade',p.naac)}${f('auto','Autonomous Status',p.auto)}
      </div>
    </div>
    <div class="profile-section full">
      <div class="profile-section-title">🌐 Online Presence</div>
      <div class="form-grid">
        ${f('email','Email (Official)',p.email,'email')}${f('mobile','Mobile',p.mobile,'tel')}
        ${f('blog','Blog / Portfolio URL',p.blog,'url')}${f('scholar','Google Scholar URL',p.scholar,'url')}
        ${f('orcid','ORCID ID',p.orcid)}${f('scopus','Scopus Author ID',p.scopus)}
        ${f('linkedin','LinkedIn URL',p.linkedin,'url')}${f('zenodo','Zenodo Profile',p.zenodo,'url')}
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" onclick="saveProfile()">☁️ Save Profile to Firebase</button>
      </div>
    </div>
    <div class="profile-section full">
      <div style="background:linear-gradient(135deg,#0B1F4B,#1e3a8a);border-radius:16px;padding:22px;color:#fff">
        <div style="font-family:'Playfair Display',serif;font-size:18px;margin-bottom:6px">🎓 Faculty Academic Activity System v3.0</div>
        <p style="font-size:12px;color:#93C5FD;line-height:1.7">
          © 2025 <strong style="color:#fff">Dr. C.V. Krishnaveni (Venkata Krishnaveni Chennuru)</strong><br>
          Lecturer in Computer Science &amp; HOD · IQAC Coordinator<br>
          SKR &amp; SKR Government College for Women (Autonomous), Kadapa, Andhra Pradesh<br>
          <a href="https://cvkrishnaveni.blogspot.com" target="_blank" style="color:#60A5FA;font-weight:700">🔗 cvkrishnaveni.blogspot.com</a>
        </p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <span style="background:rgba(34,197,94,.2);color:#86EFAC;border:1px solid rgba(34,197,94,.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">☁️ Firebase Realtime Database</span>
          <span style="background:rgba(96,165,250,.2);color:#93C5FD;border:1px solid rgba(96,165,250,.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">🌐 GitHub Pages Ready</span>
          <span style="background:rgba(251,191,36,.2);color:#FCD34D;border:1px solid rgba(251,191,36,.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">⚖️ CC BY 4.0</span>
          <span style="background:rgba(255,255,255,.1);color:#E2E8F0;border:1px solid rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">🆓 Free Forever</span>
        </div>
      </div>
    </div>`;
}
async function saveProfile(){
  const ids=['name','desig','dept','spec','join','qual','empid','college','district','state','university','naac','auto','email','mobile','blog','scholar','orcid','scopus','linkedin','zenodo'];
  const prof={};
  ids.forEach(id=>{const el=document.getElementById('prof-'+id);if(el)prof[id]=el.value.trim()});
  try{await db.ref(`${ROOT}/profile`).set(prof);showToast('✅ Profile saved to Firebase!','success');}
  catch(e){showToast('❌ Save failed','error')}
}
function updateHdrName(){
  const el=document.getElementById('t-hdr-name');
  if(el&&fbProfile.name) el.textContent='👩‍💻 '+fbProfile.name;
}

/* ════════════════════════════════════════════════
   EXPORT
════════════════════════════════════════════════ */
function exportCSV(){
  const all=getAllRecords();
  if(!all.length){showToast('No data to export yet','info');return;}
  const cols=['_sheet','_ay','title','category','organizer','date','start','end','mode','level','cert','role','url','remarks'];
  const rows=[cols.join(',')];
  all.forEach(r=>rows.push(cols.map(c=>`"${(r[c]||'').replace(/"/g,'""')}"`).join(',')));
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));
  a.download='FacultyTracker_CVK_Export.csv';a.click();
  showToast('⬇️ CSV exported successfully!','success');
}

/* ════════════════════════════════════════════════
   TOAST
════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg,type='info'){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='';
  t.classList.add('show',type);
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3200);
}

/* ════════════════════════════════════════════════
   PORTFOLIO HELPERS
════════════════════════════════════════════════ */
function pToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='';
  t.classList.add('show','info');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3000);
}
function pNavTo(id,btn){
  document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  document.querySelectorAll('.port-link').forEach(a=>a.classList.remove('act'));
  btn.classList.add('act');
}
function switchTab(section,tab,btn){
  document.querySelectorAll(`[id^="${section}-"]`).forEach(p=>p.classList.remove('on'));
  document.getElementById(`${section}-${tab}`).classList.add('on');
  btn.closest('.tab-bar').querySelectorAll('.tabbtn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}
function filterPubs(type,btn){
  document.querySelectorAll('#pub-list .pub-item').forEach(c=>{
    c.style.display=(type==='all'||c.dataset.type===type)?'flex':'none';
  });
  btn.closest('.sec-filters').querySelectorAll('.filt').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}
function filterEvents(type,btn){
  document.querySelectorAll('#event-list .event-item').forEach(c=>{
    c.style.display=(type==='all'||c.dataset.t?.includes(type))?'flex':'none';
  });
  btn.closest('.sec-filters').querySelectorAll('.filt').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}
window.addEventListener('scroll',()=>{
  const ids=['p-home','p-lab','p-books','p-tools','p-pubs','p-events','p-contact'];
  let cur='p-home';
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(el&&window.scrollY>=el.offsetTop-80) cur=id;
  });
  document.querySelectorAll('.port-link').forEach(a=>{
    const oc=a.getAttribute('onclick');
    if(oc&&oc.includes(cur)) a.classList.add('act');
    else a.classList.remove('act');
  });
});

/* ════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════ */
goLanding();
initFirebase();
</script>
</body>
</html>
