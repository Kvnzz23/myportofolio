import { useState, useEffect, useMemo, useRef } from "react";
import './styles/portofolio.css'

const PROFILE = {
  name: "Kevin Herlambang",
  photo: "/foto/kevin.jpg",
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
    { label: "GitHub", href: "https://github.com/Kvnzz23" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kevin-herlambang-a4b49a28a/" },
    { label: "Instagram", href: "https://www.instagram.com/_kevinherlambang/" },
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
  "React JS",
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

/* Format proyek:
   {
     id: 1,
     title: "Nama Proyek",
     category: "Mobile",            // Web / Mobile / UI/UX
     color: "var(--yellow)",
     image: "/proyek/nama.png",
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
    category: "Web",
    color: "var(--yellow)",
    image: "/proyek/worklify.png",
    short:
      "Worklify adalah platform pencarian kerja dan manajemen karir modern yang menghubungkan para profesional dengan berbagai peluang kerja terbaik secara cepat, efisien, dan terintegrasi.",
    long: "Worklify adalah platform manajemen kerja dan produktivitas serbaguna yang dirancang untuk membantu individu maupun tim mengelola proyek, menyederhanakan alur kerja (workflow), serta memantau progres tugas secara real-time.\nDengan antarmuka yang bersih, intuitif, dan responsif, Worklify memangkas kompleksitas koordinasi pekerjaan sehingga pengguna dapat berfokus pada hal yang paling penting: menyelesaikan pekerjaan dengan lebih efisien.",
    tags: ["React", "JavaScript"],
    demo: "https://worklify01.vercel.app/",
    repo: "https://github.com/Kvnzz23/worklify",
  },
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
      period: "2022-2025",
      desc: "Belajar dasar pemrograman dan pengembangan aplikasi di jurusan RPL.",
    },
  ],
  "Pelatihan & Program": [
    {
      title: "Pelatihan Web & Mobile Developer Intermediate",
      place: "Universitas Gadjah Mada (UGM)",
      period: "3 Oktober - 21 November 2023",
      desc: "Program dari sekolah. Belajar membangun aplikasi web dan mobile.",
    },
    {
      title: "Pelatihan Web & Mobile Developer Advance",
      place: "Universitas Gadjah Mada (UGM)",
      period: "11 Januari - 7 Maret 2024",
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
  {
    id: 5,
    title: "HCIA-Datacom V2.0 Course",
    issuer: "Huawei",
    year: "2026",
    image: "/sertifikat/sertif_huawei.png",
    link: "https://drive.google.com/file/d/10qFgM1XykwYMNQa5v3JDg8Qsm8UV021Z/view?usp=drive_link",
    color: "var(--orange)",
  },
];


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
  const [photoBroken, setPhotoBroken] = useState(false);
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
          <div className="avatar">
            {PROFILE.photo && !photoBroken ? (
              <img
                src={PROFILE.photo}
                alt={"Foto " + PROFILE.name}
                onError={() => setPhotoBroken(true)}
              />
            ) : (
              <span aria-hidden="true">{initials}</span>
            )}
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

function ProjectThumb({ p }) {
  const [broken, setBroken] = useState(false);

  if (p.image && !broken) {
    return (
      <img
        className="proj-img"
        src={p.image}
        alt={"Tampilan proyek " + p.title}
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <div className="proj-thumb" style={{ background: p.color }}>
      {p.title}
    </div>
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
        <ProjectThumb p={project} />
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
            <a
              className="btn"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Buka demo
            </a>
            <a
              className="btn white"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
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
                  <ProjectThumb p={p} />
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
          {cert.link && (
            <div className="modal-actions">
              <a
                className="btn white"
                href={cert.link}
                target="_blank"
                rel="noreferrer"
              >
                Verifikasi sertifikat
              </a>
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

function Field({ id, label, error, children }) {
  return (
    <div className={"field" + (error ? " err" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <div className="err-msg" role="alert">
          {error}
        </div>
      )}
    </div>
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
    if (!form.name.trim()) er.name = "Isi nama kamu.";
    if (!form.email.trim()) er.email = "Isi alamat email kamu.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = "Format email belum benar, contoh: nama@email.com.";
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
            <Field id="name" label="Nama" error={errors.name}>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </Field>
            <Field id="message" label="Pesan" error={errors.message}>
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
          © {new Date().getFullYear()} {PROFILE.name}.
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
