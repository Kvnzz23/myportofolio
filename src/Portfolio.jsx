import { useState, useEffect, useMemo, useRef } from "react";

/* =====================================================================
   DATA — ubah bagian ini saja untuk menyesuaikan portofolio kamu
   ===================================================================== */
const PROFILE = {
  name: "Kevin Herlambang",
  roles: [
    "Web Developer",
    "Mobile Developer",
    "Flutter Developer",
    "React Developer",
    "Mahasiswa Software Engineering",
  ],
  campus: "Software Engineering, Universitas Pignatelli Triputra",
  intro:
    "Mahasiswa Software Engineering semester 3 yang suka membangun aplikasi web dan mobile. Saya memakai Flutter, React, Next.js, dan Laravel, dan terus belajar lewat pelatihan serta program.",
  about: [
    "Saya Kevin Herlambang, mahasiswa program studi Software Engineering di Universitas Pignatelli Triputra, saat ini di semester 3. Sebelumnya saya lulusan jurusan Rekayasa Perangkat Lunak di SMKN 2 Surakarta.",
    "Saya sudah mengikuti pelatihan web dan mobile developer dari UGM lewat program sekolah, belajar React.js di Sanbercode, serta ikut Samsung Innovation Campus dan Samsung Solve for Tomorrow. Framework yang saya pakai: Flutter, React, Next.js, dan Laravel. Proyek pribadi saya masih dikerjakan dan akan tampil di sini setelah selesai.",
  ],
  email: "kevinherlambang03@gmail.com",
  availability: "Terbuka untuk magang & kolaborasi",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
  ],
  stats: [
    { value: "3", label: "Semester berjalan" },
    { value: "4", label: "Pelatihan & program" },
    { value: "4", label: "Framework dikuasai" },
  ],
};

const NAV = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "keahlian", label: "Keahlian" },
  { id: "proyek", label: "Proyek" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "sertifikat", label: "Sertifikat" },
  { id: "kontak", label: "Kontak" },
];

const TECH = [
  "Flutter",
  "React.js",
  "Next.js",
  "Laravel",
  "Dart",
  "Java",
  "PHP",
  "C#",
  "Python",
  "MySQL",
  "Git",
];

/* Grup bertipe "bars" memakai progress bar (level 0-100, silakan sesuaikan),
   grup bertipe "chips" hanya menampilkan label. */
const SKILLS = [
  {
    group: "Bahasa pemrograman",
    color: "var(--yellow)",
    type: "bars",
    items: [
      { name: "Dart", level: 75 },
      { name: "JavaScript", level: 70 },
      { name: "PHP", level: 70 },
      { name: "C#", level: 60 },
      { name: "Python", level: 65 },
    ],
  },
  {
    group: "Framework",
    color: "var(--pink)",
    type: "chips",
    items: ["Flutter", "React.js", "Next.js", "Laravel"],
  },
  {
    group: "Basis data & alat",
    color: "var(--mint)",
    type: "chips",
    items: ["MySQL", "Git"],
  },
];

/* Kosong dulu. Saat proyek sudah ada, tambahkan dengan format:
   {
     id: 1,
     title: "Nama Proyek",
     category: "Mobile",            // Web / Mobile / UI/UX
     color: "var(--yellow)",
     short: "Deskripsi singkat.",
     long: "Deskripsi lengkap untuk jendela detail.",
     tags: ["Flutter", "Dart"],
     demo: "https://...",
     repo: "https://github.com/...",
   }
*/
const PROJECTS = [
  {
     id: 1,
     title: "Worklify",
     category: "Web",            // Web / Mobile / UI/UX
     color: "var(--yellow)",
     short: "Worklify adalah platform pencarian kerja dan manajemen karir modern yang menghubungkan para profesional dengan berbagai peluang kerja terbaik secara cepat, efisien, dan terintegrasi.",
     long: "Worklify adalah platform manajemen kerja dan produktivitas serbaguna yang dirancang untuk membantu individu maupun tim mengelola proyek, menyederhanakan alur kerja (workflow), serta memantau progres tugas secara real-time.\nDengan antarmuka yang bersih, intuitif, dan responsif, Worklify memangkas kompleksitas koordinasi pekerjaan sehingga pengguna dapat berfokus pada hal yang paling penting: menyelesaikan pekerjaan dengan lebih efisien.",
     tags: ["React", "JavaScript"],
     demo: "https://worklify01.vercel.app/",
     repo: "https://github.com/Kvnzz23/worklify",
   }
];

const EXPERIENCE = {
  Pendidikan: [
    {
      title: "Program Studi Software Engineering",
      place: "Universitas Pignatelli Triputra",
      period: "Mahasiswa aktif, semester 3",
      desc: "Mempelajari rekayasa perangkat lunak, pemrograman, dan basis data.",
    },
    {
      title: "Jurusan Rekayasa Perangkat Lunak",
      place: "SMKN 2 Surakarta",
      period: "2022-2025", // isi tahun, contoh: "2022 – 2025"
      desc: "Belajar dasar pemrograman dan pengembangan aplikasi di jurusan RPL.",
    },
  ],
  "Pelatihan & Program": [
    {
      title: "Pelatihan Web & Mobile Developer Intermediate",
      place: "Universitas Gadjah Mada (UGM)",
      period: "3 Oktober - 21 November 2023", // isi tahun
      desc: "Program dari sekolah. Belajar membangun aplikasi web dan mobile.",
    },
    {
      title: "Pelatihan Web & Mobile Developer Advance",
      place: "Universitas Gadjah Mada (UGM)",
      period: "11 Januari - 7 Maret 2024", // isi tahun
      desc: "Program dari sekolah. Belajar membangun aplikasi web dan mobile.",
    },
    {
      title: "React JS - Web Frontend Development",
      place: "Sanbercode",
      period: "26 Mei – 20 Juni 2025",
      desc: "Bootcamp frontend: HTML, CSS, JavaScript modern, dan React.js (hooks, context, React Router, REST API dengan axios, autentikasi, dan deployment). Terdapat sertifikat dengan nomor verifikasi.",
    },
    {
      title: "Samsung Innovation Campus",
      place: "Samsung",
      period: "2026",
      desc: "Pernah mengikuti program Samsung Innovation Campus.",
    },
    {
      title: "Samsung Solve for Tomorrow",
      place: "Samsung",
      period: "04–25 Juli 2026",
      desc: "Pernah mengikuti program Samsung Solve for Tomorrow.",
    },
  ],
};

/* Sertifikat.
   - image: foto/scan sertifikat. Taruh file di folder public/sertifikat/ lalu tulis
     "/sertifikat/nama-file.jpg". Kalau kosong, kartu tampil dengan warna polos.
   - file : (opsional) file PDF sertifikat di public/sertifikat/, contoh "/sertifikat/nama.pdf".
            Muncul sebagai tombol "Lihat PDF".
   - link : (opsional) tautan verifikasi online.
   - year : (opsional) tahun terbit.
   Hapus entri yang kamu tidak punya sertifikatnya. */
const CERTIFICATES = [
  {
    id: 1,
    title: "Pelatihan Web & Mobile Developer Intermediate",
    issuer: "Universitas Gadjah Mada (UGM)",
    year: "2023",
    image: "/sertifikat/UGM_intermediate.png",
    link: "https://drive.google.com/file/d/16xAhlMrRy6uG3H0jp_PhDP3bzoYtwOFZ/view?usp=sharing",
    color: "var(--yellow)",
  },
  {
    id: 2,
    title: "Pelatihan Web & Mobile Developer Advance",
    issuer: "Universitas Gadjah Mada (UGM)",
    year: "2024",
    image: "/sertifikat/UGM_advance.png",
    link: "https://drive.google.com/file/d/1o-i5vH_avih2noczntFzi4pByj1TpWkP/view?usp=sharing",
    color: "var(--mint)",
  },
  {
    id: 3,
    title: "React JS - Web Frontend Development",
    issuer: "Sanbercode",
    year: "2025",
    image: "/sertifikat/sanbercode-react.jpg",
    link: "https://sanbercode.com/certificate/in/192dce74-4bb6-44ca-8c1c-7c758075b6c9",
    color: "var(--pink)",
  },
  {
    id: 4,
    title: "Samsung Solve for Tomorrow",
    issuer: "Samsung",
    year: "2026",
    image: "/sertifikat/sft.png",
    link: "https://drive.google.com/file/d/1MXjr3iC99q8zcvprANfPrPEXCCI0dmHu/view?usp=sharing",
    color: "var(--orange)",
  },
];

/* =====================================================================
   STYLE
   ===================================================================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap');

.np {
  --yellow: #FFD60A;
  --pink: #FF6FB5;
  --blue: #6C8CFF;
  --mint: #4FE3A1;
  --orange: #FF9F43;
  --bg: #EDE8FF;
  --surface: #FFFFFF;
  --text: #000000;
  --line: #000000;
  --muted: #3a3550;
  --shadow: 6px 6px 0 var(--line);
  --shadow-sm: 3px 3px 0 var(--line);
  --head: 'Archivo Black', 'Arial Black', Impact, sans-serif;
  --body: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
  font-family: var(--body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  font-size: 17px;
}
.np[data-theme="dark"] {
  --bg: #1A1030;
  --surface: #2B1D4D;
  --text: #FFFFFF;
  --line: #F2EEFF;
  --muted: #cfc6ee;
}
.np *, .np *::before, .np *::after { box-sizing: border-box; }
.np h1, .np h2, .np h3, .np h4 { font-family: var(--head); font-weight: 400; line-height: 1.05; margin: 0; letter-spacing: -0.01em; }
.np p { margin: 0; }
.np a { color: inherit; }
.np button { font-family: inherit; cursor: pointer; }
.np :focus-visible { outline: 4px solid var(--blue); outline-offset: 3px; }

.np .wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
.np section { padding: 88px 0; scroll-margin-top: 72px; }
.np .h2 { font-size: clamp(2.2rem, 6vw, 3.6rem); display: inline-block; background: var(--yellow); color: #000; padding: 6px 16px; border: 3px solid var(--line); box-shadow: var(--shadow); transform: rotate(-1.5deg); margin-bottom: 44px; }

/* reusable pieces */
.np .box { background: var(--surface); border: 3px solid var(--line); box-shadow: var(--shadow); }
.np .btn { display: inline-block; font-weight: 700; font-size: 1rem; padding: 12px 22px; border: 3px solid var(--line); background: var(--yellow); color: #000; box-shadow: var(--shadow-sm); text-decoration: none; transition: transform .1s, box-shadow .1s; }
.np .btn:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--line); }
.np .btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 var(--line); }
.np .btn.pink { background: var(--pink); }
.np .btn.white { background: #fff; }
.np .btn.sm { padding: 7px 14px; font-size: .9rem; }
.np .tag { display: inline-block; font-size: .82rem; font-weight: 700; padding: 2px 10px; border: 2px solid var(--line); background: #fff; color: #000; margin: 0 6px 6px 0; }

/* progress bar on top */
.np .progress { position: fixed; top: 0; left: 0; height: 6px; background: var(--pink); border-bottom: 2px solid var(--line); z-index: 60; }

/* navbar */
.np .nav { position: sticky; top: 0; z-index: 50; background: var(--bg); border-bottom: 3px solid var(--line); }
.np .nav-in { display: flex; align-items: center; justify-content: space-between; height: 66px; gap: 12px; }
.np .logo { font-family: var(--head); font-size: 1.3rem; text-decoration: none; background: var(--pink); color: #000; border: 3px solid var(--line); padding: 2px 12px; box-shadow: var(--shadow-sm); }
.np .links { display: flex; gap: 6px; align-items: center; }
.np .links a { text-decoration: none; font-weight: 700; padding: 6px 12px; border: 3px solid transparent; font-size: .95rem; }
.np .links a:hover { border-color: var(--line); }
.np .links a.on { background: var(--yellow); color: #000; border-color: var(--line); }
.np .icon-btn { width: 44px; height: 44px; border: 3px solid var(--line); background: var(--surface); color: var(--text); font-size: 1.2rem; box-shadow: var(--shadow-sm); }
.np .icon-btn:active { transform: translate(3px,3px); box-shadow: none; }
.np .burger { display: none; }
.np .tools { display: flex; gap: 10px; }

/* hero */
.np .hero { padding: 72px 0 88px; }
.np .hero-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; }
.np .hero h1 { font-size: clamp(3rem, 9vw, 6.4rem); text-transform: uppercase; }
.np .hero h1 span { display: block; }
.np .hero h1 .name { background: var(--yellow); color: #000; display: inline-block; padding: 0 14px; border: 4px solid var(--line); box-shadow: 8px 8px 0 var(--line); margin-top: 10px; transform: rotate(-1.5deg); }
.np .role-line { margin: 34px 0 14px; font-size: 1.35rem; font-weight: 700; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.np .role-pill { background: var(--mint); color: #000; border: 3px solid var(--line); padding: 2px 14px; box-shadow: var(--shadow-sm); }
.np .hero p.intro { max-width: 52ch; color: var(--muted); font-size: 1.1rem; }
.np .cta { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 30px; }
.np .card-id { position: relative; padding: 28px; background: var(--blue); color: #000; text-align: center; transform: rotate(2deg); }
.np .avatar { width: 190px; height: 190px; margin: 0 auto 20px; background: var(--yellow); border: 4px solid #000; display: grid; place-items: center; font-family: var(--head); font-size: 4.6rem; box-shadow: 6px 6px 0 #000; }
.np .card-id h3 { font-size: 1.6rem; }
.np .card-id p { margin-top: 6px; font-weight: 500; }
.np .sticker { position: absolute; top: -22px; right: -14px; background: var(--pink); color: #000; border: 3px solid #000; padding: 6px 14px; font-weight: 700; font-size: .9rem; transform: rotate(8deg); box-shadow: 3px 3px 0 #000; max-width: 190px; text-align: center; line-height: 1.25; }

/* marquee */
.np .marquee { overflow: hidden; background: var(--pink); color: #000; border-top: 3px solid var(--line); border-bottom: 3px solid var(--line); padding: 14px 0; }
.np .marquee-track { display: flex; width: max-content; animation: np-scroll 28s linear infinite; }
.np .marquee-track span { font-family: var(--head); font-size: 1.5rem; padding: 0 28px; white-space: nowrap; }
@keyframes np-scroll { to { transform: translateX(-50%); } }

/* about */
.np .about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
.np .about-text { padding: 28px; display: grid; gap: 16px; }
.np .about-text p { max-width: 62ch; }
.np .stats { display: grid; gap: 20px; }
.np .stat { padding: 18px 22px; display: flex; align-items: baseline; gap: 16px; color: #000; }
.np .stat b { font-family: var(--head); font-size: 2.8rem; line-height: 1; }
.np .stat:nth-child(1) { background: var(--yellow); }
.np .stat:nth-child(2) { background: var(--mint); }
.np .stat:nth-child(3) { background: var(--orange); }

/* skills */
.np .skill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.np .skill-card { padding: 0; overflow: hidden; }
.np .skill-card h3 { padding: 14px 20px; border-bottom: 3px solid var(--line); font-size: 1.3rem; color: #000; }
.np .skill-body { padding: 20px; display: grid; gap: 18px; }
.np .skill-row .top { display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 6px; font-size: .95rem; }
.np .bar { height: 20px; border: 3px solid var(--line); background: var(--bg); }
.np .bar i { display: block; height: 100%; border-right: 3px solid var(--line); }
.np .chips { display: flex; flex-wrap: wrap; gap: 12px; }
.np .chip { font-weight: 700; font-size: 1.05rem; padding: 6px 16px; border: 3px solid var(--line); background: var(--surface); color: var(--text); box-shadow: var(--shadow-sm); }
.np .empty-state { padding: 32px; background: var(--yellow); color: #000; display: grid; gap: 14px; max-width: 680px; }
.np .empty-state h3 { font-size: 1.7rem; }

/* projects */
.np .filters { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 34px; }
.np .filters button { font-weight: 700; padding: 8px 18px; border: 3px solid var(--line); background: var(--surface); color: var(--text); box-shadow: var(--shadow-sm); font-size: .98rem; }
.np .filters button[aria-pressed="true"] { background: var(--yellow); color: #000; transform: translate(3px,3px); box-shadow: none; }
.np .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.np .proj { display: flex; flex-direction: column; transition: transform .12s, box-shadow .12s; text-align: left; padding: 0; color: var(--text); font-size: inherit; }
.np .proj:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--line); }
.np .proj-thumb { height: 140px; border-bottom: 3px solid var(--line); display: grid; place-items: center; font-family: var(--head); font-size: 2.2rem; color: #000; padding: 10px; text-align: center; }
.np .proj-body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.np .proj-body h3 { font-size: 1.35rem; }
.np .proj-body p { color: var(--muted); font-size: .98rem; flex: 1; }
.np .empty { padding: 28px; font-weight: 700; }

/* modal */
.np .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.65); display: grid; place-items: center; padding: 20px; z-index: 100; }
.np .modal { max-width: 620px; width: 100%; max-height: 90vh; overflow: auto; position: relative; }
.np .modal .proj-thumb { height: 120px; }
.np .modal-body { padding: 24px; display: grid; gap: 14px; }
.np .modal-body h3 { font-size: 1.9rem; }
.np .modal .close { position: absolute; top: 12px; right: 12px; width: 40px; height: 40px; background: var(--pink); color: #000; border: 3px solid #000; font-weight: 700; font-size: 1.1rem; box-shadow: 3px 3px 0 #000; }
.np .modal-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 4px; }

/* sertifikat */
.np .cert-img { width: 100%; height: 220px; object-fit: cover; object-position: 50% 42%; display: block; border-bottom: 3px solid var(--line); }
.np .cert-img.ph { display: grid; place-items: center; font-family: var(--head); font-size: 1.4rem; color: #000; padding: 14px; text-align: center; }
.np .modal .cert-img { height: auto; max-height: 62vh; object-fit: contain; background: var(--bg); }
.np .modal .cert-img.ph { height: 170px; }

/* experience */
.np .tabs { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 36px; }
.np .tabs button { font-weight: 700; padding: 10px 22px; border: 3px solid var(--line); background: var(--surface); color: var(--text); box-shadow: var(--shadow-sm); font-size: 1rem; }
.np .tabs button[aria-pressed="true"] { background: var(--blue); color: #000; transform: translate(3px,3px); box-shadow: none; }
.np .timeline { position: relative; padding-left: 38px; display: grid; gap: 28px; max-width: 820px; }
.np .timeline::before { content: ""; position: absolute; left: 11px; top: 6px; bottom: 6px; width: 4px; background: var(--line); }
.np .tl-item { position: relative; padding: 20px 24px; }
.np .tl-item::before { content: ""; position: absolute; left: -38px; top: 24px; width: 26px; height: 26px; background: var(--pink); border: 3px solid var(--line); }
.np .tl-item h3 { font-size: 1.25rem; }
.np .tl-meta { display: flex; flex-wrap: wrap; gap: 8px 14px; margin: 8px 0 10px; font-weight: 700; font-size: .95rem; }
.np .tl-meta .period { background: var(--yellow); color: #000; border: 2px solid var(--line); padding: 0 8px; }
.np .tl-item p { color: var(--muted); }

/* testimonials */
.np .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.np .testi { padding: 24px; color: #000; display: flex; flex-direction: column; gap: 18px; justify-content: space-between; }
.np .testi:nth-child(2) { transform: rotate(1deg); }
.np .testi blockquote { margin: 0; font-size: 1.05rem; font-weight: 500; }
.np .testi b { display: block; font-family: var(--head); font-weight: 400; font-size: 1.05rem; }
.np .testi span { font-size: .9rem; }

/* contact */
.np .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: start; }
.np .contact-info { padding: 28px; background: var(--mint); color: #000; display: grid; gap: 18px; }
.np .contact-info h3 { font-size: 1.7rem; }
.np .contact-info .links-col { display: grid; gap: 10px; }
.np .contact-form { padding: 28px; display: grid; gap: 18px; }
.np .field label { display: block; font-weight: 700; margin-bottom: 6px; }
.np .field input, .np .field textarea { width: 100%; font-family: inherit; font-size: 1rem; padding: 12px 14px; border: 3px solid var(--line); background: var(--bg); color: var(--text); border-radius: 0; box-shadow: var(--shadow-sm); }
.np .field textarea { min-height: 140px; resize: vertical; }
.np .field.err input, .np .field.err textarea { border-color: #E5195E; }
.np .err-msg { color: #E5195E; font-weight: 700; font-size: .9rem; margin-top: 6px; }
.np[data-theme="dark"] .err-msg { color: #FF8FB8; }
.np .ok { background: var(--yellow); color: #000; border: 3px solid var(--line); padding: 12px 16px; font-weight: 700; }

/* footer */
.np footer { background: var(--text); color: var(--bg); border-top: 3px solid var(--line); padding: 28px 0; }
.np .foot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.np footer .btn { box-shadow: 3px 3px 0 var(--pink); }

/* responsive */
@media (max-width: 920px) {
  .np .hero-grid, .np .about-grid, .np .contact-grid { grid-template-columns: 1fr; }
  .np .skill-grid, .np .proj-grid, .np .testi-grid { grid-template-columns: 1fr 1fr; }
  .np .card-id { max-width: 380px; margin: 10px auto 0; }
}
@media (max-width: 1040px) {
  .np .burger { display: block; }
  .np .links { display: none; position: absolute; top: 66px; left: 0; right: 0; flex-direction: column; align-items: stretch; background: var(--bg); border-bottom: 3px solid var(--line); padding: 14px 20px 20px; gap: 8px; }
  .np .links.open { display: flex; }
  .np .links a { border-color: var(--line); background: var(--surface); }
}
@media (max-width: 640px) {
  .np { font-size: 16px; }
  .np section { padding: 64px 0; }
  .np .skill-grid, .np .proj-grid, .np .testi-grid { grid-template-columns: 1fr; }
  .np .testi:nth-child(2) { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .np .marquee-track { animation: none; }
  .np .btn, .np .proj { transition: none; }
}
`;

/* =====================================================================
   KOMPONEN
   ===================================================================== */
function Navbar({ active, dark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="logo" href="#beranda" onClick={() => setOpen(false)}>
          {PROFILE.name.split(" ")[0]}.dev
        </a>
        <nav
          className={"links" + (open ? " open" : "")}
          aria-label="Navigasi utama"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={"#" + n.id}
              className={active === n.id ? "on" : ""}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="tools">
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            title={dark ? "Mode terang" : "Mode gelap"}
          >
            {dark ? "☀" : "☾"}
          </button>
          <button
            className="icon-btn burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Buka menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const first = PROFILE.name.split(" ")[0];
  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <section id="beranda" className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>
            <span>Halo, saya</span>
            <span className="name">{first}</span>
          </h1>
          <div className="role-line">
            <span>Saya seorang</span>
            <span className="role-pill">{PROFILE.roles[roleIdx]}</span>
            <button
              className="btn sm white"
              onClick={() => setRoleIdx((i) => (i + 1) % PROFILE.roles.length)}
            >
              Ganti peran
            </button>
          </div>
          <p className="intro">{PROFILE.intro}</p>
          <div className="cta">
            <a className="btn" href="#proyek">
              Lihat proyek saya
            </a>
            <a className="btn pink" href="#kontak">
              Hubungi saya
            </a>
          </div>
        </div>
        <div className="box card-id" aria-label="Kartu profil">
          <div className="sticker">{PROFILE.availability}</div>
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <h3>{PROFILE.name}</h3>
          <p>{PROFILE.campus}</p>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...TECH, ...TECH];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.concat(row).map((t, i) => (
          <span key={i}>{t} ✱</span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="tentang">
      <div className="wrap">
        <h2 className="h2">Tentang saya</h2>
        <div className="about-grid">
          <div className="box about-text">
            {PROFILE.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div>
              <a
                className="btn sm"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Unduh CV
              </a>
            </div>
          </div>
          <div className="stats">
            {PROFILE.stats.map((s) => (
              <div className="box stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="keahlian">
      <div className="wrap">
        <h2 className="h2">Keahlian</h2>
        <div className="skill-grid">
          {SKILLS.map((g) => (
            <div className="box skill-card" key={g.group}>
              <h3 style={{ background: g.color }}>{g.group}</h3>
              {g.type === "bars" ? (
                <div className="skill-body">
                  {g.items.map((s) => (
                    <div className="skill-row" key={s.name}>
                      <div className="top">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div
                        className="bar"
                        role="progressbar"
                        aria-valuenow={s.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={s.name}
                      >
                        <i
                          style={{ width: s.level + "%", background: g.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="skill-body chips">
                  {g.items.map((i) => (
                    <span className="chip" key={i}>
                      {i}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="box modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close"
          onClick={onClose}
          aria-label="Tutup detail proyek"
        >
          ✕
        </button>
        <div className="proj-thumb" style={{ background: project.color }}>
          {project.title}
        </div>
        <div className="modal-body">
          <h3>{project.title}</h3>
          <div>
            {project.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <p>{project.long}</p>
          <div className="modal-actions">
            <a className="btn" href={project.demo}>
              Buka demo
            </a>
            <a className="btn white" href={project.repo}>
              Lihat kode
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [cat, setCat] = useState("Semua");
  const [selected, setSelected] = useState(null);
  const categories = useMemo(
    () => ["Semua", ...new Set(PROJECTS.map((p) => p.category))],
    [],
  );
  const list = useMemo(
    () =>
      cat === "Semua" ? PROJECTS : PROJECTS.filter((p) => p.category === cat),
    [cat],
  );

  return (
    <section id="proyek">
      <div className="wrap">
        <h2 className="h2">Proyek</h2>
        {PROJECTS.length === 0 ? (
          <div className="box empty-state">
            <h3>Proyek pertama sedang dikerjakan</h3>
            <p>
              Proyek pribadi saya masih dalam pengerjaan. Hasilnya akan
              ditampilkan di sini setelah selesai.
            </p>
            <div>
              <a className="btn pink" href="#kontak">
                Ingin berdiskusi? Hubungi saya
              </a>
            </div>
          </div>
        ) : (
          <>
            <div
              className="filters"
              role="group"
              aria-label="Filter kategori proyek"
            >
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="proj-grid">
              {list.map((p) => (
                <button
                  key={p.id}
                  className="box proj"
                  onClick={() => setSelected(p)}
                  aria-label={"Lihat detail " + p.title}
                >
                  <div className="proj-thumb" style={{ background: p.color }}>
                    {p.title}
                  </div>
                  <div className="proj-body">
                    <h3>{p.title}</h3>
                    <p>{p.short}</p>
                    <div>
                      {p.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function Experience() {
  const [tab, setTab] = useState("Pendidikan");
  return (
    <section id="pengalaman">
      <div className="wrap">
        <h2 className="h2">Pengalaman</h2>
        <div className="tabs" role="group" aria-label="Jenis riwayat">
          {Object.keys(EXPERIENCE).map((t) => (
            <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="timeline">
          {EXPERIENCE[tab].map((e) => (
            <article className="box tl-item" key={e.title + e.period}>
              <h3>{e.title}</h3>
              <div className="tl-meta">
                <span>{e.place}</span>
                {e.period && <span className="period">{e.period}</span>}
              </div>
              <p>{e.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertThumb({ c, className }) {
  const [broken, setBroken] = useState(false);
  if (c.image && !broken) {
    return (
      <img
        className={className}
        src={c.image}
        alt={"Sertifikat " + c.title}
        onError={() => setBroken(true)}
      />
    );
  }
  return (
    <div className={className + " ph"} style={{ background: c.color }}>
      {c.issuer}
    </div>
  );
}

function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="box modal"
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close"
          onClick={onClose}
          aria-label="Tutup sertifikat"
        >
          ✕
        </button>
        <CertThumb c={cert} className="cert-img" />
        <div className="modal-body">
          <h3>{cert.title}</h3>
          <p>
            {cert.issuer}
            {cert.year ? " · " + cert.year : ""}
          </p>
          {(cert.link) && (
            <div className="modal-actions">
              {cert.link && (
                <a
                  className="btn white"
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Verifikasi sertifikat
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Certificates() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="sertifikat">
      <div className="wrap">
        <h2 className="h2">Sertifikat</h2>
        {CERTIFICATES.length === 0 ? (
          <div className="box empty-state">
            <h3>Sertifikat segera ditambahkan</h3>
            <p>
              Sertifikat pelatihan dan program yang saya ikuti akan tampil di
              sini.
            </p>
          </div>
        ) : (
          <div className="proj-grid">
            {CERTIFICATES.map((c) => (
              <button
                key={c.id}
                className="box proj"
                onClick={() => setSelected(c)}
                aria-label={"Lihat sertifikat " + c.title}
              >
                <CertThumb c={c} className="cert-img" />
                <div className="proj-body">
                  <h3>{c.title}</h3>
                  <p>
                    {c.issuer}
                    {c.year ? " · " + c.year : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    setSent(false);
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Kevin Herlambang";
    if (!form.email.trim()) er.email = "kevinherlambang03@gmail.com";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = "kevinherlambang03@gmail.com";
    if (form.message.trim().length < 10)
      er.message = "Tulis pesan minimal 10 karakter.";
    return er;
  };

  const submit = () => {
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    const subject = encodeURIComponent("Pesan dari " + form.name);
    const body = encodeURIComponent(
      form.message + "\n\n" + form.name + " (" + form.email + ")",
    );
    try {
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    } catch (e) {
      /* abaikan */
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const Field = ({ id, label, children }) => (
    <div className={"field" + (errors[id] ? " err" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {errors[id] && (
        <div className="err-msg" role="alert">
          {errors[id]}
        </div>
      )}
    </div>
  );

  return (
    <section id="kontak">
      <div className="wrap">
        <h2 className="h2">Ayo ngobrol</h2>
        <div className="contact-grid">
          <div className="box contact-info">
            <h3>Punya ide atau peluang?</h3>
            <p>
              Saya senang berdiskusi soal magang, kolaborasi, atau proyek kecil.
              Kirim pesan dan saya akan membalas.
            </p>
            <a className="btn white" href={"mailto:" + PROFILE.email}>
              {PROFILE.email}
            </a>
            <div className="links-col">
              {PROFILE.socials.map((s) => (
                <a
                  className="btn sm white"
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="box contact-form">
            <Field id="name" label="Nama">
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
              />
            </Field>
            <Field id="email" label="Email">
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </Field>
            <Field id="message" label="Pesan">
              <textarea
                id="message"
                value={form.message}
                onChange={update("message")}
              />
            </Field>
            <div>
              <button className="btn pink" onClick={submit}>
                Kirim pesan
              </button>
            </div>
            {sent && (
              <div className="ok" role="status">
                Aplikasi email kamu akan terbuka dengan pesan yang sudah terisi.
                Tinggal tekan kirim.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}. Dibuat dengan React.
        </span>
        <a className="btn sm" href="#beranda">
          Kembali ke atas
        </a>
      </div>
    </footer>
  );
}

/* =====================================================================
   APP
   ===================================================================== */
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("beranda");
  const [progress, setProgress] = useState(0);
  const rootRef = useRef(null);

  // tandai bagian yang sedang dilihat
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // indikator progres scroll
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll halus
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="np" data-theme={dark ? "dark" : "light"} ref={rootRef}>
      <style>{CSS}</style>
      <div
        className="progress"
        style={{ width: progress + "%" }}
        aria-hidden="true"
      />
      <Navbar
        active={active}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
