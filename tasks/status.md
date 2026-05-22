# Session status — Grodzinski website

## Session — 2026-05-21 (lightbox grid overflow fix)

**Tool:** Claude Code (Opus 4.7)
**Branch:** main (no commit — change is uncommitted in `src/App.css`)

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
**Branch:** main (no commit yet — awaiting James review)

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
