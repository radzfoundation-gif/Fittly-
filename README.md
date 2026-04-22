# Fittly — Landing Pages

Koleksi landing page dan UI demo berbasis **Next.js 16**, **React 19**, dan **Tailwind CSS v4**. Project ini berisi tiga halaman utama dengan desain modern dan interaktif.

---

## Halaman

| Route | Nama | Deskripsi |
|---|---|---|
| `/` | Fittly Landing Page | Landing page produk AI virtual try-on fashion |
| `/cinematic` | AURA Cinematic Hero | Landing page dark-theme dengan background video |
| `/workspace` | Fittly Studio | Aplikasi workspace virtual try-on interaktif |

---

## Tech Stack

- **[Next.js 16.2.4](https://nextjs.org)** — App Router, Turbopack
- **[React 19](https://react.dev)** — dengan hooks terbaru
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first CSS
- **[@iconify/react](https://iconify.design)** — icon library (Solar icon set)
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** + **[drei](https://github.com/pmndrs/drei)** — 3D rendering
- **[Three.js](https://threejs.org)** — WebGL 3D engine
- **TypeScript** — type safety

---

## Memulai

### Prasyarat

- Node.js 20+
- npm / yarn / pnpm

### Instalasi

```bash
npm install
```

### Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Struktur Project

```
landing-pages/
├── public/
│   ├── bg-tropical.mp4       # Background video untuk workspace
│   ├── mascot.mp4            # Video mascot hero section
│   └── FinalBaseMesh.obj     # 3D model mannequin
├── src/
│   └── app/
│       ├── layout.tsx        # Root layout + Google Fonts
│       ├── page.tsx          # Fittly landing page (/)
│       ├── globals.css       # Global styles + Tailwind import
│       ├── cinematic/
│       │   └── page.tsx      # AURA cinematic page (/cinematic)
│       └── workspace/
│           └── page.tsx      # Fittly Studio (/workspace)
├── AGENTS.md                 # Aturan untuk AI agent
├── CLAUDE.md                 # Referensi ke AGENTS.md
├── docs/
│   ├── pages.md              # Dokumentasi setiap halaman
│   ├── workspace.md          # Panduan fitur workspace
│   └── components.md         # Referensi komponen & pola UI
├── next.config.ts
├── tailwind.config (via postcss.config.mjs)
└── tsconfig.json
```

---

## Dokumentasi

Lihat folder [`docs/`](./docs/) untuk dokumentasi lengkap:

- [`docs/pages.md`](./docs/pages.md) — Deskripsi dan fitur setiap halaman
- [`docs/workspace.md`](./docs/workspace.md) — Panduan lengkap fitur Fittly Studio
- [`docs/components.md`](./docs/components.md) — Referensi komponen dan pola UI yang digunakan

---

## Deploy

Deploy paling mudah menggunakan [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Atau platform lain yang mendukung Next.js (Netlify, Railway, dll).
