# Fittly Studio — Dokumentasi Workspace

Panduan lengkap fitur dan implementasi halaman `/workspace`.

---

## Overview

Fittly Studio adalah aplikasi workspace interaktif untuk virtual try-on fashion. User dapat memilih model (mannequin 3D atau foto sendiri), lalu generate try-on dengan AI prompt.

**File:** `src/app/workspace/page.tsx` (805 baris)

---

## Arsitektur

### State Management

| State | Tipe | Fungsi |
|---|---|---|
| `isSidebarOpen` | `boolean` | Kontrol sidebar visibility |
| `workspaceStep` | `'select-mode' \| 'take-selfie' \| 'prompt'` | Step flow utama |
| `selectedModelType` | `'mannequin' \| 'own' \| null` | Tipe model yang dipilih |
| `mannequinGender` | `'female' \| 'male'` | Gender mannequin (jika pilih mannequin) |
| `hasSelectedGender` | `boolean` | Apakah user sudah pilih gender (hide toggle) |
| `uploadedPhoto` | `string \| null` | Base64 data URL foto user |
| `photoMode` | `'idle' \| 'camera' \| 'preview'` | Mode di step take-selfie |
| `cameraError` | `string \| null` | Error message akses kamera |
| `isDraggingOver` | `boolean` | Drag & drop state |
| `showGarmentModal` | `boolean` | Modal upload garment |
| `isFullscreen` | `boolean` | Fullscreen preview modal |
| `toastMessage` | `string \| null` | Toast notification text |

### Refs

| Ref | Tipe | Fungsi |
|---|---|---|
| `video1Ref`, `video2Ref` | `HTMLVideoElement` | Background video crossfade |
| `cameraVideoRef` | `HTMLVideoElement` | Live camera preview |
| `cameraStreamRef` | `MediaStream` | Camera stream untuk cleanup |
| `fileInputRef` | `HTMLInputElement` | Hidden file input |

---

## Flow Utama

### Step 1: Select Mode

User memilih antara dua opsi:

1. **3D Mannequin** — menggunakan model default
   - Langsung ke step 3 (prompt)
   - Di step 3, user bisa pilih gender (female/male)
   - Male → render 3D interaktif via Three.js
   - Female → static image (Unsplash placeholder)

2. **My Own Model** — upload foto sendiri
   - Ke step 2 (take-selfie)
   - Setelah upload/capture → step 3 (prompt)

### Step 2: Take Selfie (hanya jika pilih "My Own Model")

Tiga mode dalam satu card:

#### Mode: Idle

- **Upload area** — drag & drop zone atau klik untuk file picker
- **Tombol "Open Camera"** — akses kamera device
- Validasi:
  - Hanya file image (`image/*`)
  - Max 15MB
- Privacy badge: "100% secure. Processed instantly and never stored or shared."

#### Mode: Camera

- Live preview dari `getUserMedia`
- Mirror effect (scale-x flip)
- Corner bracket guides
- Tombol:
  - **Cancel** → kembali ke idle
  - **Capture** → ambil screenshot dari video stream

#### Mode: Preview

- Tampilkan foto hasil capture/upload
- Tombol:
  - **Retake** → kembali ke idle
  - **Continue** → lanjut ke step 3

### Step 3: Prompt Studio

Layout dua kolom (desktop) atau stack (mobile):

#### Kolom Kiri: Prompt Area

- Badge "Fittly AI 2.0"
- Headline + subheadline
- **Prompt input box** (dark container dengan white textarea)
  - Credit counter: "25/100 AI Sessions"
  - Tombol "Upgrade Plan"
  - Textarea untuk prompt
  - Tombol submit (arrow up)
  - Tombol "Upload Garment" → buka modal
  - Tombol "Styles" (hidden di mobile)
  - Character counter: "0/3,000"

#### Kolom Kanan: Model Preview

- **Header card** — icon, nama model, status badge "Ready"
- **Preview frame** — menampilkan model aktif:
  - Mannequin female → static image
  - Mannequin male → 3D Canvas interaktif (OrbitControls, auto-rotate)
  - Own model → foto user (atau placeholder jika belum upload)
- **Gender toggle** (hanya mannequin, muncul sekali) — pilih female/male
- **Floating toolbar** (muncul on hover):
  - Download
  - Resolution
  - Settings
- **Scan line effect** — animasi overlay on hover
- **Tombol "Full Preview"** — buka fullscreen modal

---

## Fitur Khusus

### 1. Background Video Crossfade

Dua `<video>` element dengan logic custom:

- Video 1 mulai play, opacity 1, z-index 1
- Video 2 standby, opacity 0, z-index 0
- 1.5 detik sebelum video 1 selesai:
  - Video 2 mulai play di belakang (z-index 0, opacity 1)
  - Video 1 fade out (transition opacity 1.5s)
- Saat video 1 ended → pause, reset flag
- Cycle berulang

### 2. Camera Access

```typescript
const stream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
});
cameraVideoRef.current.srcObject = stream;
```

- Error handling → tampilkan `cameraError` message
- Cleanup on unmount → `stream.getTracks().forEach(t => t.stop())`

### 3. Photo Capture

```typescript
const canvas = document.createElement('canvas');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
canvas.getContext('2d')?.drawImage(video, 0, 0);
const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
setUploadedPhoto(dataUrl);
```

### 4. File Upload

- Drag & drop → `onDrop` handler
- Click → trigger hidden `<input type="file">`
- FileReader → convert ke base64 data URL
- Validasi tipe & ukuran

### 5. 3D Rendering (Male Mannequin)

```tsx
<Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 10], fov: 45 }}>
  <ambientLight intensity={0.7} />
  <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
  <Environment preset="city" />
  <group scale={0.35} position={[0, -3.6, 0]}>
    <MaleMannequin3D />
  </group>
  <ScreenshotCapturer />
  <OrbitControls autoRotate autoRotateSpeed={1.0} />
</Canvas>
```

- Load `.obj` file via `OBJLoader`
- Material: `MeshStandardMaterial` (clay-like)
- `preserveDrawingBuffer: true` → enable screenshot

### 6. Download

- **3D Canvas** → dispatch custom event `'capture-3d'`, `ScreenshotCapturer` component handle via `gl.domElement.toDataURL()`
- **2D Image** → jika base64 (uploaded photo) → direct download, jika URL → fetch blob → download

### 7. Toast Notification

- State `toastMessage` → tampilkan fixed bottom-center
- Auto-hide setelah 3 detik
- Animasi slide-in-from-bottom + fade-in

---

## Komponen Internal

### `MaleMannequin3D`

- Load `/FinalBaseMesh.obj` via `useLoader(OBJLoader, ...)`
- Clone object, traverse mesh, apply material
- Return `<primitive object={model} scale={1} />`

### `ScreenshotCapturer`

- Listen event `'capture-3d'`
- Render scene manual → `gl.render(scene, camera)`
- Export canvas → `gl.domElement.toDataURL('image/jpeg', 1.0)`
- Trigger download

---

## Modal

### Garment Upload Modal

- Trigger: tombol "Upload Garment" di prompt input
- Konten:
  - Upload area (drag & drop)
  - Divider "OR IMPORT"
  - Input URL produk + tombol "Import"
- Close: tombol X atau klik backdrop

### Fullscreen Preview Modal

- Trigger: tombol "Full Preview" di preview card
- Konten:
  - Header dengan judul + tombol close
  - Full-size preview (3D Canvas atau image)
  - Background: `bg-zinc-950`
- Close: tombol X

---

## Styling Patterns

### Glassmorphism

```css
bg-white/80 backdrop-blur-xl border border-white/50
```

### Rounded Corners

- Card besar: `rounded-[2rem]` atau `rounded-[2.5rem]`
- Button: `rounded-xl` atau `rounded-full`
- Input: `rounded-[14px]`

### Shadow

- Soft: `shadow-[0_8px_32px_rgba(0,0,0,0.08)]`
- Strong: `shadow-[0_20px_60px_rgba(0,0,0,0.15)]`

### Hover Effects

```css
hover:scale-105 active:scale-95 transition-all duration-300
```

### Font Families

- Headline: `font-['Fustat']`
- UI text: `font-['Schibsted_Grotesk']`
- Body: `font-['Noto_Sans']` (default)

---

## Responsiveness

- Sidebar: hidden di mobile (`hidden md:block`)
- Layout prompt: `flex-col lg:flex-row`
- Preview card: `w-full lg:w-[380px] xl:w-[420px]`
- Tombol: text size `text-xs lg:text-sm`
- Padding: `p-3 lg:p-4`

---

## Accessibility

- Semua button interaktif punya `title` attribute (toolbar)
- Form input punya `<label>` dengan `htmlFor`
- Video punya `muted` dan `playsInline` untuk autoplay
- Keyboard navigation: semua button accessible via Tab

---

## Performance

- `useMemo` untuk clone 3D model
- `useCallback` untuk semua handler function
- Lazy load 3D Canvas via `<Suspense>` dengan fallback loading
- Video preload: `preload="auto"` (implicit)
- Image lazy load: browser default

---

## Browser Support

- **Camera access:** Chrome, Firefox, Safari (iOS 14.3+), Edge
- **WebGL (3D):** semua modern browser
- **Drag & drop:** semua modern browser
- **FileReader API:** semua modern browser

---

## Known Limitations

- Female mannequin masih placeholder image (belum 3D)
- AI prompt belum connect ke backend (UI only)
- Garment upload modal belum functional (UI only)
- Download 3D screenshot kadang hitam jika canvas belum render (sudah ada `gl.render()` manual)
