# Dokumentasi Halaman

Deskripsi lengkap setiap halaman dalam project ini.

---

## 1. Fittly Landing Page — `/`

**File:** `src/app/page.tsx`

Landing page utama untuk produk **Fittly**, sebuah platform AI virtual try-on fashion untuk pasar Asia Tenggara.

### Fitur

- **Navbar floating** — glassmorphism navbar dengan backdrop blur, responsif mobile/desktop
- **Hero section** — headline besar, subheadline, dua CTA button, dan video mascot animasi float
- **Background** — grid pattern + dual radial gradient (purple & blue)
- **Modal system** — satu sistem modal yang menampilkan konten berbeda berdasarkan tombol yang diklik:
  - **Features** — 4 kartu fitur produk (Virtual Try-On Engine, Size Recommendation, Seamless Integration, Merchant Analytics)
  - **How It Works** — timeline 4 langkah dengan numbered steps
  - **Merchants** — statistik bisnis (return rate, conversion lift)
  - **Pricing** — 3 tier harga (Starter, Growth, Scale) dengan toggle monthly/annual
  - **Sign In** — form login email + password
  - **Become a Merchant** — form registrasi merchant
- **Footer** — status AI engine + social links

### State

| State | Tipe | Fungsi |
|---|---|---|
| `activeModal` | `string \| null` | Mengontrol modal mana yang terbuka |
| `billingCycle` | `'monthly' \| 'annual'` | Toggle harga di modal Pricing |

### Navigasi

- Tombol "Try Virtual Try-On" → `/workspace`
- Semua link nav membuka modal (bukan navigasi halaman)

---

## 2. AURA Cinematic Hero — `/cinematic`

**File:** `src/app/cinematic/page.tsx`

Landing page dark-theme cinematic untuk produk fiktif **AURA**, sebuah platform volumetric rendering.

### Fitur

- **Background video** — video dari Cloudinary, autoplay loop muted
- **Cinematic overlays** — 3 layer overlay (multiply blend, gradient vertikal, radial vignette)
- **Navbar minimal** — logo teks, nav links, tombol Get Started
- **Hero content** — eyebrow badge, headline gradient transparan, subheadline, 2 CTA button
- **Footer minimal** — status operasional + social links

### Karakteristik Desain

- Warna: hitam dominan, teks putih dengan opacity bertingkat
- Font: tracking-tighter, font-medium
- Tidak ada interaktivitas (semua link `href="#"`)
- Tidak menggunakan `'use client'` — Server Component

---

## 3. Fittly Studio — `/workspace`

**File:** `src/app/workspace/page.tsx`

Aplikasi workspace interaktif untuk virtual try-on. Halaman paling kompleks dalam project.

Lihat [`docs/workspace.md`](./workspace.md) untuk dokumentasi lengkap.

### Ringkasan Fitur

- Sidebar collapsible dengan animasi smooth
- Background video crossfade (dua video element bergantian)
- Flow 3 langkah: pilih model → upload/ambil foto → studio prompt
- Rendering 3D mannequin via Three.js
- Upload foto & akses kamera device
- Download hasil (2D image atau 3D canvas screenshot)
- Toast notification system
- Fullscreen preview modal
- Garment upload modal
