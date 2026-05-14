# Post-redesign QA report — `design/heritage-pass`

**Date:** 2026-05-14
**Branch:** `design/heritage-pass`
**Preview server:** `http://localhost:4173/` (built with `npm run build`, served with `npm run preview`)
**Tools:** Playwright 1.x + @axe-core/playwright 4.11 + Lighthouse 12 (via `@lhci/cli`)

---

## TL;DR

- **axe violations: 0** across all 5 audited routes × 2 viewports (10 page audits).
- **Console errors: 0** across the same 10 page audits.
- **Lighthouse Accessibility ≥ 98** on every audited route, desktop + mobile (Visit + About: 100; Home + Menu: 98, deducted only for a pre-existing `<h3>` after `<h1>` jump in the un-headered feature/category-strip sections — **not** introduced by this branch).
- **Lighthouse Best Practices + SEO = 100** on every audited route.
- **All new colour combinations clear WCAG 2.1 AA 4.5:1 for text** (table below). The two contrast traps I introduced during Track A — gold #B8860B on cream (3.01:1) and gold #B8860B on navy (4.47:1) — were caught by axe in the first run and fixed before the final report.

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

### Violations the redesign *initially* introduced, and how each was resolved

Captured by the first axe pass before the contrast fix landed:

| # | Selector | fg / bg | Computed ratio | WCAG req | Fix |
|---|---|---|---|---|---|
| 1 | `footer .footer__title` (5 routes) | `#B8860B` / `#0E2A47` | 4.47:1 | 4.5:1 | Recoloured to `var(--color-accent)` (marzipan `#E8C58A`) → **8.87:1** |
| 2 | `.menuhub__trust-item` on `/menu` | `#B8860B` / `#FAF6EE` | 3.01:1 | 4.5:1 | Introduced `--color-gold-text: #876205` for gold-as-text on cream → **5.15:1** |
| 3 | `.category-page__products` muted captions on `/menu/challah-bilkas` | `#8A7868` / `#FAF6EE` | 3.92:1 | 4.5:1 | Darkened `--text-muted` from `#8A7868` to `#6F5C46` → **5.90:1** |
| 4 | `.visit-*` muted text on `#F5F0ED` band | `#8A7868` / `#F5F0ED` | 3.73:1 | 4.5:1 | Same fix as #3; on `#F5F0ED` the new `#6F5C46` measures **5.59:1** |

Every other gold-on-cream surface (hero heritage badge, MenuHub trust line, ProductPage heritage line, ProductCard price, ProductPage price) was switched to `--color-gold-text` in the same pass. The original `--color-gold: #B8860B` is now reserved for decorative use only (the 1px footer rule).

---

## 2 · Lighthouse scores

Reports saved under `qa/lighthouse/{route}-{device}.json`. Single run per (route × device), default Lighthouse 12 desktop / mobile presets, Chromium headless.

| Route | Device | Performance | A11y | Best Pr. | SEO |
|---|---|---:|---:|---:|---:|
| `/` | desktop | 83 | **98** | 100 | 100 |
| `/` | mobile | 67 | **98** | 100 | 100 |
| `/menu` | desktop | 90 | **98** | 100 | 100 |
| `/menu` | mobile | 63 | **98** | 100 | 100 |
| `/about` | desktop | 84 | **100** | 100 | 100 |
| `/about` | mobile | 71 | **100** | 100 | 100 |
| `/visit` | desktop | 78 | **100** | 100 | 100 |
| `/visit` | mobile | 63 | **100** | 100 | 100 |

### A11y deduction — `heading-order`

The 2-point deduction on `/` and `/menu` is a single audit failure: `heading-order` flags `feature-card__title` (h3) appearing immediately after the hero h1 with no h2 section header in between. Same shape on `/menu` where category cards use h2 but the hero is h1 → h2 → h2-jumping inside the grid.

This is a **pre-existing structural** finding, present on `main@0e8ea5f` before this branch began; it is not a regression. Out of scope for this pass (would require restructuring the section headers in Home.jsx and MenuHub.tsx, beyond a visual redesign brief). Flag for a follow-up.

### Performance deduction

Mobile Performance hovers in the 63–71 range. The root cause is documented in the prior cleanup pass (`cleanup-phase-summary.md` Phase 5 deferred): `public/images/home/logo.png` is 1.87 MB, loads on every page through Navbar + Footer. This branch removes the `<img>` from Navbar and Footer in favour of a Cormorant wordmark, so first-paint is **lighter** than `main`, but `cor_logo.png` still loads in Footer and the hero `thumbnail_slider (5).jpg` is large. Compressing those images and adopting `vite-imagetools` are the open items.

Desktop Performance ranges 78–90 — well above the conventional 75 threshold; Menu is the best at 90 because its hero is text-only (no full-bleed image background).

---

## 3 · Contrast audit — every new colour combination

Luminance computed via the W3C WCAG 2.1 formula (sRGB → linear → `0.2126 R + 0.7152 G + 0.0722 B`). Contrast `= (L_lighter + 0.05) / (L_darker + 0.05)`.

| Combination | Hex fg | Hex bg | Ratio | WCAG 2.1 AA |
|---|---|---|---:|---|
| Cocoa ink on cream (body text) | `#2A1810` | `#FAF6EE` | **15.7:1** | ✅ AAA |
| Navy on cream (headlines, nav links) | `#0E2A47` | `#FAF6EE` | **12.8:1** | ✅ AAA |
| Cocoa-secondary on cream (subhead) | `#574235` | `#FAF6EE` | **8.95:1** | ✅ AAA |
| Muted (post-fix) on cream | `#6F5C46` | `#FAF6EE` | **5.90:1** | ✅ AA |
| Muted (post-fix) on warm cream band | `#6F5C46` | `#F5F0ED` | **5.59:1** | ✅ AA |
| Gold-text on cream (hero badge, trust, prices) | `#876205` | `#FAF6EE` | **5.15:1** | ✅ AA |
| Cream on navy (CTA, footer body) | `#FAF6EE` | `#0E2A47` | **12.8:1** | ✅ AAA |
| Marzipan accent on navy (footer h4) | `#E8C58A` | `#0E2A47` | **8.87:1** | ✅ AAA |
| Cream on warm brown (catering hero) | `#FAF6EE` | `#5C4033` | **8.05:1** | ✅ AAA |
| Gold (decorative rule) on navy | `#B8860B` | `#0E2A47` | 4.47:1 | ⚪ N/A — 1px decorative line, not text |

The five spec-mandated combinations:
- **cream / navy** (text on body bg) → 12.8:1 ✅
- **cream / cocoa** (body text on bg) → 15.7:1 ✅
- **navy / cream** (CTA text on cream button-on-cream is N/A; CTA is cream-on-navy, see above) → ✅
- **navy / gold** — N/A as text; the only gold-on-navy *element* is the decorative rule (1px)
- **cream / gold** — N/A as text; uses `--color-gold-text` for textual gold

The original brief named `--color-gold #B8860B` as the price/wordmark/rule token. WCAG 2.1 AA blocks #B8860B as text on either cream or navy; the resolution was to introduce a sibling text-safe token `--color-gold-text #876205` and reserve the original for the decorative footer rule only. The visual "gold" reading is preserved (both tones land in the 35–55° hue, mid–dark luminance).

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
