# Session status — Grodzinski website

## Session — 2026-05-29 (Temp Web — Menu & Holidays coming soon)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `Temp-Web`

**What was done:**
- Created `Temp-Web` branch for the initial live launch while Menu and Holidays content is still being finalized
- Replaced `MenuHub.tsx` with a "Coming Soon" placeholder page (clock icon, friendly message, link to Visit Us)
- Replaced `HolidaysHub.tsx` with a matching "Coming Soon" placeholder page
- All `/menu/*` and `/holidays/*` sub-routes now redirect to their respective hub (no broken pages)
- Removed unused lazy imports (`GroupPage`, `HolidayGroupPage`) and `RedirectToOccasion` helper from `App.jsx`
- Added `.coming-soon` CSS (centered, responsive, uses existing design tokens)
- Build passes cleanly

**Files changed:**
- `src/routes/MenuHub.tsx` — replaced with coming-soon placeholder
- `src/routes/HolidaysHub.tsx` — replaced with coming-soon placeholder
- `src/App.jsx` — simplified menu/holidays routes to catch-all redirects, removed dead imports
- `src/App.css` — added `.coming-soon*` styles

**To restore full menu/holidays:** switch back to `main` branch or merge `main` into this branch once the content is ready.

---

## Session — 2026-05-29 (Contact form wired to Web3Forms)

**Tool:** Claude Code (Opus 4.8)
**Branch:** `main`

**What was done:**
- Re-enabled the commented-out `ContactForm` on the **Visit Us** page, delivering submissions to `info@grodzbakery.com` via **Web3Forms** (hosted form-to-email — no backend/server, works with the current static Railway deploy). (Form lives on Visit Us only — per client direction, not on Home.)
- New `src/lib/sendContactMessage.js` — POSTs submissions to the Web3Forms API; sets `replyto` to the customer's email; setup instructions in the file header.
- Added a hidden honeypot (`botcheck`) field to `ContactForm.jsx` for spam protection.
- Added `.home-contact-form` CSS (centered, max-width 640px) for the standalone form.
- Verified in dev: form renders on both pages, submit chain reaches the helper, no crashes. `npm run build` clean.

**Files changed:**
- `src/lib/sendContactMessage.js` *(new)*
- `src/components/ContactForm.jsx` — honeypot field
- `src/pages/Home.jsx`, `src/pages/VisitUs.jsx` — re-enabled form + wired handler
- `src/App.css` — `.home-contact-form`

**⚠️ ONE MANUAL STEP REMAINING (only the inbox owner can do this):**
1. Go to https://web3forms.com, enter `info@grodzbakery.com`, click "Create Access Key".
2. Web3Forms emails an access key to that inbox — copy it.
3. Paste it into `ACCESS_KEY` in `src/lib/sendContactMessage.js` (or set `VITE_WEB3FORMS_ACCESS_KEY` in Railway Variables).
4. Commit + push. The form goes live on deploy. Send a test submission to confirm it lands in the inbox.

---

## Session — 2026-05-29 (Email + hours update)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Changed all email addresses from `info@grodzinskibakery.com` to `info@grodzbakery.com`
- Updated Friday hours from 6 AM–3 PM to 6 AM–4 PM (all other days unchanged)
- Build passes cleanly

**Files changed:**
- `index.html` — JSON-LD email + Friday closing time
- `src/components/Footer.jsx` — email + Friday hours
- `src/pages/VisitUs.jsx` — email + Friday hours
- `src/pages/Catering.jsx` — email in ordering instructions
- `src/pages/Home.jsx` — Friday hours in contact card

---

## Session — 2026-05-29 (Photo slideshows on Home + About)

**Tool:** Claude Code (Opus 4.8)
**Branch:** `main`

**What was done:**
- Built reusable `src/components/PhotoSlideshow.tsx` — crossfading Ken Burns pan/zoom slideshow (alternating zoom-in/out per frame), `motion/react` `AnimatePresence`, falls back to a single static image under `prefers-reduced-motion`. Props: `photos`, `interval`, `startIndex`.
- **4-photo** library at `public/images/slideshow/` (WebP, ~190–220 KB each): shelves-breads, cookies-table, cakes-case, fridge-cakes — all from the shoot **stills** (the `.jpg` files). **Excluded** the wide-shelf still (`...165358243.jpg`) for Tova's branding. (Tried adding video-extracted frames for more variety, but per client direction reverted to stills only — video pans were sign/packaging-focused.)
- Centralized photo defs + themed groupings in `src/data/slideshowPhotos.js` (SHOWCASE / HERITAGE / CELEBRATION / FAMILY arrays), imported by both pages.
- Replaced `VideoBackground` with `PhotoSlideshow` in the Home "A Toronto Tradition Since 1888" section (all 4 photos) and all 3 About story sections (themed pairs, varied `startIndex`).
- Added `.photo-slideshow` CSS reusing the existing `.about-story__media` 4:3 frame + 768/480 mobile height caps.
- Created `.claude/launch.json` (dev server preset) for preview verification.
- Verified in dev: both pages render, slideshows crossfade/pan, no Tova imagery, zero console errors. `npm run build` clean.

**Files changed:**
- `src/components/PhotoSlideshow.tsx` *(new)*
- `public/images/slideshow/*.webp` *(new, 4 files)*
- `src/pages/Home.jsx`, `src/pages/About.jsx` — swapped video → slideshow
- `src/App.css` — `.photo-slideshow` rules
- `.claude/launch.json` *(new)*

**Note:** `VideoBackground.tsx` and the `/videos/*` assets are now unused by Home/About but left in place (no other consumers checked beyond these two pages).

---

## Session — 2026-05-29 (Kosher banner polish)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main` (pushed)

**What was done:**
- Slowed kosher banner marquee scroll from 30s → 36s for readability
- Increased badge repeats from 2× to 6× for seamless looping on wide viewports
- Shortened "COR Certified Kosher" → "COR Certified"
- Removed duplicate "Dairy Chalav Yisroel" badge from banner and Home certifications (Chalav Yisroel already covers it)
- Removed dot separators between banner items
- Build passes cleanly

**Files changed:**
- `src/App.css` — marquee duration 30s → 36s
- `src/components/KosherBanner.tsx` — 6× repeat, label trim, removed dots
- `src/pages/Home.jsx` — removed "Dairy Chalav Yisroel" from certifications

---

## Session — 2026-05-26 (CSV-to-TypeScript catalog generator)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Created `scripts/generate-catalog.mjs` — parses `grodzinski_products.csv` and generates `src/data/products.generated.ts` with three typed arrays: `GENERATED_GROUPS`, `GENERATED_CATEGORIES`, `GENERATED_ITEMS`
- RFC 4180 CSV parser handles quoted fields, escaped double-quotes, and multi-line descriptions (lines 71-83 of CSV)
- Business rules applied: excluded Catering/Gluten Free/RH Baskets; merged Chanukah+Chanukah Cookies+Sufganiyot & Latkes → Hanukkah; merged Purim+Mishloach Manot → Purim; merged civil holidays → Celebrations; Friday → Shabbat group; added Yom Kippur and Simchat Torah as empty placeholder groups
- Photo matching via squareToken PHOTO_MAP (8 matches) + slug-based filesystem fallback
- Output: 14 groups, 50 categories, 429 items, 8 photos matched
- No npm dependencies added — CSV parser is inline

**Files changed:**
- `scripts/generate-catalog.mjs` *(new)*
- `src/data/products.generated.ts` *(regenerated)*

---

## Session — 2026-05-26 (Menu revamp — full implementation)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`
**Plan:** `tasks/menu-revamp-plan.md`

### What was done (all 6 phases completed):

**Phase 1 — Data Layer + CSV Ingestion:**
- Rewrote `src/data/products.ts` with new hierarchical types: `MenuGroup`, `MenuCategory`, `MenuItem`, `HolidayMeta`, `DietaryLabel`
- Created `scripts/generate-catalog.mjs` — CSV parser that generates `products.generated.ts` from `grodzinski_products.csv`
- Generated 14 groups, 50 categories, 429 items across 3 sections (regular/friday/holidays)
- Simplified `src/stores/filterStore.ts` to 2-value dietary toggle (pareve/dairy)
- Updated `src/data/holidays.ts` to re-export from new products.ts
- Added backward-compat exports (Product, Category, PRODUCTS, etc.) for gradual migration

**Phase 2 — Configurator Components:**
- Built `VariantConfigurator` with 4s auto-rotation, hover/click pause, prefers-reduced-motion
- Built `VariantList` with roving tabindex, dotted-leader pricing, WCAG 2.5.8 touch targets
- Built `VariantImage` with Motion crossfade and typographic placeholder fallback
- Built `CategorySection` wrapper with dietary inference
- Built `DietaryTag` pill component

**Phase 3 — Menu Pages:**
- Rewrote `MenuHub.tsx` — shows all regular + friday groups with item counts
- Built `GroupPage.tsx` — displays categories/items per group with breadcrumbs
- Updated routes: `/menu/:group` → GroupPage; `/menu/p/*` → redirect to `/menu`

**Phase 4 — Holiday Pages:**
- Rewrote `HolidaysHub.tsx` — holiday grid with Hebrew names and descriptions
- Built `HolidayGroupPage.tsx` — holiday configurator with pre-order notices
- Updated routes: `/holidays/:occasion` → HolidayGroupPage; old product pages redirect

**Phase 5 — Site-wide UI:**
- Built `KosherBanner.tsx` — CSS marquee with COR/Pas Yisroel/Chalav Yisroel badges
- Built `TovaButton.tsx` — fixed cross-site button with external link icon
- Built `NavDropdown.tsx` — desktop hover dropdown + `MobileNavAccordion` for mobile drawer
- Integrated NavDropdown into `Navbar.jsx` for Menu and Holidays links

**Phase 6 — Build Verification:**
- `npm run build` passes cleanly (1.16s, 2177 modules)
- All new imports resolve correctly
- Old route files (CategoryPage, ProductPage, OccasionPage, HolidayProductPage) left in place for reference; no longer imported

### Files created:
- `scripts/generate-catalog.mjs`
- `src/components/menu/VariantImage.tsx`
- `src/components/menu/VariantList.tsx`
- `src/components/menu/VariantConfigurator.tsx`
- `src/components/menu/CategorySection.tsx`
- `src/components/menu/DietaryTag.tsx`
- `src/components/KosherBanner.tsx`
- `src/components/TovaButton.tsx`
- `src/components/NavDropdown.tsx`
- `src/components/layout/Breadcrumb.tsx` (existed, unchanged)
- `src/routes/GroupPage.tsx`
- `src/routes/HolidayGroupPage.tsx`

### Files modified:
- `src/data/products.ts` — complete rewrite with new types + backward compat
- `src/data/products.generated.ts` — regenerated from CSV (429 items)
- `src/data/holidays.ts` — simplified to re-exports from products.ts
- `src/stores/filterStore.ts` — simplified to 2-value DietaryLabel toggle
- `src/App.jsx` — new routes, KosherBanner + TovaButton integration
- `src/App.css` — added CSS for all new components + mobile accordion
- `src/components/Navbar.jsx` — integrated NavDropdown for Menu/Holidays
- `src/routes/MenuHub.tsx` — rewritten
- `src/routes/HolidaysHub.tsx` — rewritten

### Remaining work:
- Photo coverage: 8/429 items have photos (1.9%) — need product photography
- Old route files can be deleted once visual QA confirms new pages work
- Test suite needs rewriting (not in scope for this session)
- Visual QA at 1440px and 375px viewports

---

## Session — 2026-05-26 (Home about snippet mobile fix)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Improved the Home page "A Toronto Tradition Since 1888" section for mobile
- Desktop: centered the video frame in its column (was right-aligned with a visual gap)
- Tablet (1024px): switched video from tall 4:5 portrait to compact 16:9 landscape crop with 280px max-height
- Mobile (768px): further tightened video to 220px max-height, reduced section gap
- Removed center-aligned text on mobile — left-aligned reads more naturally for paragraphs
- Build passes cleanly

**Files changed:**
- `src/App.css` — updated `.home-about__media-frame` alignment and responsive breakpoints

---

## Session — 2026-05-26 (About page UI/UX redesign)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Redesigned the About page layout from a two-column text-vs-video split into 3 alternating story sections
- Each section pairs one video with its related narrative text side-by-side (desktop) or stacked (mobile)
- Section 1 "A Toronto Tradition Since 1888" — challahs video + heritage story
- Section 2 "Baked for Every Celebration" — cakes video + celebrations story (reversed layout)
- Section 3 "Safe for Every Family" — cookies video + community/allergen story
- Condensed 5 dense paragraphs into 3 focused blocks with section headings
- Alternating cream/white backgrounds for visual rhythm between sections
- Mobile: videos capped at 280px height (220px on small phones), single-column stacking with proper spacing
- Removed all old `.about-content`, `.about-content__text`, `.about-content__images`, `.about-image-card` CSS
- Switched videos from `backdrop` mode to `objectFit="cover"` in clean aspect-ratio containers
- "Why Choose Grodzinski?" features section kept as-is
- Build passes cleanly

**Files changed:**
- `src/pages/About.jsx` — replaced 2-column grid with 3 `about-story` sections
- `src/App.css` — replaced `.about-content*` / `.about-image-card*` with `.about-story*` rules + responsive breakpoints

---

## Session — 2026-05-26 (Certification badges on homepage)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Replaced the old icon-based "Features" strip (100% Kosher, Nut-Free, Fresh Daily, Since 1888) with a professional **Certification Badges** strip
- New badges: **Kosher** (COR logo), **Pas Yisroel** (OU mark), **Chalav Yisroel** (Dairy mark), **Nut Free** (stamp)
- Each card shows the official certification badge image prominently with title and description
- Badge images (brown/transparent variants) stored at `public/images/certifications/`
- COR logo reused from existing `public/images/home/cor_logo.png`
- Added responsive CSS (`.certifications-strip`, `.cert-badge`) — flexbox layout, centered, wraps on mobile
- Build passes cleanly

**Files changed:**
- `src/pages/Home.jsx` — replaced `features` array + rendering with `certifications` badge cards
- `src/App.css` — added `.certifications-section`, `.certifications-strip`, `.cert-badge*` styles + mobile overrides
- `public/images/certifications/pas-yisroel.png` *(new)*
- `public/images/certifications/dairy-chalav-yisroel.png` *(new)*
- `public/images/certifications/nut-free.png` *(new)*

---

## Session — 2026-05-26 (Holiday section trimmed to 6 occasions)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Reduced holiday occasions from 11 to 6 per client request
- Kept: Rosh Hashanah, Sukkot, Purim
- Renamed: Chanukah → Hanukkah
- Added: Yom Kippur, Simchat Torah
- Removed: Pesach, Shavuot, Simchas & Celebrations, Father's Day, Mother's Day, Valentine's Day, Graduation
- Updated `HOLIDAY_OCCASIONS` in `src/data/products.ts`
- Updated `HOLIDAY_OCCASION_META` in `src/data/holidays.ts`
- Removed `occasion` fields from products that referenced deleted occasions in `src/data/products.generated.ts`
- Build passes cleanly

---

## Session — 2026-05-21 (Merge AN_Branch → main)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `main`

**What was done:**
- Merged `AN_Branch` (commit 0e1ab0a by Cheezahh) into `main`
- Brought in the Custom Creations gallery carousel, lightbox, 22 cake images, and `embla-carousel-react`
- AN_Branch also reverted Square POS price sync (`squareToken` fields removed, `sync-prices.mjs` deleted, prices reverted to pre-sync values) and restored several previously cleaned-up files

---

## Session — 2026-05-21 (lightbox grid overflow fix)

**Tool:** Claude Code (Opus 4.7)
**Branch:** `AN_Branch`

**Bug:** In the "View All" lightbox grid (`GalleryLightbox.tsx`), cells overflowed
their grid row tracks vertically and overlapped the row below. Row tracks
measured ~81px while cells rendered at their true ~271px 4:5 height.

**Root cause:** `aspect-ratio: 4/5` was set on `.gallery-lightbox__cell`, a
non-replaced grid item whose width is a flexible `1fr` track. `aspect-ratio`
is resolved during final layout, *after* grid track-sizing — so the auto rows
never received the ratio-derived height and collapsed. Confirmed via computed
styles: in-flow `<img>`, aspect-ratio'd `<img>`, and absolute `<img>` all
produced the identical 81px track.

**Fix (`src/App.css`, `.gallery-lightbox__cell` + cell `> img`):**
- Replaced cell `aspect-ratio` with the padding-bottom ratio hack
  (`height: 0; padding: 0 0 125%`). Percentage padding resolves against the
  already-sized column width, contributing real box height the row track measures.
- Image is `position: absolute; inset: 0; object-fit: cover` so it fills the
  frame without polluting the cell's intrinsic size.

**Verified** on the running dev server: row tracks now equal cell height
(no overlap) at all three breakpoints — 2-col/375px, 3-col, 4-col/1280px;
cells are exact 4:5 (ratio 0.800), rounded corners on all sides, 18px row gaps.

**Also:** `src/data/galleryItems.ts` titles + alt text were almost entirely
mismatched to their images (e.g. cake-01 "Unicorn Cake" was actually the
bumblebee/sunflower cake). Viewed all 22 `public/gallery/cake-XX.png` photos
and rewrote every `alt`/`title` to match the actual cake. `npm run typecheck`
clean. These descriptions still pending Carolina's final review per the
carousel session below.

---

## Session — 2026-05-21 (Custom Creations gallery carousel)

**Tool:** Cursor Agent (Claude Opus 4.7)
**Branch:** `AN_Branch`

**What was done:**
- Replaced the "Photo Coming Soon" placeholder on `/gallery` with an interactive 22-image carousel that lives inside the existing cream container (heritage palette preserved, no new colors/fonts/layout introduced).
- Architecture: parent `GalleryCarousel.tsx` owns `useEmblaCarousel` + active-index state; passes refs/callbacks to `GalleryHero` (large 4:5 image, ChevronLeft/Right arrows, 22-dot indicator, keyboard `Arrow`-key support), `GalleryThumbnails` (5-thumbs-visible scrollable strip with `scroll-snap-type: x mandatory` + auto-center-on-active via `Element.scrollBy`, plus a separate `LayoutGrid` "View All" tile in a 2nd grid column), and `GalleryLightbox` (full-screen modal: backdrop-blur + espresso 85% overlay, header w/ Cormorant title + close, responsive grid 2→3→4 cols, click-cell → single-image view w/ prev/next, ESC/Tab focus trap, body-scroll lock, focus returns to View All on close).
- Typed manifest at `src/data/galleryItems.ts` (22 cakes, descriptive alt + optional title) — components are data-driven, no hardcoded paths.
- 22 cake PNGs (819×1024, 4:5) copied to `public/gallery/cake-01.png … cake-22.png` and verified present in `dist/`.
- Installed `embla-carousel-react` (~12 kB raw); `motion@12.38` (already present, the renamed framer-motion) drives lightbox open/close + enlarged-image cross-fade.
- All styles appended to `src/App.css` under `.gallery-carousel-shell` / `.gallery-hero-carousel` / `.gallery-thumbs` / `.gallery-lightbox` namespaces. Heritage tokens only (`--color-bg-elevated`, `--bg-section`, `--color-primary`, `--color-accent`, `--color-rule`). Respects `prefers-reduced-motion`. Mobile breakpoint at 640px (thumbs reflow to ~30 % width, arrows tighten to image edges, modal goes full-viewport).
- `npm run typecheck` → clean. `npm run build` → clean (`Gallery-*.js` 32.43 kB / 11.57 kB gzip).

**Files changed:**
- `src/data/galleryItems.ts` *(new)*
- `src/components/gallery/GalleryCarousel.tsx` *(new)*
- `src/components/gallery/GalleryHero.tsx` *(new)*
- `src/components/gallery/GalleryThumbnails.tsx` *(new)*
- `src/components/gallery/GalleryLightbox.tsx` *(new)*
- `src/pages/Gallery.jsx` — swapped placeholder block for `<GalleryCarousel />`; surrounding hero + Ready-to-Order CTA untouched
- `src/App.css` — appended ~480 lines under "GALLERY — Custom Creations Carousel" header
- `public/gallery/cake-01.png … cake-22.png` *(new, 22 files, ~4.0 MB total)*
- `package.json` / `package-lock.json` — `embla-carousel-react ^8.x` added

**What's next:**
1. James QA pass at 1440 px + 375 px viewports (hero touch-swipe, thumbnail auto-center under heavy navigation, lightbox focus trap + ESC, dot indicator wrap on narrow screens).
2. Carolina to review the placeholder alt text in `src/data/galleryItems.ts` and replace with her preferred descriptions / occasion mappings.
3. Compress the 22 cake PNGs to WebP (~70 % savings) before launch — current set totals ~4 MB.
4. Optional follow-up: surface filter pills (re-use `galleryCategories.ts`) inside the carousel shell once Carolina tags each cake by occasion.

---

## Session — 2026-05-21 (Visual verification of Hybrid pricing)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `chore/catalog-csv-migration` (commit a584807)

**Verification results (all pass):**
1. **19 price changes — ALL MATCH:** Playwright extracted `.pcard__price` text from each category page at 1440px viewport; all 19 rendered values match expected prices exactly.
2. **3 zero-delta products — ALL RENDER:** `whole-wheat-challah` ($8.50, unchanged), `custom-celebration-cake` ("Call", price null), `custom-wedding-cake` ("Call", price null) — all render correctly on their respective category pages.
3. **Image spot-check — 4/5 PASS:** `plain-challah-large`, `chocolate-crown-babka`, `chocolate-chip-cookies-dozen`, `mothers-day-cookie-bouquet` all load real `.webp` photos (naturalWidth 1122px). `lemon-meringue-pie` shows `coming-soon.png` — **not a regression** (this product has no `image` field in the catalog; it is not one of the 43 image-wired products).
4. **Console errors — NONE:** Dev server output clean, no catalog-related warnings or errors.
5. **Screenshots saved:** 12 full-page PNGs at `qa/screenshots/hybrid-pricing-verify/` covering all affected category pages + holiday pages + menu hub + cakes page.

**No regressions detected.** Branch is visually clean for merge review.

---

## Session — 2026-05-21 (Hybrid pricing model — Phase 1 wired)

**Tool:** Claude Code (Opus 4.7)
**Branch:** `chore/catalog-csv-migration`

**What was done:**
- Added `squareToken?: string` field to the `Product` interface in `src/data/products.ts`
- Built a conservative slug → SquareToken mapping table (22 products) in the new `scripts/sync-prices.mjs`
- Ran the sync: 22 products now carry a `squareToken` and have Square-current prices stamped in `src/data/products.generated.ts`
- 19 real price changes applied to `products.generated.ts` (small adjustments — biggest deltas: rosh-hashanah-gift-basket -$10, lemon-meringue-pie -$5, icy-bun-tray -$4, mothers-day-cookie-bouquet +$3.50)
- Deleted the orphan `scripts/generate-products.mjs` (broken since `src/menuData.js` was removed in c8b9851)
- Added `npm run sync-prices` to package.json
- Updated `products.generated.ts` header comment to reflect that it's now a curated source with CSV-driven price sync (not auto-generated)
- All 66 Playwright tests pass on the new prices
- Build clean

**Conservative-mapping rationale:**
- Only single-SKU-to-single-SKU matches are mapped. Curated trays / dozens / platters / boxes are intentionally NOT mapped to Square's per-piece SKUs (e.g. wedding-cookies tray $28 vs Square's per-cookie $3.95 would crash to a wrong price)
- All 22 image-wired products in the priority set are mapped where a clean match exists; ambiguous cases stay on their curated price
- Rerunning `npm run sync-prices` is idempotent — 0 changes second time through

**What's next:**
1. Carolina/Chris review of price deltas before merging to main
2. Expand the SLUG_TO_SQUARE_TOKEN table as the bakery breaks out more single-SKU equivalents in Square (e.g. separate small/full-size pies, separate dozen/tray rows for cookies)
3. Add `webServer` block to `playwright.config.ts` so the test suite is self-contained (currently requires `vite preview --port 4173` to be running)

---

## Session — 2026-05-21 (verification of catalog CSV migration)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `chore/catalog-csv-migration` (commit 3253dab)

**Verification results (all pass):**
1. CSV parse: 9-col header, 467 data rows, 2 blank dividers, 3 sections (Regular Menu 296, Friday 37, Holidays 134) — PASS
2. `products.generated.ts` byte-identical to parent cf3d6ce: 130 products, 43 image slugs — PASS
3. `npm run build`: clean, no warnings — PASS
4. Playwright suite: 66/66 passed (note: needs `vite preview --port 4173` running; no `webServer` in config) — PASS
5. Image cross-check: 43 referenced slugs ↔ 43 files on disk, zero orphans, zero missing — PASS
6. `generate-products.mjs` still references deleted `src/menuData.js` (lines 84, 88) — confirmed known broken from c8b9851, not a regression — PASS

---

## Session — 2026-05-21 (catalog CSV migration to Square POS export)

**Tool:** Claude Code (Opus 4.7)
**Branch:** `chore/catalog-csv-migration` (commit 3253dab)

**What was done:**
- Took the Square POS catalog export `MLV1171MHFNF4_catalogue-2026-05-15-1828.csv` (545 rows, 36 cols) and produced a cleaned, sectioned 9-column file
- Replaced `grodzinski_products.csv` at the repo root (old: 4 cols / 538 rows → new: 9 cols / 467 rows + section dividers)
- **New CSV schema:** `Section, Group, Category, Item, Price, Unit, Taxable, Description, SquareToken`
- **Three sections:** Regular Menu (296 rows, 6 families: Breads · Cakes · Cookies · Pastries · Sandwiches & Savouries · Catering) · Friday (37, all challah + bilka) · Holidays (134, Jewish calendar order + civil holidays)
- **Cleanups applied:** curly→ASCII quotes, Square POS shorthand renamed for readability (`Chan-Cookies`→`Chanukah Cookies`, `Roshashana`→`Rosh Hashanah`, `Cust.Cookie`→`Custom Cookie`, `Bubka\Chocolatestrip\`→`Bubka / Chocolate Strip`, etc.), back-of-house dropped (Ingredients · Coffee/Tea · Soft Drinks · Whipped cream · Meringue powder · Day old bag · Miscellaneous)
- **Catering prices blanked** (quote-only on the site)
- **SquareToken preserved** as the stable join key for future price syncs

**Pictures stay connected:** `src/data/products.generated.ts` was NOT touched — the 43 wired product images remain linked via their existing curated slugs.

**What's next (Hybrid pricing model — chosen direction):**
1. Add a `squareToken: string` field to each entry in `src/data/products.generated.ts`, mapping each of the 130 curated products to a row in the new CSV (manual matching — slugs don't overlap; start with the 43 image-wired products as the priority set)
2. Rewrite `scripts/generate-products.mjs` (currently broken — references deleted `src/menuData.js`) to:
   - Use the curated catalog as the source of truth for slug / name / description / image / category / dietary tags / occasion
   - Pull `price`, `priceUnit`, and tax flag from `grodzinski_products.csv` joined by `SquareToken`
3. Add `npm run sync-prices` wiring so the catalog stays current with Square price changes (29 price deltas already observed in this export)

---

## Session — 2026-05-21 (repo cleanup)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `chore/cleanup-stale-docs` (1 commit, not pushed)

**What was done:**
- Deleted root `screenshots/` directory (12 PNGs, duplicate of `qa/screenshots/`)
- Deleted `qa/READY-TO-MERGE.md` (merge guide for `design/heritage-pass`, already merged in eb6b120)
- Deleted `cleanup-audit-phase-0.md`, `cleanup-phase-summary.md`, `final-launch-readiness.md` (stale audit docs from completed cleanup pass)
- 16 files removed, 807 line deletions; working tree clean

**Not touched (intentionally):**
- `copy-revision-proposal.md` — still awaiting client signoff
- `docs/archive/` — already properly archived
- All config, source, and test files

---

## Session — 2026-05-15 (portrait video layout fixes)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `feat/holidays-and-filters` (continued)

**What was done:**
- Fixed "A Toronto Tradition Since 1888" block: wrapped video in `.home-about__media-frame` with `max-height: clamp(360px, 55vh, 520px)`, `max-width: 420px`, `aspect-ratio: 4/5`, `object-fit: cover`, right-aligned with `margin-left: auto` and `align-self: center`
- Fixed 3 About-page video cards: added `backdrop` mode to `VideoBackground` component — renders video twice (blurred cover background + contain foreground) for no sidebars while preserving full frame
- Added CSS classes `.video-bg--backdrop`, `.video-bg__blur-layer`, `.video-bg__main-layer` with blur/scale/opacity treatment
- Set uniform `aspect-ratio: 4/5` on all about-image-card backdrops
- Removed fixed `height: 200px` / `height: 160px` from `.about-image-card__img` that conflicted with aspect-ratio sizing
- Respects `prefers-reduced-motion` — falls back to poster images in backdrop mode
- Build passes cleanly

**Files changed:**
- `src/components/VideoBackground.tsx` — added `backdrop` prop + dual-layer rendering
- `src/pages/Home.jsx` — wrapped showcase video in `.home-about__media-frame`
- `src/pages/About.jsx` — switched 3 video cards from `objectFit="contain"` to `backdrop`
- `src/App.css` — media-frame constraints, backdrop layer styles, removed stale fixed heights

---

## Session — 2026-05-15 (7-page IA: Holidays + dietary filters)

**Tool:** Cursor Agent (Opus 4.6)
**Branch:** `feat/holidays-and-filters` (7 commits, based on `design/heritage-pass`)

**What was done:**
- Implemented the 7-page information architecture: Home · Menu · **Holidays** · Catering · Gallery · About · Visit
- Added `/holidays` route tree: hub page (11 occasions), per-occasion pages, holiday product detail pages
- Created `DietaryFilter` component with 7 dietary tag pills (pareve, dairy, eggs, nuts, sesame, sugar-free, gluten-free)
- Extended `Product` interface with optional `dietaryTags`, `occasion`, `hebrew`, `isSeasonal`, `isBestseller` fields
- Created `HOLIDAY_OCCASIONS` (11 occasions) and `HOLIDAY_OCCASION_META` with placeholder descriptions
- Mapped 18 existing products to their holiday occasions based on existing tags
- Extended `filterStore.ts` with `activeTags` (DietaryTag[]) alongside existing `DietaryAttribute` filters
- Added Holidays to Navbar (between Menu and Catering), Footer, and Homepage CTA
- Refactored `ProductCard` and `ProductGrid` to accept `linkPrefix` for holiday route support
- All 66 tests pass (38 smoke + 18 a11y + 10 filter interaction) across desktop-1440 and mobile-375
- Rollout report at `qa/holidays-rollout-report.md`

**What's next:**
1. Merge `design/heritage-pass` to `main` (PR already open)
2. Review and merge `feat/holidays-and-filters` (PR opened, awaiting James review)
3. Carolina's product review → populate `dietaryTags` + additional `occasion` mappings in CSV
4. Update `generate-products.mjs` to read from CSV directly (menuData.js retired)
5. Replace placeholder hero images on holiday occasion pages with actual photography
6. Remaining launch blockers from `final-launch-readiness.md` (contact form, favicon, domain, logo)

---

## Overnight session — 2026-05-14 (heritage redesign)

**Tool:** Claude Code (Opus 4.7), overnight autonomous run
**Branch:** `design/heritage-pass` — 8 commits, pushed to origin
**Track A — Redesign (Modern Jewish Heritage / Levain–Eli Zabar lineage):**
- New design tokens at `:root`: navy `#0E2A47` primary, marzipan `#E8C58A` accent, hero gold `#B8860B` (decorative) + `#876205` text-safe gold, cocoa ink `#2A1810` on warm cream `#FAF6EE`.
- Type swapped from Fraunces+DM Sans to Cormorant Garamond + Inter + Frank Ruhl Libre (Hebrew). Border radii capped at 12px. All site-wide gradients flattened. Single 0 1px 2px shadow token. `<MotionConfig reducedMotion="user">` wraps the app.
- Navbar: Cormorant wordmark, Inter caps-tracked links, gold underline active, focus-trapped 320px mobile drawer.
- Home hero: single full-bleed image, one navy CTA, gold italic heritage badge.
- Footer: navy ground, Cormorant wordmark, marzipan column titles, gold rule above copyright.
- MenuHub + product cards (.pcard): cream + 1px warm-rule + navy hover border, gold prices, Cormorant 500 20px navy product names.
- ProductPage: two-column, Cormorant italic 500 18px first-sentence lede + Inter 400 16px body.
- `#c5dafc` eradicated everywhere active in src.

**Track B — QA verification:**
- Playwright + axe + @lhci/cli installed as dev deps. `tests/a11y.spec.ts` + `tests/smoke.spec.ts` cover /, /menu, /menu/challah-bilkas, /about, /visit at 1440 + 375 viewports.
- Initial axe run caught 3 contrast traps from the redesign — all fixed in the same Track B commit (b81efd9). Full audit + W3C luminance computations in `qa/post-redesign-report.md`.
- Final: 20/20 Playwright tests pass; Lighthouse a11y 98-100 across 8 (route × device) runs; BP + SEO = 100 site-wide.

**Track C — Recovery gate:** PASS (axe 0, Lighthouse a11y ≥ 95, zero text contrast fails).
- Branch pushed: `origin/design/heritage-pass`.
- Merge instructions + side-by-side diff in `qa/READY-TO-MERGE.md`.
- 12 fresh screenshots saved at `qa/screenshots/`.

**Next steps:**
1. Review `qa/READY-TO-MERGE.md` + screenshots; open PR from `design/heritage-pass`.
2. Once merged, schedule the four "don't touch this pass" route redesigns (catering, gallery, about, visit) — they currently inherit the new tokens but use pre-existing section CSS.
3. Add visually-hidden h2 to feature strip on Home + category-strip on MenuHub (heading-order fix → restores 100 Lighthouse a11y).
4. Compress `home/logo.png` (1.87 MB) — biggest remaining first-paint cost; documented in cleanup-phase-summary.md Phase 5.

## Last session — 2026-05-14

**Tool:** Claude Code (Opus 4.7)
**What was done:**
- Ran the 8-phase cleanup prompt end-to-end in one pass.
- 11 commits on `main` from `8c30c45` (prior cleanup completion) to `0e8ea5f`.
- Audit + summaries: `cleanup-audit-phase-0.md`, `cleanup-phase-summary.md`, `final-launch-readiness.md`, `copy-revision-proposal.md`.
- Highlights: 565 MB photoshoot source moved out of `public/`; JS bundle -32 %; CSS bundle -30 %; lazy routes via Suspense; 404 page + ErrorBoundary + skip-link added; emoji-to-Lucide already done (Phase 2 was a no-op); production meta tags + JSON-LD + robots + sitemap + README rewrite.

**What's next:**
1. Resend backend wiring for `/api/contact` (Phase 4.2 — deferred; both submit handlers carry TODOs).
2. Favicon image generation per `README.md` "Production checklist".
3. Chris + Carolina sign-off on `copy-revision-proposal.md` (About-page edits).
4. Pick canonical domain; update 5 hard-coded references to `grodzinskibakery.com`.
5. Compress `home/logo.png` (1.87 MB, loads on every page).
6. Fix Gallery wedding/baby cookie 16-of-18 404 (`Gallery.jsx:29-33` hardcoded hash suffix).
7. Run Lighthouse manually against staging once the above land.
