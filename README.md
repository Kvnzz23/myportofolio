# Portofolio Kevin Herlambang

Portofolio bergaya NeoBrutalism, dibuat dengan React + Vite.

## Menjalankan

```bash
npm install
npm run dev      # buka alamat yang muncul, biasanya http://localhost:5173
npm run build    # hasil build ada di folder dist/
npm run preview  # coba hasil build secara lokal
```

## Mengubah isi

Semua konten ada di bagian atas `src/Portfolio.jsx`:

- `PROFILE`: nama, intro, email, link sosial media, statistik
- `SKILLS`: keahlian (grup `bars` memakai progress bar, ubah `level` 0-100)
- `PROJECTS`: daftar proyek (format contoh ada di komentar)
- `EXPERIENCE`: pendidikan dan pelatihan
- `CERTIFICATES`: sertifikat

## Menambah sertifikat

1. Simpan gambar di `public/sertifikat/`, misalnya `public/sertifikat/sanbercode-react.jpg`.
2. Isi `image: "/sertifikat/sanbercode-react.jpg"` pada entri sertifikat.

## Deploy

Folder `dist/` hasil `npm run build` bisa diunggah ke Vercel, Netlify, atau GitHub Pages.
