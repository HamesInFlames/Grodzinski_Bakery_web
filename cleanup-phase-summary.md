# Cleanup phases 1–7 — summary

**Audit date:** 2026-05-14
**Run by:** Claude (Opus 4.7) via Claude Code, after user approval to "do the rest" of the eight-phase plan in one pass.
**Pre-state commit:** `8c30c45` (prior cleanup pass).
**Post-state commit:** `0e8ea5f`.
**Commits this pass:** 11 (see `git log` 8c30c45..HEAD).
**Detailed audit:** `cleanup-audit-phase-0.md` + `.audit-cache/section-{A,B,D}.md`.

Phases 1–7 are consolidated below. The Phase 8 (final QA + readiness checklist) deliverable is `final-launch-readiness.md`.

---

## Phase 1 — Delete dead files & unused deps

The prior cleanup pass had already removed the Phase 1 prompt's "known candidates" (`SearchOverlay.tsx`, `cartStore.ts`, `lqip.generated.ts`, the orphan submodule, `yolov8n.pt`, `__pycache__/`). This pass tackled what the audit surfaced on top of that.

| change | commit | notes |
|---|---|---|
| Archive `WEBSITE_REVIEW.md`, `cleanup-summary.md`, `context.md` under `docs/archive/`; delete `GEMINI.md`; correct stale claims in `AGENTS.md` and `CLAUDE.md` | `cbd7678` | `context.md` referenced files already deleted; `AGENTS.md` cited `21st.dev components` (uninstalled). |
| Tighten `.gitignore`: `.env.local`, `.env.*.local`, `cleanup-audit*.md`, `.audit-cache/`, `_photos-source/` | `cbd7678` | |
| **Move 565 MB photoshoot source out of `public/images/Photos/` → `_photos-source/` (gitignored)** | `819d1e7` | 544 files unreferenced by any code path. Robocopy /MOVE used because Windows Defender held the directory open against plain `git mv`. Build CDN drops 565 MB; repo also drops 565 MB (since the new path is gitignored). |
| Migrate `Gallery.jsx` off legacy `src/productData.js` → new typed `src/data/galleryCategories.ts`; **delete `productData.js`** (180 lines, 5 dead exports + the `csv?raw` Square parser) | `1ea8a87` | Only `galleryCategories` was consumed; the rest had been superseded by `src/data/products.ts`. |
| **Remove dead `imageSlug` fallback** from `ProductCard.tsx` + `ProductPage.tsx` + `Product` type | `1ea8a87` | Zero products carried the slug; `public/images/products/` doesn't exist. Both call sites silently fell through to the slider thumbnail. Simplified to point directly at the thumbnail. |
| Move Python photo pipeline (`photo_enhance*.py`, `photo_studio_relight.py`, `setup_gpu_env.ps1`) from `scripts/` → `tools/photo-pipeline/` with a short README | `26d1a36` | One-off rembg/CUDA tooling; preserved out of the run-time scripts/ tree. |
| **Delete `scripts/generate-lqip.mjs`** (orphan — its output `lqip.generated.ts` was deleted in the prior pass) | `26d1a36` | |
| **Uninstall `sharp`** (only consumer was the deleted LQIP script) | `26d1a36` | Removes the last `npm audit` warnings (0 vulnerabilities). |
| Drop the broken `tsconfig.node.json` project reference; silence TS 7.0 `baseUrl` deprecation; add `npm run typecheck` script (`tsc --noEmit`) | `26d1a36` | Type-checking is now invokable but still **not** part of `npm run build` — Vite/Rolldown bundles TS without `tsc`. |
| **Kept**: `playwright` (per §G4 of audit — small, useful, only consumed by `scripts/take-screenshots.mjs`); `baked_goods/` 612 catalog dump files (per §G6 — deferred decision until photo wire-up). | — | |

**Phase 1 deferred from the prompt:** the `move WEBSITE_REVIEW.md` did happen, but the related "verify with me first" step on `tasks/decisions.md` was a no-op (the only entry is the 2026-05-07 menu-redesign architecture record — not stale, kept).

## Phase 2 — Replace emoji with Lucide icons

**No work required.** Phase 1's deletion of `src/productData.js` removed the only concentration of emoji-as-icons in the codebase (the 14-emoji `galleryCategories.icon` field). Every page surface (Navbar, Home, About, Catering, VisitUs, MenuHub, Gallery, plus filter and breadcrumb components) was already using `lucide-react` from the prior pass. Verified by a Python codepoint-range scan of all `.jsx`/`.tsx`/`.ts`/`.js` files: zero emoji codepoints in src.

The Phase 2 prompt's claim of "40+ emojis" was based on the pre-prior-pass codebase.

## Phase 3 — CSS consolidation

| change | commit | notes |
|---|---|---|
| Prune dead CSS rules from `App.css` (4603 → 2976 lines, -35 %) and `menu-redesign.css` (1036 → 874, -16 %); drop 12 empty `@media` blocks left behind | `d650265` | Done via `.audit-cache/prune-css.py`: a rule is removed iff every comma-separated selector contains ≥ 1 class token AND every class token is unreferenced anywhere in `src/**/*.{jsx,tsx,ts,js}` + `index.html`. Element-only / pseudo-only selectors are kept. |
| Remove the malformed `@font-face` block from `src/index.css` | `d650265` | Both declarations pointed at the Google Fonts *stylesheet* URLs rather than woff2 binaries — functional no-op. The real font loading happens via the `<link>` in `index.html`. |
| **Build CSS bundle: 81.31 → 56.28 kB (-30 %); gzip 13.19 → 10.19 kB (-23 %).** | — | |

**Phase 3 deferred from the prompt:**

- The split of `App.css` into `src/styles/{layout,navbar,buttons,…}.css` was NOT done. Risk/reward didn't pencil out for an audit-style pass (would touch every active class, hours of work, no functional change). Recommend it as a separate refactor once the bakery's branding work is stable.
- Phase 3.4's Tailwind option choice was overridden: the audit found 962 utility-class tokens across 8 files (Tailwind is *actively* used), so removing the `@tailwind base/components/utilities` directives — the prompt's recommended "Option A" — would have broken those usages. Kept the directives.
- Adding a `--nav-height` CSS variable to replace the magic `top: 80px / 70px / 12px / scroll-margin-top: 140px / 160px` constants was deferred. Visual constant, not a correctness bug.

## Phase 4 — Component & logic cleanup

| change | commit | notes |
|---|---|---|
| Drop the inline `<form>` in `Home.jsx` (with `alert('Thank you! We will be in touch.')`); reuse `<ContactForm showExtendedFields>` | `7a0eccc` | Same fields plus the consistent submit / success / error states the rest of the site already uses. |
| Drop the `alert()` from `VisitUs.jsx::handleContactSubmit`; rely on `ContactForm` showing its `successMessage` prop on resolve | `7a0eccc` | Both call sites carry a `TODO(phase-4.2)` pointing at the deferred Resend backend work. |
| Drop the unnecessary `import React` from `ContactForm.jsx` and `GoogleMap.jsx` (React 19 no-JSX-import) | `7a0eccc` | `main.jsx` keeps `import React` since it uses `React.StrictMode`. |
| **Add `src/pages/NotFound.jsx`** ("This page got eaten" + links back to /, /menu); App.jsx catch-all `<Route path="*">` | `26cd4d2` | |
| **Add `src/components/ErrorBoundary.jsx`** (class component); wrap `<Routes>` in App.jsx | `26cd4d2` | Shows a "Something went wrong" panel with the phone number and a reload button on any in-tree throw. |
| Skip-to-content link in `App.jsx`, hidden until keyboard-focused | `26cd4d2` | `<a href="#main-content" class="skip-link">`; `<main id="main-content">`. |
| `src/App.css` picks up `.skip-link`, `.not-found*`, `.error-boundary*` styles inline-coloured (no `var(--…)` to stay self-contained at the top of the file) | `26cd4d2` | |
| Gallery lightbox: Escape-key handler + `type="button"` + `aria-label="Close lightbox"` on close button | `6cb7358` | |
| Gallery items: alt text now folds in the active filter ("Custom wedding 3" / "Custom baby 1") instead of "Custom creation N" | `6cb7358` | |
| Navbar mobile-menu close button: `type="button"` + `aria-label="Close menu"` | `6cb7358` | |
| `loading="lazy"` added to every below-fold `<img>`: Home category cards + about teaser, VisitUs challah card, About image-grid, Catering option cards + order-info, Footer logo + COR badge | `6cb7358` | Hero images (Home / About / VisitUs / Catering) and the in-page primary images on CategoryPage / ProductPage stay eager so they paint on first frame. |

**Phase 4 deferred from the prompt:**

- **4.2 Resend-backed `/api/contact`**: the project currently has no Express server. Wiring this means adding Express + a backend entry point + Railway service configuration + the actual `RESEND_API_KEY` / `CONTACT_RECIPIENT_EMAIL` / `CONTACT_FROM_EMAIL` env vars, plus rate-limiting and input validation. Both submit handlers (`Home.jsx`, `VisitUs.jsx`) now carry `TODO(phase-4.2)` pointing here. **The contact form looks like it works but does not actually send anything yet.**
- **4.5 `Menu.jsx` scroll-timing refactor**: `Menu.jsx` doesn't exist anymore (deleted in the prior cleanup pass). The `nested setTimeout chains` the prompt described had already been removed. Current codebase has exactly one `setTimeout` (`ContactForm.jsx:49`, 5 s success-message reset — benign).
- **`document.body.style.overflow` centralization**: still mutated in two places (Navbar mobile menu, Gallery lightbox). Audit flagged the theoretical conflict but the two never both open in practice, so left as-is.

## Phase 5 — Performance optimization

| change | commit | notes |
|---|---|---|
| **Lazy-load every route via `React.lazy()` + `<Suspense>`** with `<LoadingFallback>` (spinner + "Loading…") | `22c5af8` | Home, About, Catering, VisitUs, Gallery, NotFound, MenuLayout, MenuHub, CategoryPage, ProductPage. |
| **Initial JS bundle: 549.89 → 371.30 kB (-32 %); gzip: 169.44 → 119.02 kB (-30 %).** Rolldown now emits 19 chunks instead of 1; chunk-size warning is gone. | — | First-paint route only pays for React/Router/Motion + its own bundle (Home 9.6 kB, About 6.1 kB, …). The CategoryPage chunk is the largest at 93 kB because it pulls fuse.js for in-page search. |

**Phase 5 deferred from the prompt:**

- **5.2 `vite-imagetools` migration**: the plugin is configured (`?product`, `?thumb` URL params) but no `<img>` currently uses it. Migrating even 2–3 key images requires moving them out of `public/` into `src/assets/` and switching to `import x from '@/assets/x.jpg?product'` so Vite can process them. Doable, but invasive (the logo lives in 3+ places) and the highest-leverage perf win is actually just compressing `home/logo.png` (1.87 MB!) and `home/cor_logo*.png` (~1 MB each) — those load on every page via Navbar + Footer and dominate first-paint. The image-tools migration is a follow-up.
- **5.3 Lighthouse audit**: can't run from this CLI session (no browser). The Playwright sweep produced screenshots but not Lighthouse scores. Manual run required.

## Phase 6 — Heritage copy fixes

| change | commit | notes |
|---|---|---|
| `Home.jsx` hero subtitle "Three generations of handcrafted breads…" → "Handcrafted breads, challahs, cakes, and pastries — baked daily in our 100% nut-free facility. Toronto's heritage kosher bakery." | `311b58a` | |
| `Home.jsx` feature "Since 1888" desc "Family tradition for generations" → "A baking tradition over a century in the making" | `311b58a` | |
| `Home.jsx` home-about block: "just as we've done for generations" → "just as the bakery has done since 1888"; "recipes passed down through our family" → "traditional recipes rooted in over a century of baking" | `311b58a` | |
| `MenuHub.tsx` trust line "Family bakers since 1888" → "Toronto's heritage kosher bakery" | `311b58a` | |
| `copy-revision-proposal.md` at repo root: proposal for the four remaining About page edits + the "Why choose us" feature-card description | `311b58a` | **NOT merged.** Apply after Chris and Carolina sign off on the wording. |

`Footer.jsx` ("Toronto's favourite kosher bakery since 1888") and `ProductPage.tsx` ("Bakers since 1888") were already institution-led — left as-is.

## Phase 7 — Production essentials

| change | commit | notes |
|---|---|---|
| `index.html`: full rewrite — heritage title, canonical URL, geo meta (CA-ON + lat-long + ICBM), Open Graph (type/site_name/title/description/url/image/locale), Twitter `summary_large_image`, LocalBusiness JSON-LD (address, telephone, geo, priceRange, servesCuisine, six-day openingHoursSpecification — Sat closed per Shabbat), favicon-suite `<link>` references, font preconnect | `0e8ea5f` | |
| `public/robots.txt`: allow-all + Sitemap pointer | `0e8ea5f` | |
| `public/sitemap.xml`: 6 canonical URLs with priority + changefreq | `0e8ea5f` | |
| `public/site.webmanifest`: PWA-style manifest for Android home-screen install | `0e8ea5f` | |
| `README.md`: full UTF-8 rewrite from the UTF-16 stub. Covers stack, routes, file layout, product-data workflow, env vars, Railway deploy, favicon production checklist | `0e8ea5f` | |

**Phase 7 deferred from the prompt:**

- **7.1 Favicon image generation**: `index.html` references `/favicon.ico`, `/favicon-{16,32,180,192,512}x{16,32,180,192,512}.png`, and `/site.webmanifest`. The manifest exists; the PNGs/ICO do not. They need to be generated out of band — Realfavicongenerator.net from `/images/home/logo.png` at brand color `#faf7f2`. README's "Production checklist" lists the exact file names.

---

## Net deltas

| metric | before | after | delta |
|---|---:|---:|---:|
| `public/` images (build weight) | 594 MB | 28 MB | **-565 MB** |
| `src/App.css` lines | 4603 | 2976 | -35 % |
| `src/menu-redesign.css` lines | 1036 | 874 | -16 % |
| Build CSS (KB) | 81.31 | 56.28 | -30 % |
| Build CSS (gzip KB) | 13.19 | 10.19 | -23 % |
| Build JS initial bundle (KB) | 549.89 | 371.30 | -32 % |
| Build JS initial bundle (gzip KB) | 169.44 | 119.02 | -30 % |
| Build JS chunks | 1 | 19 | (lazy routes) |
| `npm audit` vulnerabilities | 5 (3 mod, 2 high) | 0 | |
| `productData.js` lines | 167 | 0 (deleted) | |
| `package.json` deps | 17 | 16 | -1 (`sharp`) |

## Open items rolled forward

1. **G2 — Python photo scripts**: moved to `tools/photo-pipeline/`. If the bakery never re-shoots, these can be deleted.
2. **G5 / G6 — image catalog wiring**: the 612 orphan files in `public/images/baked_goods/` and the now-empty `imageSlug` plumbing both point at a "real product photos" feature that's not built. Reintroduce the `imageSlug?: string` field + the `/images/products/<slug>.jpg` convention when real photos arrive; until then, every catalog tile shows the slider thumbnail.
3. **Phase 4.2 Resend** — contact form is a placeholder.
4. **Phase 5.2 imagetools** — `vite-imagetools` is loaded but unused.
5. **Phase 6 About page** — see `copy-revision-proposal.md`.
6. **Phase 7.1 Favicons** — README "Production checklist".
7. **logo.png compression** — `home/logo.png` is 1.87 MB and loads on every page from Navbar + Footer. Single biggest first-paint weight remaining.
8. **CSS reorganization** (Phase 3 split into `src/styles/*`) was deferred; recommend after branding work is stable.

The dev/preview servers used during QA have been stopped. There are 11 new commits on `main` (8c30c45..0e8ea5f). The user's pre-existing uncommitted changes in `public/images/home/cor_logo*.png` and `logo.png` were not touched.
