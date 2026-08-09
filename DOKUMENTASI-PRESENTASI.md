# Portfolio — Rifqi Maulana

Dokumen penjelasan untuk presentasi proyek. Berisi gambaran umum, teknologi yang dipakai, struktur kode, fitur, dan proses pengembangan.

---

## 1. Gambaran Umum

Portfolio pribadi berisi halaman Home, Work (Karya), Services (Layanan), About Me (Tentang Saya), dan Contact (Kontak). Desainnya terinspirasi dari situs Roshan Sahu (`roshan-sahu.com`) untuk layout dan nuansa, serta `paulkalkbrenner.net` untuk bagian grid + teks besar "Invisible by design".

Fokus proyek:

- Animasi halus (smooth scroll, reveal saat scroll, transisi antar halaman).
- Performa tinggi (preloader singkat, gambar lokal teroptimasi, dan motion yang dapat dimatikan).
- SEO lengkap (sitemap, robots, metadata, JSON-LD).
- Responsif (mobile-first, breakpoint 1024px / 767px / 479px).

---

## 2. Bahasa Pemrograman & Framework

| Lapisan | Teknologi | Versi |
|---------|-----------|-------|
| Bahasa | TypeScript | ^5 |
| Frontend UI | React | 19.2.4 |
| Framework | Next.js (App Router) | 16.2.12 |
| Styling | CSS murni (global CSS) + Tailwind CSS 4 | 4 |
| Animasi | GSAP + ScrollTrigger + SplitText | 3.15.0 |
| Smooth Scroll | Lenis | 1.3.25 |
| Linter | ESLint (eslint-config-next) | ^9 |
| Build/Pack | Next.js Turbopack | 16.2.12 |

> Catatan: Tailwind dipakai sebagai pembantu kecil untuk utility layout, sedangkan mayoritas styling menggunakan CSS global di `src/app/globals.css`.

---

## 3. Alur Routing & Struktur Halaman

App Router Next.js — setiap folder di `src/app` menjadi satu rute aplikasi:

| Route | File | Isi |
|-------|------|-----|
| `/` | `src/app/page.tsx` | Hero, Manifesto, SelectedWork, Stack, Playground, AboutMe, Services, Footer |
| `/work` | `src/app/work/page.tsx` | Daftar karya + WorkModal |
| `/services` | `src/app/services/page.tsx` | Layanan + FAQ |
| `/about-me` | `src/app/about-me/page.tsx` | Profil |
| `/contact` | `src/app/contact/page.tsx` | Form kontak 3 langkah |
| `/sitemap.xml` | `src/app/sitemap.ts` | SEO |
| `/robots.txt` | `src/app/robots.ts` | SEO |

Transisi antar halaman ditangani oleh `RouteTransition` dengan panel gelap + label nama halaman (`[ Work ]`, `[ Home ]`, dst).

---

## 4. Struktur Folder

```
src/
├── app/                  # Routing (App Router) + globals.css
│   ├── page.tsx          # Home
│   ├── work/ services/ about-me/ contact/
│   ├── layout.tsx        # Root layout: SmoothScroll + RouteTransition + Navbar + Footer
│   ├── sitemap.ts        # SEO
│   └── robots.ts         # SEO
├── components/
│   ├── layout/           # Navbar, Footer, RouteTransition, SmoothScroll
│   ├── hero/             # Hero, Manifesto, StackSection
│   ├── work/             # SelectedWork, WorkModal, WorkCard, Playground, dll
│   ├── services/         # ServiceListSection, FaqSection
│   ├── about/            # AboutMe, AboutPage
│   └── contact/          # ContactPage (form 3 langkah)
├── hooks/
│   └── useLenis.ts       # Instance Lenis global + scrollToTarget
├── lib/
│   ├── gsap.ts           # Registrasi GSAP plugin (ScrollTrigger, SplitText)
│   ├── navigation.ts     # navigateTo, hash routing, ROUTE_NAMES
│   ├── constants.ts      # Brand identity, link footer
│   ├── projects.ts       # Data karya
│   ├── services.ts       # Data layanan
│   ├── playground.ts     # Data playground
│   ├── pages.ts          # Data per halaman (FAQ, dll)
│   ├── site.ts           # SITE_URL + deskripsi
│   └── motion.ts         # Preferensi reduced motion
```

---

## 5. Fitur & Teknis Detail

### 5.1 Smooth Scroll (Lenis)
- `src/hooks/useLenis.ts` membuat satu instance Lenis global (`duration 1.2`, `easing` eksponensial).
- Dihubungkan ke `ScrollTrigger.update` agar animasi GSAP sinkron dengan smooth scroll.
- `scrollToTarget()` adalah helper untuk scroll ke elemen/section.

### 5.2 Transisi Antar Halaman (RouteTransition)
Alur saat user mengklik menu:
1. `navigateTo(href)` (di `lib/navigation.ts`) membandingkan path tujuan dengan path saat ini.
   - Path sama + ada hash → scroll ke section (event `route:scroll`).
   - Path sama tanpa hash → scroll ke atas.
   - Path beda → dispatch event `route:navigate`.
2. `RouteTransition.playIn` menampilkan panel, **stop Lenis**, lalu `router.push(href)`.
3. Saat `pathname` berubah, efek di `RouteTransition` **start Lenis kembali**, reset scroll ke atas (atau ke hash tujuan), lalu `ScrollTrigger.refresh()` dan panel keluar.

> Perbaikan penting (commit terakhir): `lenis.start()` kini dipanggil langsung di efek `pathname`, bukan menunggu `onComplete` animasi panel keluar. Ini memperbaiki bug **scroll macet yang kadang butuh refresh** — karena Lenis v1.3.25 mengabaikan `scrollTo` selama status `isStopped`.

### 5.3 Navbar
- Logo RM → selalu menuju Home dengan transisi.
- Drawer menu animasi; menutup drawer saat navigasi.
- Drawer menu menjaga fokus keyboard, mengunci scroll, dan mendukung tombol Escape.

### 5.4 Homepage
- Hero editorial dengan reveal teks dan portrait yang diprioritaskan untuk first paint.
- Manifesto memakai ScrollTrigger untuk menuntun fokus membaca saat scroll.
- Selected Work memakai layout sticky di desktop dan daftar linear di mobile.
- Stack dan Playground memakai marquee/reveal yang berhenti ketika reduced motion aktif.

### 5.5 Karya (Work) & WorkModal
- Daftar karya horizontal dengan scrollbar tipis yang dapat diseret dan dikontrol dengan keyboard.
- Klik karya → WorkModal: gambar berganti tiap 2 detik, Lenis di-stop saat modal terbuka dan di-start lagi saat tertutup, scroll body di-lock.
- Navigasi prev/next antar karya, tombol close.

### 5.6 Form Kontak (3 Langkah)
1. **Langkah 1**: Nama, Email, Nama Perusahaan (opsional).
2. **Langkah 2**: Pesan + pilihan budget (multi-pilih).
3. **Langkah 3**: Pesan sukses setelah `mailto:` dibuka, dengan tautan untuk membuka draft kembali.
- Validasi email, tombol back/next, input tanpa garis kecuali saat fokus.

### 5.7 SEO
- Metadata + Open Graph + Twitter Card di layout dan setiap halaman.
- JSON-LD `Person` schema.
- `sitemap.ts` dan `robots.ts` di-generate otomatis.
- Semua halaman aman diprerender oleh Next.js saat build.

---

## 6. Perintah yang Berguna

```bash
pnpm dev           # Development server
pnpm build         # Production build (Turbopack + TypeScript check)
pnpm start         # Jalankan hasil build
pnpm lint          # ESLint
```

---

## 7. Catatan Proses Pengembangan

- Website mula-mula dibuat sebagai clone satu halaman dari Roshan Sahu, lalu di-refactor menjadi multi-page (commit `882b798`).
- Placeholder diganti dengan karya foto restorasi asli (commit `28d3a05`).
- Audit SEO lengkap + perbaikan stabilitas animasi (commit `c1f373f`).
- Implementasi terbaru memakai preloader intro singkat yang menahan animasi section sampai siap, menghormati `prefers-reduced-motion`, memperbaiki semantik form/drawer/modal, dan membersihkan komponen lama yang sudah tidak dipakai.

---

## 8. Jawaban Siap untuk Pertanyaan "Kenapa Meniru Roshan Sahu?"

Pertanyaan ini mungkin muncul saat presentasi. Siapkan konteks berikut:

1. **Ini adalah latihan recreation/study, bukan klaim desain orisinal.** Tujuan utamanya mempelajari teknik animasi kelas atas — GSAP ScrollTrigger, smooth scroll Lenis, layout grid yang kompleks — dengan meniru situs yang sudah terbukti bagus.
2. **Konten 100% milik sendiri.** Konten, data proyek, teks, dan foto semua milik pribadi; yang ditiru hanya pola layout dan feel animasinya.
3. **Ada elemen yang memang beda.** Transisi antar halaman, form kontak 3 langkah, halaman layanan/FAQ, dan SEO di-generate sendiri — tidak ada di sumbernya.
4. **Menghargai sumber.** Sebaiknya sebutkan di catatan proyek/README bahwa desain terinspirasi dari `roshan-sahu.com` dan `paulkalkbrenner.net` sebagai tanda penghargaan.
5. **Pembeda untuk masa depan.** Jika ingin tampil lebih orisinal, langkah berikutnya adalah mengembangkan bahasa visual sendiri di atas fondasi teknis ini.
