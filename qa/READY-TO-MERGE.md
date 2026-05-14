# READY TO MERGE — `design/heritage-pass`

**Date:** 2026-05-14
**Branch:** `design/heritage-pass` (8 commits ahead of `main`)
**Pushed:** ✅ `origin/design/heritage-pass`
**Open PR:** https://github.com/HamesInFlames/Grodzinski_Bakery_web/pull/new/design/heritage-pass
**Track C gate:** ✅ PASS (axe 0, Lighthouse a11y ≥ 98, zero text contrast fails)

---

## What changed — side by side

| surface | before (`main@0e8ea5f`) | after (this branch) |
|---|---|---|
| **Palette** | brown `#5C4033` primary + light-blue `#c5dafc` accent (WCAG 1.33:1) | navy `#0E2A47` primary + marzipan `#E8C58A` accent + cocoa ink, all on warm cream `#FAF6EE` |
| **Type stack** | Fraunces serif + DM Sans body | Cormorant Garamond serif + Inter body + Frank Ruhl Libre (Hebrew + wordmark candidate); Playfair removed (was already absent) |
| **Navbar** | bitmap logo + sentence-case pill links with primary-light background fill on active | Cormorant Garamond 600 "Grodzinski" wordmark + Inter 600 14px uppercase tracked-0.05em links; active link gets a 1px `#B8860B` gold underline 4px below the link — no pill, no fill |
| **Mobile drawer** | basic slide-in, no focus trap | 320px cream-ground `aside role="dialog"` with proper focus trap (Tab/Shift-Tab cycle), Escape-to-close that returns focus to the toggle, ARIA `aria-modal` + `aria-controls` + `aria-expanded` |
| **Home hero** | two-column: text + side image with three floating feature pills | single centred composition over a 32%-opacity full-bleed image; Cormorant 500 64px navy headline / Inter 18px 540px-cap subhead / gold italic heritage badge "A Toronto heritage bakery — since 1888" / one navy CTA |
| **Button system** | brown gradients, transform-lift hover, `--shadow-lg` shadows, 16px radii | flat navy fill, 1px borders, 8px radius, 150ms colour-only transitions; no lift, no shadow shift; focus-visible ring is 2px gold offset 2px |
| **Footer** | brown `#4A3328` ground, bitmap logo, white-on-brown gray links, brown-borrowed dividers | navy `#0E2A47` ground, Cormorant 600 cream wordmark, four columns (Visit / Hours / Contact / Brand), marzipan-gold uppercase Inter titles, cream body text, 1px gold horizontal rule above the copyright line |
| **Menu hub** | brown gradient hero band with white text; photo-as-card tiles with dark scrim and white-on-image text | cream-ground hero with navy display headline; cream + 1px warm-rule cards, image on top, Cormorant 500 20px navy product name, hover deepens border to navy (no transform, no shadow change) |
| **Category page** | brown overlay on hero image | navy `rgba(14,42,71,0.7)` overlay on hero image |
| **Product cards (`.pcard`)** | gray-bordered, hover lifts 4px with `--shadow-lg`, `--brown-700` price | cream, 1px warm-rule, hover sets border to navy, Cormorant 500 20px navy name, Inter 600 16px gold price |
| **Product page** | one-column-feel, gray heritage line, brown price | two-column desktop / stacked mobile; Cormorant 500 40px navy title with -0.5% tracking; gold-uppercase Inter heritage line; gold Inter 600 24px price; description splits on the first sentence — Cormorant italic 500 18px lede then Inter 400 16px body |
| **Site-wide gradients** | 10 linear-gradient declarations (heroes + scrims + CTA overlays) | 0 gradients — flattened to solid navy / brown fills and single-alpha rgba scrims for the image overlays |
| **Site-wide shadows** | `--shadow-md/lg/xl` in active use across nav, cards, hero | collapsed to a single subtle `0 1px 2px rgba(0,0,0,0.04)`; only used where elevation is structurally required |
| **Border radii** | 6 / 8 / 12 / 16px (xl widely used) | 4 / 8 / 12px max (xl token folded to lg) |
| **#c5dafc** | 3 occurrences in `App.css` (1 outline, 1 token, 1 comment) | 0 active occurrences (single doc-comment remains as the audit trail) |
| **Motion** | mixed-up timings + opacity reveals, no global config | `<MotionConfig reducedMotion="user">` wraps the app in `main.jsx`; component transitions are 150ms ease-out for hover, 600ms for scroll fade |

8 commits, in order:

```
b81efd9 qa: add Playwright/axe/Lighthouse harness and post-redesign report
e32c58e design(product-page): two-column layout, italic lede + Inter body
3b7557d design(menu): cream hub + cards, gold prices, navy hover border
e438d24 design(footer): navy ground, cormorant wordmark, gold rule + columns
1940502 design(home-hero): single full-bleed image, one navy CTA, gold heritage badge
07659fe design(navbar): heritage wordmark, uppercase Inter links, gold underline
77cf1d7 design(tokens): swap to Modern Jewish Heritage palette + type system
(branched from 0e8ea5f main)
```

---

## QA scores

| | desktop | mobile |
|---|---:|---:|
| **axe violations (5 routes)** | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 |
| **Lighthouse Performance** | 83 / 90 / 84 / 78 | 67 / 63 / 71 / 63 |
| **Lighthouse A11y** | **98 / 98 / 100 / 100** | **98 / 98 / 100 / 100** |
| **Lighthouse Best Pr.** | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| **Lighthouse SEO** | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

Columns: home / menu / about / visit.

Full detail (per-violation table, W3C luminance contrast computation for every new colour pair, h3-after-h1 explanation for the 2-point a11y deduction): `qa/post-redesign-report.md`.

---

## Screenshots

Captured against `http://localhost:4173/` via `scripts/take-screenshots.mjs` after `npm run build`. Saved at `qa/screenshots/{route}-{viewport}.png`:

- `qa/screenshots/home-desktop.png`
- `qa/screenshots/home-mobile.png`
- `qa/screenshots/menu-desktop.png`
- `qa/screenshots/menu-mobile.png`
- `qa/screenshots/about-desktop.png`
- `qa/screenshots/about-mobile.png`
- `qa/screenshots/visit-desktop.png`
- `qa/screenshots/visit-mobile.png`
- `qa/screenshots/catering-desktop.png` *(not redesigned this pass — pending content decisions)*
- `qa/screenshots/catering-mobile.png` *(ditto)*
- `qa/screenshots/gallery-desktop.png` *(ditto)*
- `qa/screenshots/gallery-mobile.png` *(ditto)*

The top-level `screenshots/` directory was overwritten in the screenshot run; those modifications were already uncommitted on `main` before this branch began and are still untouched in the working tree.

---

## What was deliberately NOT changed on this branch

Per the original brief's "DO NOT redesign" list — these surfaces still carry copy/photo decisions outstanding:

- `/gallery` route — visual content drives the layout
- `/catering` route — pending content brief
- `/about` route — pending Chris + Carolina sign-off on `copy-revision-proposal.md`
- `/visit` route — pending content brief
- Resend backend (Phase 4.2 from cleanup)
- Favicon pack (Phase 7.1 from cleanup)
- `logo.png` / `cor_logo*.png` (pre-existing uncommitted edits on `main` were left alone)
- Hard-coded `grodzinskibakery.com` domain references

Those four "don't touch" routes were not touched, but they **do** inherit the new design tokens through `:root`, so backgrounds / type / button styles / footer / navbar render with the heritage system; only their bespoke section CSS is unchanged. Each still passes axe with 0 violations after the contrast fixes landed.

---

## How to merge

The branch is up to date with `origin/design/heritage-pass`. From `main`:

```bash
git fetch origin
git checkout main
git merge --no-ff origin/design/heritage-pass -m "Merge design/heritage-pass: Modern Jewish Heritage redesign"
git push origin main
```

Or via the GitHub UI (PR open form):
https://github.com/HamesInFlames/Grodzinski_Bakery_web/pull/new/design/heritage-pass

After merge, delete the local + remote branch:

```bash
git branch -d design/heritage-pass
git push origin --delete design/heritage-pass
```

---

## Follow-up tickets (not blockers)

1. **`heading-order` audit on `/` and `/menu`** — feature/category strip uses h3 after h1 with no h2 section header. 2-point Lighthouse deduction. Add a visually-hidden h2 to each unheadered section.
2. **Mobile Performance** — `home/logo.png` 1.87 MB and the hero `thumbnail_slider (5).jpg` are the LCP load. Pre-existing Phase 5.2 deferred (see `cleanup-phase-summary.md`).
3. **`/catering`, `/gallery`, `/about`, `/visit` redesign** — the new design tokens render correctly on these routes, but the page-specific layouts (catering hero band, gallery card grid, about narrative, visit map block) still use the pre-redesign hierarchies. Schedule once the content briefs land.
4. **Hebrew typography** — `--font-display: 'Frank Ruhl Libre'` is wired and the body CSS targets `[lang="he"]`, but no current page uses Hebrew text. Apply when Hebrew copy lands.
5. **Fonts loading** — the new Google Fonts URL preconnects but does not preload the woff2. If LCP becomes blocked on font swap, add `<link rel="preload" as="font">` for Cormorant 500 + Inter 400.
