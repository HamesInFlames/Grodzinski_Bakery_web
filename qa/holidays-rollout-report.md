# Holidays & Dietary Filters Rollout Report

**Branch:** `feat/holidays-and-filters`
**Base:** `design/heritage-pass` (HEAD `eb6b120`)
**Date:** 2026-05-15
**Author:** Cursor Agent (Opus 4.6)

---

## Commits (6 phases)

| Phase | Commit | Description |
|---|---|---|
| 1 — Data layer | `549406f` | Add dietary tags + holiday occasion types and scaffold |
| 2 — Routing | `57a3360` | Add /holidays route tree with lazy-loaded layout, hub, occasion, product |
| 3 — Holidays pages | `6f6cc47` | Implement hub, occasion, and product detail pages |
| 4 — Dietary filters | `c423dea` | Dietary tag filtering on menu category and occasion pages |
| 5 — Navigation | `58aad1e` | Add Holidays to primary navigation and footer |
| 6 — QA | `7725f29` | Smoke, a11y, and interaction tests for new pages |
| 7 — Report | *(this commit)* | Rollout report and status update |

---

## Routes added

| Path | Component | Status |
|---|---|---|
| `/holidays` | `HolidaysHub` | Working (11 occasion cards) |
| `/holidays/rosh-hashanah` | `OccasionPage` | Working (3 products) |
| `/holidays/sukkot` | `OccasionPage` | Working (0 products — awaiting Carolina's data) |
| `/holidays/chanukah` | `OccasionPage` | Working (3 products) |
| `/holidays/purim` | `OccasionPage` | Working (2 products) |
| `/holidays/pesach` | `OccasionPage` | Working (3 products) |
| `/holidays/shavuot` | `OccasionPage` | Working (2 products) |
| `/holidays/simchas` | `OccasionPage` | Working (3 products) |
| `/holidays/fathers-day` | `OccasionPage` | Working (1 product) |
| `/holidays/mothers-day` | `OccasionPage` | Working (1 product) |
| `/holidays/valentines` | `OccasionPage` | Working (1 product) |
| `/holidays/graduation` | `OccasionPage` | Working (0 products — awaiting Carolina's data) |
| `/holidays/:occasion/p/:slug` | `HolidayProductPage` | Working for all occasion-mapped products |

---

## Components added

| File | Type | Notes |
|---|---|---|
| `src/data/holidays.ts` | Data module | HolidayOccasion metadata + helpers |
| `src/routes/HolidaysLayout.tsx` | Layout | Thin Outlet wrapper (mirrors MenuLayout) |
| `src/routes/HolidaysHub.tsx` | Page | 11-card occasion grid, hero, trust badges |
| `src/routes/OccasionPage.tsx` | Page | Per-occasion product list with dietary filters |
| `src/routes/HolidayProductPage.tsx` | Page | Holiday product detail with occasion breadcrumbs |
| `src/components/filters/DietaryFilter.tsx` | UI component | Pill-style dietary tag filter bar |
| `tests/interactions/filters.spec.ts` | Test suite | 5 filter interaction tests (10 runs across viewports) |

---

## Files modified (terse)

- `src/data/products.ts` — Added DIETARY_TAGS, HOLIDAY_OCCASIONS, extended Product interface
- `src/data/products.generated.ts` — Added `occasion` + `isSeasonal` to 18 holiday products
- `src/stores/filterStore.ts` — Added `activeTags`, `toggleTag`, `clearAll`, `isActive`, `activeCount`
- `src/App.jsx` — Added 4 lazy-loaded holiday routes
- `src/components/Navbar.jsx` — Added Holidays between Menu and Catering
- `src/components/Footer.jsx` — Added Holidays link
- `src/pages/Home.jsx` — Added "See Holiday Menu" CTA
- `src/components/catalog/ProductCard.tsx` — Added `linkPrefix` prop
- `src/components/catalog/ProductGrid.tsx` — Pass through `linkPrefix`
- `src/routes/CategoryPage.tsx` — Added DietaryFilter + activeTags filtering
- `src/menu-redesign.css` — Added holidays hub + dietary filter CSS
- `scripts/generate-products.mjs` — Added occasion column-mapping + TODO for Carolina's CSV
- `tests/smoke.spec.ts` — Expanded to 19 routes (all occasions)
- `tests/a11y.spec.ts` — Added holidays hub + occasion routes

---

## Test results

| Suite | Total | Passed | Failed |
|---|---|---|---|
| Smoke (2 viewports × 19 routes) | 38 | 38 | 0 |
| Axe a11y (2 viewports × 9 routes) | 18 | 18 | 0 |
| Filter interactions (2 viewports × 5 tests) | 10 | 10 | 0 |
| **Total** | **66** | **66** | **0** |

All tests run against `npm run preview` at `localhost:4173`.
Viewports: desktop-1440 (1440×900) and mobile-375 (375×812).

---

## Build output

```
Entry JS:  373.33 kB (119.59 kB gzip)
CSS:        67.31 kB  (11.79 kB gzip)
```

Within existing bundle targets (< 200 kB gzip JS, < 50 kB gzip CSS).
Holiday components are properly code-split — HolidaysHub, OccasionPage, HolidayProductPage each get their own chunks.

---

## Deferred / TODO

1. **Carolina's product data review** — Most holiday products have `occasion` set based on existing tags, but `dietaryTags` is empty on all products. Once Carolina's review CSV adds `dietary_tags` and `occasion` columns, run the generate script to populate these.
2. **Holiday occasion descriptions** — Placeholder descriptions in `HOLIDAY_OCCASION_META` need sign-off from Chris + Carolina via `copy-revision-proposal.md`.
3. **Sukkot and Graduation** — 0 products currently mapped. Carolina's review will populate these.
4. **Holiday hero images** — All occasion pages use `/images/coming-soon.png`. Replace with actual photography when the second photoshoot lands.
5. **generate-products.mjs** — Script depends on retired `menuData.js`; cannot run until the data pipeline is updated to read from `grodzinski_products.csv` directly.
6. **Existing launch blockers** (unchanged from `final-launch-readiness.md`): contact form doesn't send, favicon is Vite default, About-page copy needs sign-off, domain not chosen, logo needs compression.

---

## How to take this to production

1. Carolina's review doc comes back → update `grodzinski_products.csv` with dietary tags + occasion mappings
2. Update `scripts/generate-products.mjs` to read directly from CSV (menuData.js was retired)
3. Run `node scripts/generate-products.mjs` to regenerate `products.generated.ts`
4. Verify holiday products populate correctly on all occasion pages
5. Replace placeholder hero images on occasion pages
6. Re-run QA harness: `npm run build && npm run preview -- --port 4173 && npx playwright test`
7. Merge `design/heritage-pass` to `main` first, then merge this branch
8. Deploy to Railway staging and verify
