# Referensi Komponen & Pola UI

Panduan komponen dan pola desain yang digunakan di seluruh project.

---

## Pola Desain Global

### Glassmorphism Card

Digunakan di navbar, sidebar, modal, dan card utama.

```tsx
<div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
  {/* content */}
</div>
```

### Floating Navbar

```tsx
<header className="relative z-40 w-full pt-8 px-6 flex justify-center">
  <div className="flex items-center justify-between w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-zinc-200/80 rounded-[2rem] px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
    {/* logo | nav links | actions */}
  </div>
</header>
```

### Eyebrow Badge

```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-medium text-zinc-600 shadow-sm">
  <Icon icon="solar:star-fall-bold" className="text-blue-500" />
  <span>Badge text</span>
</div>
```

### Step Badge

```tsx
<div className="flex items-center gap-2 p-1 pr-4 bg-white/80 border border-white rounded-full shadow-sm backdrop-blur-md">
  <div className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium text-xs">
    <Icon icon="solar:stars-minimalistic-bold" width="16" height="16" />
    Step 1
  </div>
  <span className="font-medium text-sm text-zinc-700">Label text</span>
</div>
```

---

## Komponen UI

### Toast Notification

```tsx
{toastMessage && (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-zinc-900 text-white px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-3 animate-in slide-in-from-bottom-10 fade-in duration-300">
    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
    <span className="font-semibold text-sm tracking-wide">{toastMessage}</span>
  </div>
)}
```

**Usage:**
```typescript
const showToast = (msg: string) => {
  setToastMessage(msg);
  setTimeout(() => setToastMessage(null), 3000);
};
```

### Status Badge (Ready / Live)

```tsx
{/* Green dot + text */}
<div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
  Ready
</div>
```

### Modal Overlay

```tsx
<div
  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm"
  onClick={closeModal}
>
  <div
    className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-300"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close button */}
    <button
      onClick={closeModal}
      className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-all"
    >
      <Icon icon="solar:close-circle-linear" width="20" height="20" />
    </button>
    {/* content */}
  </div>
</div>
```

### Drag & Drop Upload Zone

```tsx
<div
  className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all p-8 ${
    isDraggingOver
      ? 'border-purple-500 bg-purple-50'
      : 'border-zinc-300 hover:border-purple-400 bg-zinc-50/50'
  }`}
  onClick={() => fileInputRef.current?.click()}
  onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
  onDragLeave={() => setIsDraggingOver(false)}
  onDrop={handleDrop}
>
  <Icon icon="solar:upload-minimalistic-bold-duotone" className="text-2xl text-purple-500 mb-3" />
  <span className="font-bold text-zinc-700 text-sm">Click or drag photo here</span>
  <span className="text-xs text-zinc-400 mt-1">JPG, PNG, WEBP — max 15MB</span>
  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={...} />
</div>
```

### Privacy Badge

```tsx
<div className="w-full bg-emerald-50 border border-emerald-100/50 rounded-xl p-3 flex items-center justify-center gap-2 shadow-sm">
  <Icon icon="solar:shield-check-bold-duotone" className="text-xl text-emerald-500 shrink-0" />
  <p className="text-xs text-emerald-800 font-medium">
    100% secure. Processed instantly and never stored or shared.
  </p>
</div>
```

### Pricing Card

```tsx
{/* Featured card (Growth) */}
<div className="relative flex flex-col p-6 bg-white rounded-3xl border border-blue-500/30 shadow-[0_8px_30px_rgba(59,130,246,0.15)] transform md:-translate-y-4">
  <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent rounded-3xl pointer-events-none"></div>
  {/* badge "Most popular" */}
  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
    <Icon icon="solar:stars-minimalistic-bold" /> Most popular
  </span>
  {/* price */}
  <span className="text-4xl font-bold text-zinc-900 tracking-tight">Rp 799k</span>
  {/* feature list */}
  <li className="flex items-start gap-3 text-zinc-700 text-sm">
    <Icon icon="solar:check-circle-bold" className="text-blue-500 mt-0.5 text-lg shrink-0" />
    <span>Feature text</span>
  </li>
</div>
```

---

## Button Variants

### Primary (Dark)

```tsx
<button className="px-7 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md">
  Label
</button>
```

### Primary (Blue)

```tsx
<button className="px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)]">
  Label
</button>
```

### Secondary (Ghost)

```tsx
<button className="px-7 py-3.5 rounded-full bg-white border border-zinc-200 text-zinc-800 text-sm font-medium hover:bg-zinc-50 transition-all duration-300 shadow-sm">
  Label
</button>
```

### Icon Button (Toolbar)

```tsx
<button className="w-10 h-10 bg-white/70 hover:bg-white backdrop-blur-xl rounded-[14px] flex items-center justify-center text-zinc-700 hover:text-blue-600 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-white/50 transition-all hover:scale-110 active:scale-95">
  <Icon icon="solar:download-minimalistic-bold-duotone" className="text-xl" />
</button>
```

### Sidebar Nav Item (Active)

```tsx
<Link href="#" className="flex items-center px-4 py-3.5 bg-blue-600 text-white rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] hover:-translate-y-0.5">
  <Icon icon="solar:magic-stick-3-bold-duotone" className="text-2xl shrink-0" />
  <span className="ml-3 font-semibold">Label</span>
</Link>
```

### Sidebar Nav Item (Inactive)

```tsx
<Link href="#" className="flex items-center px-4 py-3.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-2xl transition-all group">
  <Icon icon="solar:gallery-bold-duotone" className="text-2xl shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />
  <span className="ml-3">Label</span>
</Link>
```

---

## Background Patterns

### Grid + Radial Gradient (Landing Page)

```tsx
<div
  className="absolute inset-0 z-0 pointer-events-none"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
      radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
      radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
    `,
    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
  }}
/>
```

### Blurred Video Background (Workspace)

```tsx
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[115%] h-[115%] z-0 pointer-events-none overflow-hidden">
  <video muted playsInline className="absolute w-full h-full object-cover object-top blur-[8px] scale-105">
    <source src="/bg-tropical.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
</div>
```

### Cinematic Video Overlay (Cinematic Page)

```tsx
{/* Multiply blend */}
<div className="absolute inset-0 z-10 bg-black/30 mix-blend-multiply"></div>
{/* Vertical gradient */}
<div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-black/60"></div>
{/* Radial vignette */}
<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/80"></div>
```

---

## Animasi

### Float (Mascot)

```css
@keyframes floatMascot {
  0%   { transform: translateY(0px) rotate(0deg); }
  50%  { transform: translateY(-15px) rotate(1.5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}
```

```tsx
<div style={{ animation: 'floatMascot 6s ease-in-out infinite' }}>
  {/* mascot */}
</div>
```

### Scan Line

```css
@keyframes scan {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}
```

```tsx
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent h-[10%] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
```

### Tailwind Animate-In

```tsx
{/* Fade + zoom */}
<div className="animate-in fade-in zoom-in-95 duration-300">

{/* Slide from bottom */}
<div className="animate-in slide-in-from-bottom-4 duration-500">

{/* Slide from top */}
<div className="animate-in slide-in-from-top-4 duration-300">
```

---

## Icon Library

Project menggunakan **Solar** icon set dari `@iconify/react`.

```tsx
import { Icon } from '@iconify/react';

<Icon icon="solar:camera-bold-duotone" className="text-2xl" />
<Icon icon="solar:arrow-right-linear" width="20" height="20" />
```

### Icon yang Sering Digunakan

| Icon | Konteks |
|---|---|
| `solar:magic-stick-3-bold-duotone` | New Try-On / AI |
| `solar:camera-minimalistic-bold-duotone` | Foto / kamera |
| `solar:hanger-bold-duotone` | Garment / pakaian |
| `solar:accessibility-bold-duotone` | Mannequin |
| `solar:user-focus-bold-duotone` | Own model |
| `solar:stars-minimalistic-bold` | AI / premium |
| `solar:check-circle-bold` | Checklist / success |
| `solar:shield-check-bold-duotone` | Privacy / security |
| `solar:arrow-right-linear` | CTA / navigasi |
| `solar:close-circle-bold-duotone` | Close modal |
| `solar:download-minimalistic-bold-duotone` | Download |
| `solar:full-screen-bold-duotone` | Fullscreen |

---

## Typography

### Font Variables (layout.tsx)

```typescript
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const fustat = Fustat({ variable: "--font-fustat", subsets: ["latin"] });
const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"] });
const schibstedGrotesk = Schibsted_Grotesk({ variable: "--font-schibsted-grotesk", subsets: ["latin"] });
```

### Penggunaan

| Font | Digunakan untuk |
|---|---|
| `font-['Fustat']` | Headline besar, judul halaman |
| `font-['Schibsted_Grotesk']` | UI text, sidebar, label, badge |
| `font-['Inter']` | Badge step, teks kecil |
| `font-['Noto_Sans']` | Body text default (workspace) |

---

## Z-Index Layers

| Layer | Z-Index | Elemen |
|---|---|---|
| Background | `z-0` | Video background |
| Content | `z-10` | Main content wrapper |
| Sidebar | `z-20` | Sidebar |
| Floating button | `z-50` | Toggle sidebar button |
| Modal | `z-[100]` | Garment modal |
| Fullscreen | `z-[200]` | Fullscreen preview |
| Toast | `z-[300]` | Toast notification |
