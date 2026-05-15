# Post-redesign QA report — `design/heritage-pass`

**Date:** 2026-05-14 (updated 2026-05-14, post-palette pivot)
**Branch:** `design/heritage-pass`
**Preview server:** `http://localhost:4173/` (built with `npm run build`, served with `npm run preview`)
**Tools:** Playwright 1.x + @axe-core/playwright 4.11 + Lighthouse 12

> **Update (palette pivot):** The original Track A landed a navy/marzipan palette; a follow-up brief pivoted to an espresso `#1F1410` ink on warm oat `#F0E5D5` cream — pulled from the existing logo backdrop and product-photo linen — and replaced the Cormorant text wordmark with the actual logo PNG across navbar / hero / footer. Two commits: `e5fc4a6` (palette) + `e79d500` (logo wiring). **Both QA runs are documented below.**

---

## TL;DR (post-pivot)

- **axe violations: 0** across all 5 audited routes × 2 viewports.
- **Console errors: 0** across the same 10 page audits.
- **Lighthouse Accessibility ≥ 98** on every audited route, desktop + mobile (Visit + About: 100; Home + Menu: 98, deducted only for the pre-existing `<h3>` after `<h1>` jump in un-headered feature/category-strip sections — **not** introduced by this branch).
- **Lighthouse Best Practices + SEO = 100** on every audited route.
- **All new colour combinations clear WCAG 2.1 AA 4.5:1 for text** (table below). The user's prediction of ~14:1 cream/espresso was almost exact — measured **14.46:1**.
- **Lighthouse Performance regressed** (desktop ~78 → ~70 average; mobile ~63 → ~56). Root cause is documented below: the logo PNG is 1.87 MB and now loads eagerly on every page surface (navbar + hero + footer) where the prior pass used text wordmarks. Compressing `home/logo.png` is the single biggest open performance lever — it sits as the top follow-up.

Track B → Track C gate: **PASS** (axe 0, Lighthouse a11y ≥ 95, no text contrast fails).

---

## 1 · axe-core results

`tests/a11y.spec.ts` scans 5 routes with tags `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` after networkidle + an 800ms settle for `ScrollReveal` opacity gates.

| Route | desktop-1440 | mobile-375 |
|---|---|---|
| `/` | ✅ 0 violations | ✅ 0 violations |
| `/menu` | ✅ 0 violations | ✅ 0 violations |
| `/menu/challah-bilkas` | ✅ 0 violations | ✅ 0 violations |
| `/about` | ✅ 0 violations | ✅ 0 violations |
| `/visit` | ✅ 0 violations | ✅ 0 violations |

### Post-pivot axe delta

Re-running the axe scan after the palette + logo commits produced **zero new violations** on top of the post–Track-B baseline. The espresso/oat tones strengthen every previously-flagged combination, so the Track B contrast fixes still pass cleanly (one of them — `--color-gold-text` — was re-tuned downward to keep its 4.5:1 floor on the darker oat ground, see the token-delta table below).

### Violations the redesign *initially* introduced, and how each was resolved

Captured by the first axe pass during Track A before the contrast fix landed:

| # | Selector | fg / bg | Computed ratio | WCAG req | Fix |
|---|---|---|---|---|---|
| 1 | `footer .footer__title` (5 routes) | `#B8860B` / `#0E2A47` | 4.47:1 | 4.5:1 | Recoloured to `var(--color-accent)` (marzipan `#E8C58A`) → **8.87:1** |
| 2 | `.menuhub__trust-item` on `/menu` | `#B8860B` / `#FAF6EE` | 3.01:1 | 4.5:1 | Introduced `--color-gold-text: #876205` for gold-as-text on cream → **5.15:1** |
| 3 | `.category-page__products` muted captions on `/menu/challah-bilkas` | `#8A7868` / `#FAF6EE` | 3.92:1 | 4.5:1 | Darkened `--text-muted` from `#8A7868` to `#6F5C46` → **5.90:1** |
| 4 | `.visit-*` muted text on `#F5F0ED` band | `#8A7868` / `#F5F0ED` | 3.73:1 | 4.5:1 | Same fix as #3; on `#F5F0ED` the new `#6F5C46` measures **5.59:1** |

Every other gold-on-cream surface (hero heritage badge, MenuHub trust line, ProductPage heritage line, ProductCard price, ProductPage price) was switched to `--color-gold-text` in the same pass. The original `--color-gold: #B8860B` is now reserved for decorative use only (the 1px footer rule).

---

## 2 · Lighthouse scores

Reports saved under `qa/lighthouse/{route}-{device}.json` (regenerable; gitignored). Single run per (route × device), default Lighthouse 12 desktop / mobile presets, Chromium headless.

### Post-pivot (current — espresso palette + logo PNG)

| Route | Device | Performance | A11y | Best Pr. | SEO |
|---|---|---:|---:|---:|---:|
| `/` | desktop | 65 | **98** | 100 | 100 |
| `/` | mobile | 55 | **98** | 100 | 100 |
| `/menu` | desktop | 75 | **98** | 100 | 100 |
| `/menu` | mobile | 57 | **98** | 100 | 100 |
| `/about` | desktop | 69 | **100** | 100 | 100 |
| `/about` | mobile | 57 | **100** | 100 | 100 |
| `/visit` | desktop | 70 | **100** | 100 | 100 |
| `/visit` | mobile | 57 | **100** | 100 | 100 |

### Pre-pivot (navy/marzipan + text wordmark)

For comparison, the Track B run before the palette + logo pivot:

| Route | Device | Performance | A11y |
|---|---|---:|---:|
| `/` | desktop | 83 | 98 |
| `/` | mobile | 67 | 98 |
| `/menu` | desktop | 90 | 98 |
| `/menu` | mobile | 63 | 98 |
| `/about` | desktop | 84 | 100 |
| `/about` | mobile | 71 | 100 |
| `/visit` | desktop | 78 | 100 |
| `/visit` | mobile | 63 | 100 |

### Performance deduction — what changed

The text-wordmark version paid zero bytes for branding. The pivot to logo PNG re-introduces `public/images/home/logo.png` (1.87 MB un-compressed) on:

- **Navbar** — eager `<img>` on every route, every page-view, since the navbar is fixed and renders on first paint.
- **Hero (`/`)** — eager `<img>` as the LCP element on the home page.
- **Footer** — lazy `<img>` on every route, but the same large file.

Lighthouse's mobile preset uses a slow 3G throttle, which amplifies the ~1.9 MB hit. Desktop preset uses fewer constraints but still has to fully decode the PNG before the navbar paints.

**Mitigation (deferred — not in this branch's scope):** compress `home/logo.png` to ~50 KB WebP/AVIF + add a 2x PNG fallback. This is the deferred Phase 5.2 item from `cleanup-phase-summary.md`. Doing it would likely recover most of the lost desktop performance and meaningfully improve mobile. None of this affects the gate criteria (axe + a11y), so the branch remains merge-ready under the original rule set, but the operational cost of merging without compressing the logo is a slower public-facing first paint.

### A11y deduction — `heading-order`

The 2-point deduction on `/` and `/menu` is a single audit failure: `heading-order` flags `feature-card__title` (h3) appearing immediately after the hero h1 with no h2 section header in between. Same shape on `/menu` where category cards use h2 but the hero is h1 → h2 → h2-jumping inside the grid.

This is a **pre-existing structural** finding, present on `main@0e8ea5f` before this branch began; it is not a regression. Out of scope for this pass (would require restructuring the section headers in Home.jsx and MenuHub.tsx, beyond a visual redesign brief). Flag for a follow-up.

### Performance deduction

Mobile Performance hovers in the 63–71 range. The root cause is documented in the prior cleanup pass (`cleanup-phase-summary.md` Phase 5 deferred): `public/images/home/logo.png` is 1.87 MB, loads on every page through Navbar + Footer. This branch removes the `<img>` from Navbar and Footer in favour of a Cormorant wordmark, so first-paint is **lighter** than `main`, but `cor_logo.png` still loads in Footer and the hero `thumbnail_slider (5).jpg` is large. Compressing those images and adopting `vite-imagetools` are the open items.

Desktop Performance ranges 78–90 — well above the conventional 75 threshold; Menu is the best at 90 because its hero is text-only (no full-bleed image background).

---

## 3 · Contrast audit — every new colour combination

Luminance computed via the W3C WCAG 2.1 formula (sRGB → linear → `0.2126 R + 0.7152 G + 0.0722 B`). Contrast `= (L_lighter + 0.05) / (L_darker + 0.05)`.

### Post-pivot palette (current)

| Combination | Hex fg | Hex bg | Ratio | WCAG 2.1 AA |
|---|---|---|---:|---|
| Espresso ink on oat (body text) | `#1F1410` | `#F0E5D5` | **14.46:1** | ✅ AAA |
| Espresso ink on elevated cream (card text) | `#1F1410` | `#FAF6EE` | **16.71:1** | ✅ AAA |
| Mahogany secondary on oat (text-secondary, ProductPage heritage) | `#3D2817` | `#F0E5D5` | **11.13:1** | ✅ AAA |
| Darker mahogany on oat (text-muted, subtitle captions) | `#5A4632` | `#F0E5D5` | **7.16:1** | ✅ AAA |
| Gold-text on oat (Pcard price, MenuHub trust, ProductPage price) | `#765306` | `#F0E5D5` | **5.60:1** | ✅ AA |
| Oat on espresso (hero subtitle, footer body, btn--primary text) | `#F0E5D5` | `#1F1410` | **14.46:1** | ✅ AAA |
| Oat tagline on espresso (hero italic Cormorant) | `#F0E5D5` | `#1F1410` | **14.46:1** | ✅ AAA |
| Heritage gold on espresso (footer h4 column titles) | `#B8860B` | `#1F1410` | **5.54:1** | ✅ AA |
| Espresso on gold (hero CTA — gold bg, espresso text) | `#1F1410` | `#B8860B` | **5.54:1** | ✅ AA |
| Espresso on amber (hero CTA hover — amber bg, espresso text) | `#1F1410` | `#C68642` | **5.92:1** | ✅ AA |
| Oat on warm brown (catering hero — pre-existing, untouched) | `#F0E5D5` | `#5C4033` | **7.71:1** | ✅ AAA |
| Heritage gold (decorative rule) on espresso | `#B8860B` | `#1F1410` | 5.54:1 | ⚪ N/A — 1px decorative line |

The five originally spec-mandated combinations re-stated against the new palette (the brief named cream / navy / cocoa / gold; "navy" no longer applies — espresso took its place):

- **cream / espresso** (text on espresso ground, every dark surface) → **14.46:1** ✅ — matches the user's "~14:1, AAA" prediction.
- **cream / oat** — N/A (these are both backgrounds in the new system; no text uses this pair).
- **espresso / oat** (body text on body bg) → **14.46:1** ✅ AAA.
- **espresso / gold** (hero CTA face) → **5.54:1** ✅ AA.
- **oat / gold** — N/A as text; gold-as-text on oat uses `--color-gold-text` (#765306) which measures 5.60:1 ✅.

### Pre-pivot palette (Track A → Track B, kept for delta tracking)

| Combination | Hex fg | Hex bg | Ratio | Status |
|---|---|---|---:|---|
| Cocoa `#2A1810` on cream `#FAF6EE` | `#2A1810` | `#FAF6EE` | 15.7:1 | ✅ AAA |
| Navy `#0E2A47` on cream `#FAF6EE` | `#0E2A47` | `#FAF6EE` | 12.8:1 | ✅ AAA |
| Marzipan `#E8C58A` on navy `#0E2A47` | `#E8C58A` | `#0E2A47` | 8.87:1 | ✅ AAA |
| Gold-text `#876205` on cream `#FAF6EE` | `#876205` | `#FAF6EE` | 5.15:1 | ✅ AA |
| Muted `#6F5C46` on cream `#FAF6EE` | `#6F5C46` | `#FAF6EE` | 5.90:1 | ✅ AA |

The pivot **strengthens** contrast across the board — every primary text combination is AAA-level. The previous palette's tight 5.15 / 5.90 minimums become 5.54 / 7.16 / 11.13 on the new tones, and the body-text reading hits 14.46.

### Tokens added / changed during the pivot

| Token | Pre-pivot | Post-pivot | Reason |
|---|---|---|---|
| `--color-bg` | `#FAF6EE` cream | `#F0E5D5` oat | matches product-photo linen + logo backdrop |
| `--color-bg-elevated` | *(absent)* | `#FAF6EE` | elevated cards stand out on the darker oat page |
| `--color-ink` | `#2A1810` cocoa | `#1F1410` espresso | matches logo backdrop |
| `--color-ink-soft` | *(absent)* | `#3D2817` mahogany | secondary text |
| `--color-primary` | `#0E2A47` navy | `#1F1410` espresso | brand colour collapses onto ink |
| `--color-accent` | `#E8C58A` marzipan | `#B8860B` heritage gold | per-brief swap |
| `--color-amber` | *(absent)* | `#C68642` crust amber | warm-tone hover accent |
| `--color-gold-text` | `#876205` | `#765306` | gold-as-text needs slightly darker tone on oat than on the previous lighter cream (5.60:1 vs 4.46:1 if untouched) |
| `--text-secondary` | `#574235` cocoa-soft | `var(--color-ink-soft)` (`#3D2817`) | aligns with the ink-soft token |
| `--text-muted` | `#6F5C46` | `#5A4632` | tuned darker so it still passes on the slightly darker `--bg-section` (oat-deeper) |
| `--primary-hover` | `#0A2038` navy-dark | `#3D2817` mahogany | espresso lifted into mahogany for the hover state |

---

## 4 · Smoke results

`tests/smoke.spec.ts` checks 200 status + exactly one `<h1>` + zero console errors per route. 10 / 10 pass.

```
✓ smoke: home (/)                       desktop + mobile
✓ smoke: menu (/menu)                   desktop + mobile
✓ smoke: category (/menu/challah-bilkas) desktop + mobile
✓ smoke: about (/about)                 desktop + mobile
✓ smoke: visit (/visit)                 desktop + mobile
```

Zero console errors during page load on any route.

---

## 5 · Files added by this report

- `playwright.config.ts` — chromium-only, desktop 1440 + mobile 375 projects
- `tests/a11y.spec.ts` — axe scan with WCAG 2.0/2.1/2.2 AA tags
- `tests/smoke.spec.ts` — 200 + h1 + console
- `qa/playwright-results.json` — raw Playwright reporter output
- `qa/lighthouse/{home,menu,about,visit}-{desktop,mobile}.json` — raw Lighthouse reports
