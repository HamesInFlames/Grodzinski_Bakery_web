# Cleanup Audit — Phase 0

**Date:** 2026-05-14
**Scope:** Read-only survey of `C:\Project\Grodzinski Web`. No code changes.
**Audited by:** Claude (Opus 4.7) via Claude Code.
**Methodology:** Grep + Read across `src/`, `scripts/`, `public/`, config files; cross-reference of imports, CSS class usage, image refs; per-package dep audit. Three parallel sub-agents handled the deepest cross-referencing (sections A, B, D); inline work covered the rest.
**Prior cleanup state:** A previous pass landed at commit `8c30c45` ("chore: final verification — cleanup pass complete"); see `cleanup-summary.md`. Several "known candidates" in the Phase 1 prompt were already removed in that pass. This audit reflects current state, not pre-prior-pass state.

**Detailed per-section caches** (full output, kept on disk for reference):

- `.audit-cache/section-A.md` — full Dead Code report (134 unused App.css classes enumerated, etc.)
- `.audit-cache/section-B.md` — full Dependency table
- `.audit-cache/section-D.md` — full Image Asset report (top-20 large files, orphan breakdown by folder, etc.)

---

## TL;DR — Top findings

| # | Finding | Severity | Phase that addresses |
|---|---|---|---|
| 1 | **`public/images/Photos/` ships 565 MB of raw photoshoot dumps to production** (PNG/HEIC/JPG originals; zero code refs) | **critical** | new: needs a decision |
| 2 | **`imageSlug → /images/products/<slug>.jpg` convention is unwired** — folder doesn't exist, zero products declare the slug, every product card silently falls through to the slider placeholder | high | 1 or 4 |
| 3 | **Gallery wedding/baby cookie sections: 16 of 18 image URLs 404** (hardcoded hash suffix; `onError` fallback masks it) | high | 1 or 4 |
| 4 | **134 unused CSS classes in `App.css`** (37 % of class selectors) — large `contact-*` / `locations-*` / `menu-category*` clusters from already-deleted pages | medium | 3 |
| 5 | **3 stale top-level docs** (`context.md`, `AGENTS.md`, `cleanup-summary.md`) reference files & packages already removed | low | 1 |
| 6 | **Default Vite favicon (`/vite.svg`) still wired in `index.html`**; minimal meta tags; no OG/Twitter/JSON-LD | medium | 7 |
| 7 | **Mixed `.jsx` / `.tsx` co-existence with `productData.js` (CSV-driven, 6 dead exports) vs `data/products.ts` (typed, generated)** — old module is mostly dead but still imported by `Gallery.jsx` | medium | 1 |
| 8 | **2 `alert()` calls** for contact-form feedback (`Home.jsx:302`, `VisitUs.jsx:9`); contact form does no real submission | medium | 4 |
| 9 | **`@font-face` declarations in `index.css` are malformed** (point at the Google Fonts CSS URL, not the font file) AND duplicate the `<link>` in `index.html` | low | 3 |
| 10 | **Zero `loading="lazy"` and zero `<picture>` elements** in the JSX layer; images all eager-loaded | medium | 5 |

Phase 1's prompt-listed "known candidates" — `SearchOverlay.tsx`, `cartStore.ts`, `lqip.generated.ts`, `Grodzinski_Bakery_web/`, `yolov8n.pt`, `__pycache__/` — were **all already deleted** in the prior cleanup pass. New deletion candidates surface below in §C and §G.

---

## A. Dead code

(Full detail: `.audit-cache/section-A.md`.)

### A1. Unused source files

**Zero fully-orphaned source files in `src/`.** Every one of the 32 files is reachable from `main.jsx` (entry → `App.jsx` → routes/pages/components). Verified for each of the 6 special-focus files in the Phase 1 prompt:

| file | status |
|---|---|
| `src/components/SearchOverlay.tsx` | does not exist (deleted in prior pass) |
| `src/stores/cartStore.ts` | does not exist (deleted in prior pass) |
| `src/data/lqip.generated.ts` | does not exist (deleted in prior pass) |
| `src/components/AnimationWrappers.jsx` | 5 importers, active |
| `src/components/GoogleMap.jsx` | 1 importer, active |
| `src/menu-redesign.css` | 1 importer (`main.jsx`), active |

### A2. Unused named exports

**6 dead exports**, all in `src/productData.js`:

| export | line | status |
|---|---|---|
| `products` | 111 | shadowed by `PRODUCTS` from `data/products.ts` |
| `categories` | 132 | shadowed by `CATEGORIES` from `data/products.ts` |
| `categoryThumbnails` | 135 | unused |
| `getProductsByCategory` | 151 | shadowed by namesake in `data/products.ts` |
| `getProductsGroupedByCategory` | 156 | unused |
| `formatPrice` | 165 | unused |

Only `galleryCategories` is consumed (by `Gallery.jsx`). The Square-CSV-parse logic in this file feeds nothing else. Recommendation: either trim `productData.js` to just `galleryCategories` (~10 lines) or migrate `Gallery.jsx` to consume `data/products.ts` and delete `productData.js` entirely. Either path also lets us drop the `?raw` CSV import.

No unused named exports in `components/`, `data/`, `stores/`, or `routes/`.

### A3. Unused CSS classes

| file | total class selectors | unused | % unused |
|---|---:|---:|---:|
| `src/App.css` | 359 | **134** | **37 %** |
| `src/menu-redesign.css` | 101 | 15 | 15 % |

**`App.css` unused clusters:** `contact-*` (~21 classes), `locations-*` (~26), `menu-category*` (~30+), `back-to-top*`, utility classes `mb-4/6/8`. All look like remnants of pages already consolidated into `VisitUs.jsx` and `MenuLayout.tsx`. Full enumeration of the first 60 in `.audit-cache/section-A.md`.

**`menu-redesign.css` unused:** all `search-overlay*` + `search-trigger` (target the missing `SearchOverlay.tsx` component) plus `badge--md` / `badge--sm` size modifiers no longer used by `<Badge>`.

### A4. console.* and alert()

| pattern | count | locations |
|---|---:|---|
| `console.log` / `.warn` / `.info` / `.debug` | 0 | — |
| `console.error` | 1 | `ContactForm.jsx:52` (form submission error path) |
| `alert(` | 2 | `VisitUs.jsx:9`, `Home.jsx:302` (both for contact-form "success" feedback) |

### A5. TODO/FIXME/XXX/HACK

**Zero matches** anywhere in `src/` or `scripts/`.

---

## B. Unused dependencies

(Full detail: `.audit-cache/section-B.md`.)

**No package is strictly unused.** Every entry in `dependencies` and `devDependencies` resolves to at least one import or config reference. Specific call-outs:

- **`lucide-react`** is pinned at `^1.8.0` and resolves to `1.14.0` per the lockfile. This is the **legacy `lucide-react` line, not the modern mainstream package** (current major is `0.x` under the same name — a separate fork was renamed years ago). 12 active import sites. Worth a separate dependency-modernization discussion later (out of scope for this cleanup).
- **`playwright`** is consumed *only* by `scripts/take-screenshots.mjs` and is *not* wired into any `package.json` script. Functionally dead unless someone runs it manually.
- **`sharp`** is consumed *only* by `scripts/generate-lqip.mjs` (dynamic `await import('sharp')`). Zero refs in `src/`. Functionally dead unless someone runs it manually; the file it once produced (`lqip.generated.ts`) was already deleted in the prior pass.
- **`typescript`** has no `tsc` invocation in any npm script. Type-checking is **not** part of `npm run build` — Vite/Rolldown bundles TS via its compiler with `noEmit: true`. Worth flagging because TS errors don't fail the build.
- **`@types/react` / `@types/react-dom`**: zero direct imports (expected — ambient types). USED implicitly. Keep.
- **`autoprefixer` / `postcss` / `tailwindcss`** all USED — `@tailwind` directives in `src/index.css:2-4` plus 962 utility-class tokens across 8 JSX files.

**Trim candidates for Phase 1 discussion:** `playwright` and `sharp` (script-only, not wired into npm scripts). Removing them does not affect any user-facing behavior; it does mean the corresponding `scripts/take-screenshots.mjs` and `scripts/generate-lqip.mjs` would need to be deleted or the deps reinstalled to run them again.

---

## C. Duplicate / legacy files

The prior pass already removed `Menu.jsx`, `menuData.js`, `ProductCard.jsx`, `LocationCard.jsx`, `Contact.jsx`, `Locations.jsx`, `SearchOverlay.tsx`, `cartStore.ts`, `lqip.generated.ts`, the `Grodzinski_Bakery_web/` submodule reference, `yolov8n.pt`, and `__pycache__/`. None of those exist on disk now.

Remaining legacy artifacts:

### C1. Top-level docs that are stale or transient

| file | size | status | recommendation |
|---|---:|---|---|
| `WEBSITE_REVIEW.md` | 40 KB | prior-pass audit, content largely superseded | per prompt: move to `docs/archive/website-review-2026-04-10.md` |
| `cleanup-summary.md` | 1 KB | prior-pass summary | archive alongside `WEBSITE_REVIEW.md` |
| `context.md` | 7 KB | **stale** — describes the pre-cleanup tree (lists `Menu.jsx`, `menuData.js`, `Contact.jsx`, `Locations.jsx`, `LocationCard.jsx`, `ProductCard.jsx` as if they exist; states the CSV format is "uncommitted") | rewrite to match current state, or archive |
| `AGENTS.md` | 800 B | stale — mentions `21st.dev components` (not installed) | rewrite or archive |
| `CLAUDE.md` | 406 B | mostly meta, references stale workflow ("Delegate large tasks to Gemini MCP") | rewrite or archive |
| `GEMINI.md` | 125 B | one-line stack note, redundant with README | delete |
| `Grodzinski Bakery SRS Document.docx` | 23 KB | client requirements doc | keep, but consider moving to `docs/` |
| `tasks/status.md` | empty stub | per AGENTS workflow but unused | repurpose for Phase tracking |
| `tasks/todo.md` | empty stub | unused | delete or repurpose |
| `tasks/decisions.md` | 1 KB | 2026-05-07 menu-redesign architecture decisions — not stale | keep |
| `tasks/product-photo-list.md` | unread | likely shoot-list | keep, photographer/client doc |

### C2. Python photo-pipeline scripts

| file | purpose | last touched | recommendation |
|---|---|---|---|
| `scripts/photo_enhance.py` | CPU bg-removal + crop + enhance | 2026-03-12 | one-off photo pipeline — already produced `Photos/Enhanced/` (189 files) |
| `scripts/photo_enhance_gpu.py` | CUDA version of above | 2026-03-12 | same |
| `scripts/photo_studio_relight.py` | studio-relight effects | 2026-03-12 | same |
| `scripts/setup_gpu_env.ps1` | PyTorch+rembg env setup | 2026-03-12 | same |
| `scripts/generate-lqip.mjs` | LQIP placeholders → `lqip.generated.ts` | older | **the output file was deleted in prior pass** — script is now orphaned |
| `scripts/take-screenshots.mjs` | Playwright site screenshots | last cleanup pass | dev tool; not wired to any npm script |
| `scripts/generate-products.mjs` | regenerates `data/products.generated.ts` | recent | **keep — actively referenced** by the generated file's banner |

**Recommendation for the four Python scripts + setup_gpu_env.ps1:** they have done their job (produced 189 enhanced PNGs in `Photos/Enhanced/`). They depend on heavyweight Python tooling (rembg, OpenCV, CUDA) that isn't reproducible from the repo. If kept, they're noise; if deleted, the photo pipeline is lost. **Suggested:** move to `tools/photo-pipeline/` (out of `scripts/`) and add a brief README noting "one-off pipeline, run on James's RTX 3080 box, see decisions log for context." Or archive to a separate gist. Needs your call.

`scripts/generate-lqip.mjs` is the clearest delete-candidate — its output was already pruned.

### C3. Two separate product data sources

- **Old:** `src/productData.js` parses `grodzinski_products.csv` via `?raw`. 6 of 7 exports are dead (see A2). Only `galleryCategories` lives.
- **New:** `src/data/products.ts` re-exports `GENERATED_PRODUCTS` from `src/data/products.generated.ts` (1916 lines, auto-generated by `scripts/generate-products.mjs`). This is the source the actual catalog uses.

The two coexist because `Gallery.jsx` still consumes the legacy export. Not a bug, but ripe for consolidation. See Phase 1 candidate list in §G below.

### C4. `.cursor/`

- `.cursor/rules/` (subfolder) and `.cursor/worktrees.json` (48 bytes).
- Not user-affecting; safe to keep if you use Cursor as an IDE. Not stale per se. No action needed.

---

## D. Image assets

(Full detail: `.audit-cache/section-D.md`.)

### D1. Sizes

| folder | files | size |
|---|---:|---:|
| `public/images/home/` | 35 | 6 MB |
| `public/images/baked_goods/` | 625 | 22 MB |
| **`public/images/Photos/`** | **544** | **565 MB** |
| Total | 1204 | 594 MB |

### D2. What's in `Photos/`

```
Photos/
  Enhanced/                          189 files,  153 MB, avg 830 KB  (.png, output of the photo_enhance scripts)
  Raw/Grodzinski Photos/
    Bad/                              67 files,  151 MB, avg 2.3 MB  (rejected shoot takes)
    BEV/                              96 files,   42 MB, avg 454 KB  (beverage shoot)
    Good/                            159 files,  160 MB, avg 1.0 MB  (approved shoot)
    Hero/                             33 files,   57 MB, avg 1.8 MB  (hero shots)
```

Extensions: 197 PNG + 180 HEIC + 167 JPG (HEIC won't render in browsers without conversion). Zero files in `Photos/` are referenced by any code path. **This folder is raw photoshoot storage that has been parked inside `public/`, which means it ships to the production CDN.** Moving it out of `public/` reclaims 565 MB with zero user-facing impact.

### D3. Duplicates

Only 5 basename collisions across the whole image tree (Enhanced-vs-Raw doublets + 2 cross-category catalog thumbnails). Negligible.

### D4. Broken references

Two distinct categories:

**(a) `imageSlug` convention is unwired.**

- `src/components/catalog/ProductCard.tsx:11` builds `` `/images/products/${product.imageSlug}.jpg` ``
- `src/routes/ProductPage.tsx:47` does the same

`public/images/products/` does not exist. `imageSlug` is declared optional on the `Product` type but **zero entries in `products.generated.ts` set it**. Every catalog tile silently falls through to `/images/home/thumbnail_slider.jpg`. No runtime 404, but the whole "real product photo" code path is dead.

**(b) Gallery hardcodes a hash suffix that's different per file on disk.**

`src/pages/Gallery.jsx:29-33` templates index 14–23 against suffix `TlFBsNuSug` (Engagement & Wedding Cookies) and 14–21 against `I1D0S8y0ti` (Baby Cookies). On disk, every file has a different suffix per index. Result: **16 of 18 generated paths 404** (only `imgi_14_…TlFBsNuSug.jpg` and `imgi_14_…I1D0S8y0ti.jpg` exist). Mitigated by `onError → '/images/home/thumbnail_cookies.jpg'` at line 140 — users see fallbacks, but the site fires 16 wasted requests per Gallery view.

### D5. Orphans

**633 of 658** files in `home/` + `baked_goods/` are orphans (no code reference). Per-folder breakdown in the cache file.

- `baked_goods/` is a 612-file scraped catalog dump (consistent `imgi_<n>_products_thumbnail_<hash>.jpg` naming) that the broken `imageSlug` convention was likely meant to consume.
- `home/` has 12 orphans that look like *intended-but-never-wired* assets — `best_of_toronto_logo.png`, `grodzinski_recommended.jpg`, `cor_logo_white.png`, `thumbnail_quiche.jpg`, `thumbnail_kid.jpg`. Worth a manual look before deleting any `home/` file.

### D6. Outsized logo files

- `home/logo.png` — **1865 KB** (loads on every page from Navbar + Footer)
- `home/cor_logo_white.png` — 1023 KB
- `home/cor_logo.png` — 919 KB

These are the biggest non-`Photos/` wins. Compress / re-export as WebP.

---

## E. Configuration drift

### E1. tsconfig.json

- `paths: { "@/*": ["./src/*"] }` — matches actual import usage (`@/components/...`, `@/data/...`, `@/stores/...`, `@/routes/...`). ✓
- `allowJs: true`, `jsx: "react-jsx"` — both correct for a mixed JS/TS React 19 project. ✓
- `noEmit: true`, `isolatedModules: true` — TS only used for type-checking; bundling happens via Vite/Rolldown. ✓
- `noUnusedLocals: false`, `noUnusedParameters: false` — TS won't fail the build on unused locals. Could be tightened post-cleanup.
- No `tsc` invocation in `package.json` scripts — type checking is **not** part of `npm run build`. Worth a separate decision (add a `typecheck` script that runs `tsc --noEmit`).

### E2. vite.config.ts

- `@vitejs/plugin-react` plugin — needed. ✓
- `vite-imagetools` plugin — wired with `?product` and `?thumb` directives. **Not actually consumed anywhere in `src/`** at the moment (no imports use the query suffix). Plugin is loaded but does nothing; harmless but flag for Phase 5 (the prompt's image-optimization step is meant to actually consume this).
- `resolve.alias '@'` — matches tsconfig. ✓

### E3. tailwind.config.js

- Content paths: `./index.html`, `./src/**/*.{js,jsx,ts,tsx}` — covers all template sources. ✓
- No theme extensions, no plugins — minimal config. ✓

### E4. postcss.config.cjs

- `tailwindcss` + `autoprefixer` only. Both needed.
- Not inherited from `rolldown-vite` — Vite picks up `postcss.config.cjs` automatically.

### E5. index.html

- **`<link rel="icon" type="image/svg+xml" href="/vite.svg" />`** — still the default Vite logo. ⚠️ Phase 7.
- `<title>Grodzinski Bakery</title>` — minimal; Phase 7 wants the full heritage-bakery title.
- `<meta name="description">` — present but Phase 7 wants Open Graph + Twitter + LocalBusiness JSON-LD + geo tags + canonical URL.
- `<link>` to Google Fonts (Fraunces + DM Sans) — present.

### E6. index.css

- `@tailwind base; @tailwind components; @tailwind utilities;` directives — present and in use.
- **`@font-face` block in `@layer base`** — `src` URL points to the **Google Fonts CSS** stylesheet URL, not a font file URL. This declaration is malformed and contributes nothing functional. The actual font loading is done by the `<link>` in `index.html`. Phase 3 should remove the `@font-face` block.

### E7. .gitignore

Current content covers most of the Phase 1 prompt's spec. **Missing entries:**

- `dist-ssr` ✓ already present
- `*.local` ✓ already present
- `.env.local`, `.env.production`, `.env.development` (only `.env` is listed)
- `.env.example` should NOT be ignored (it's meant to be committed)
- `cleanup-audit-*.md` (current pattern is `cleanup-audit.md`, singular; the prompt's Phase 1 lists a wildcard pattern — the new phase docs would not match)
- `.audit-cache/` (this audit's local cache — should be ignored)

### E8. `.cursor/`, AI docs

Already covered in §C1.

---

## F. Inconsistencies and code smells

### F1. Mixed `.jsx` and `.tsx`

Per `tasks/decisions.md`, this is intentional ("New TypeScript files alongside existing JS; no migration of existing code"). Current split:

| location | extension | files |
|---|---|---|
| `pages/` | `.jsx` | 5 (About, Catering, Gallery, Home, VisitUs) |
| `components/` (top-level) | `.jsx` | 5 (AnimationWrappers, ContactForm, Footer, GoogleMap, Navbar) |
| `components/catalog/`, `components/filters/`, `components/layout/`, `components/ui/` | `.tsx` | 10 |
| `routes/` | `.tsx` | 4 |
| `data/`, `stores/` | `.ts` / `.tsx` | 3 |
| `productData.js`, `main.jsx`, `App.jsx` | `.jsx` / `.js` | 3 |

Not strictly a smell — it's a deliberate gradual-migration strategy. But it has costs: type-checking only covers the `.tsx` half, and the `productData.js` ↔ `data/products.ts` split (§C3) is a direct symptom.

### F2. `document.body.style.overflow` in 2 places

- `src/components/Navbar.jsx:25-26` — sets/clears on mobile menu open/close
- `src/pages/Gallery.jsx:69, 74` — sets/clears on lightbox open/close

**Conflict scenario:** open mobile menu (overflow = hidden), navigate to /gallery without closing it (… though the menu auto-closes on route change), open a lightbox, close the lightbox — overflow gets cleared, body becomes scrollable again even if some other modal expected it locked. Not a critical bug today because nothing else uses overflow-locking. Phase 4 should centralize this (a `useBodyScrollLock` hook with a ref count) or accept the current state and document it.

### F3. `setTimeout` chains

Only **one** `setTimeout` exists across `src/`: `ContactForm.jsx:49` clears `submitStatus` after 5 s. Benign. The Phase 4 prompt mentions "Menu.jsx `scrollToCategory`/`toggleCategory` nested setTimeout chains" — but **`Menu.jsx` no longer exists** (deleted in the prior cleanup). No timing fragility found in current code.

### F4. Hardcoded magic numbers (sticky-nav offset)

`src/App.css` has many hardcoded `top: 80px` / `top: 70px` / `top: 12px` / `scroll-margin-top: 140px` / `scroll-margin-top: 160px` values for sticky-navbar offsets. These should be a single CSS custom property (e.g. `--nav-height: 80px`). Phase 3 territory.

### F5. `alert()` usage

`Home.jsx:302` and `VisitUs.jsx:9` both call `alert()` to confirm form submission (form does no actual submission). Phase 4 fix.

### F6. `<div onClick>` (accessibility)

**Zero** direct matches found. ✓

### F7. Missing `aria-label`

Only **4** `aria-label` occurrences across the codebase (GoogleMap, Navbar, Chip, Breadcrumb). There are **22 `onClick=` handlers** across 7 files. Many of those are on `<button>` elements — but the icon-only buttons (mobile menu burger, lightbox close, chip dismiss, breadcrumb separators) are largely without `aria-label`. Phase 4 to enumerate.

### F8. Generic alt text

`src/pages/Gallery.jsx:136` — `alt={`Custom creation ${i + 1}`}`. Confirmed. Phase 4.

### F9. `loading="lazy"` and `<picture>`

- **Zero** `loading="lazy"` attributes across `src/`.
- **Zero** `<picture>` or `<source>` elements across `src/`.

Direct `<img>` tag count is low (≈2 in JSX, mostly Footer.jsx) — most product images render through React templating that escapes the simple `<img\s` grep, or through CSS `background-image` (one such in `App.css:590`). Phase 5 to address: every below-fold image should get `loading="lazy"`; product/hero images should use `<picture>` via the `vite-imagetools` `?product`/`?thumb` directives that are already configured but unused.

### F10. Unnecessary `import React from "react"` (React 19)

3 spots:

| file:line | uses `React.*`? | action |
|---|---|---|
| `src/main.jsx:2` | yes — `React.StrictMode` | **keep** |
| `src/components/ContactForm.jsx:2` | no | drop |
| `src/components/GoogleMap.jsx:2` | no | drop |

### F11. `function Component()` vs `const Component = () =>`

5 files use `function`, 4 use `const ... =>`. Minor style inconsistency. Not worth touching unless a Phase chooses to standardize.

### F12. Emoji-as-icon usage in code

A first-pass grep counted 14 emoji characters in `src/productData.js:14` alone (the `galleryCategories` `icon` field). The Phase 2 mapping table lists 36 distinct emoji to replace. A thorough enumeration is a Phase 2 deliverable — this audit confirms the issue exists but does not fully enumerate.

---

## G. Open decisions surfaced by Phase 0

These weren't explicitly called out in the Phase 1 prompt but emerged from the audit. **Please rule on each before Phase 1 begins** — most are higher-impact than the Phase 1 prompt's known candidates (which were largely already handled).

1. **`public/images/Photos/` (565 MB)** — move out of `public/`? Suggested target: `_photos-source/` at repo root, gitignored (or moved to external storage). Reclaims 565 MB of build/CDN weight. Zero user-facing impact since nothing references it. **Recommendation: move + gitignore.**
2. **Python photo-pipeline scripts** (4 `.py` + 1 `.ps1`) — move to `tools/photo-pipeline/` with a README, or delete? They're done their job; deps aren't reproducible from the repo. **Recommendation: move to `tools/photo-pipeline/` with a one-line README, or delete if you don't need to re-run.**
3. **`scripts/generate-lqip.mjs`** — its output (`lqip.generated.ts`) was deleted in the prior pass. Reinstate the LQIP feature or delete the script? **Recommendation: delete the script (and the `sharp` dev-dep that only this script consumed).**
4. **`scripts/take-screenshots.mjs` + `playwright`** — keep for occasional dev use, or trim? **Recommendation: keep; it's small, useful, and wired to no production path.**
5. **`imageSlug → /images/products/<slug>.jpg` convention** — wire up (populate `imageSlug` on each product, create the folder, drop images) OR remove the dead fallback code in `ProductCard.tsx`/`ProductPage.tsx`? **Recommendation: remove the dead fallback code now; reintroduce it when real product photos arrive.** The 633 orphan files in `baked_goods/` were *probably* the intended source, but their filenames (`imgi_<n>_…_<hash>.jpg`) don't match any product slug, so wiring them up requires either a rename pass or a per-product mapping.
6. **`baked_goods/` (612 orphan files, 22 MB)** — delete entirely, or keep pending the `imageSlug` wire-up? **Recommendation: move out of `public/` (sibling `_image-sources/` perhaps) pending the photo decision. Don't ship them.**
7. **`home/` orphans (12 files)** — almost certainly intended assets. **Recommendation: leave alone for now; flag for design review.** Includes obvious accreditation badges (`best_of_toronto_logo.png`, `grodzinski_recommended.jpg`, `cor_logo_white.png`) that probably belong in the Footer or About page.
8. **Gallery broken-template bug (16 of 18 paths 404)** — fix in Phase 4 by rewriting `Gallery.jsx` to read from a real data source, or treat as Phase 1 dead code and delete the wedding/baby cookie sections? **Recommendation: fix in Phase 4** (rewrite Gallery to consume a curated array of real paths).
9. **`productData.js` future** — trim to just `galleryCategories` (~10 lines, +CSV-parse retained), OR migrate `Gallery.jsx` to `data/products.ts` and delete `productData.js`? **Recommendation: do the migration in Phase 1**; it removes the CSV `?raw` import, the dead 6 exports, and the dual-data-source confusion in one step.
10. **Stale top-level docs** (`context.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) — rewrite or archive? **Recommendation: archive `context.md`/`GEMINI.md`/`cleanup-summary.md`/`WEBSITE_REVIEW.md` under `docs/archive/`; rewrite `AGENTS.md`/`CLAUDE.md` to reflect the current stack (no `21st.dev`, lucide for icons, Tailwind in JSX-only).** README.md should also get the Phase 7 rewrite.
11. **TypeScript build integration** — add `typecheck` npm script (`tsc --noEmit`) so the .tsx half of the codebase gets validated. **Recommendation: add now; type-check would catch broken `imageSlug` and similar issues.**
12. **`vite-imagetools`** is configured but unused. Either start using it in Phase 5 (the prompt's intent) or remove the plugin until needed. **Recommendation: keep the config, use it in Phase 5.**

---

## Phase 0 deliverable status

| item | status |
|---|---|
| Audit report at `cleanup-audit-phase-0.md` | this file |
| Sub-section caches under `.audit-cache/` | written |
| Source code modifications | **none** (audit only) |
| Phase 1 ready to begin | pending your approval and decisions on §G items |

---

## Next steps

1. Read this doc, then specifically the §G open-decisions list.
2. Reply with either "approved" (apply my recommendations as-is) or per-item rulings (e.g., "G1 yes, G2 delete, G5 keep both fallback paths …").
3. Once approved, I'll start Phase 1 with a single commit per logical change, running `npm run build` after each destructive step.

The dev server (task `bory4txmn`) is still running at http://localhost:5174/ — tell me when to stop it.
