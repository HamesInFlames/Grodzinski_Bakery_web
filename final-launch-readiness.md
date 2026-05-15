# Final launch readiness — Grodzinski Bakery website

**Date:** 2026-05-14
**Pre-pass commit:** `8c30c45`
**Post-pass commit:** `0e8ea5f`
**Commits this pass:** 11

This document is the Phase 8 deliverable per the eight-phase cleanup prompt. It records what was verified, what could not be verified from this CLI environment, and the remaining blockers before connecting the production domain.

---

## Build verification

| check | status | notes |
|---|---|---|
| `npm run build` | ✅ clean | 776 ms; 19 chunks; no rollup warnings |
| `npm run typecheck` | ✅ clean | `tsc --noEmit` over `src/` + `vite-env.d.ts` |
| `npm audit` | ✅ 0 vulnerabilities | Down from 5 (3 moderate + 2 high) before `sharp` was removed |
| Dev server (`npm run dev`) starts | ✅ | http://localhost:5174 during the audit (5173 was held briefly) |
| Preview server (`npm run preview`) starts | ✅ | http://localhost:4173 |

## Bundle output

```
dist/index.html                                  4.81 kB │ gzip:   ~1 kB
dist/assets/index-DjGwvq5n.css                  56.28 kB │ gzip:  10.19 kB
dist/assets/index-DqJ66LkN.js  (entry)         371.30 kB │ gzip: 119.02 kB
dist/assets/CategoryPage-...js                  93.41 kB │ gzip:  30.09 kB  (incl. fuse.js)
dist/assets/products-...js                      33.94 kB │ gzip:   7.18 kB
dist/assets/VisitUs-...js                       10.91 kB │ gzip:   3.68 kB
dist/assets/Home-...js                           9.64 kB │ gzip:   2.68 kB
dist/assets/Gallery-...js                        8.25 kB │ gzip:   3.05 kB
dist/assets/Catering-...js                       6.93 kB │ gzip:   2.37 kB
dist/assets/About-...js                          6.06 kB │ gzip:   2.30 kB
dist/assets/ContactForm-...js                    3.61 kB │ gzip:   1.49 kB
... (per-icon and small-component chunks)
```

The prompt's bundle-size target was "< 200 KB gzipped JS, < 50 KB gzipped CSS." **Both met**: entry JS is 119 kB gz; CSS is 10 kB gz. The CategoryPage's 30 kB gz fuse.js dependency only loads when the user actually opens a category — first-paint pages are well under target.

## Route smoke test

Hit every documented route on the preview server (HTTP code):

```
200 /
200 /menu
200 /menu/challah-bilkas
200 /menu/bread-rolls
200 /menu/cakes
200 /menu/cookies
200 /gallery
200 /catering
200 /about
200 /visit
200 /locations              (renders Navigate to /visit)
200 /contact                (renders Navigate to /visit)
200 /robots.txt
200 /sitemap.xml
200 /site.webmanifest
200 /not-a-real-page        (renders NotFound)
```

All 16 paths return 200; the catch-all NotFound route renders for unmatched paths (SPA: server returns index.html with status 200, React Router decides the page).

## Visual sweep (Playwright)

The `scripts/take-screenshots.mjs` script (now `SCREENSHOT_BASE_URL`-driven) ran headless against `http://localhost:4173/`. 12 PNGs landed in `screenshots/` — 6 routes × {desktop 1440, mobile 390}.

**Caveat**: `motion`'s `useInView` gates `opacity: 0` on `ScrollReveal` / `StaggerContainer` elements until they enter the viewport. Playwright's `fullPage: true` takes the screenshot without simulating scroll, so sections below the initial fold appear blank in the screenshots even though they render fine for a real user who scrolls. The above-fold content (hero, navbar, first 1–2 sections) renders correctly on every page in both viewports.

This is not a regression introduced by the cleanup — it's the existing animation model.

## Cross-browser

**Not verified from this session.** No browser instrumentation beyond the headless Chromium that Playwright uses. Recommended: a 10-minute manual sweep in Chrome, Safari, and Firefox once the favicons and Resend backend are in place. The dev server and preview server are both straightforward to start (`npm run dev` / `npm run preview`).

## Lighthouse

**Not run from this session.** Run Chrome DevTools Lighthouse against `npm run preview` (or the staging Railway deployment) once. Per the Phase 5 deferred items, the largest remaining performance opportunity is compressing `public/images/home/logo.png` (1.87 MB) and the two `cor_logo*.png` files (~1 MB each); they load on every page from Navbar + Footer.

## Pre-launch checklist

| item | status | owner / next step |
|---|---|---|
| All photos for Shoot 1 processed and added to `public/images/products/` | ❌ | Photographer / client — the `imageSlug` plumbing was removed pending real photos. Reintroduce the `Product.imageSlug` field + `/images/products/<slug>.jpg` convention when the shoot lands. |
| Favicon files in place (`favicon.ico`, `favicon-{16,32,180,192,512}x{...}.png`) | ❌ | Generate via Realfavicongenerator.net from `public/images/home/logo.png` at brand color `#faf7f2`; drop into `public/`. `index.html` is already wired. |
| Meta tags + Open Graph image set | ✅ | OG image points at `https://grodzinskibakery.com/images/home/logo.png` — works once the logo is the final, compressed version. |
| `robots.txt` + `sitemap.xml` in place | ✅ | Both ship from `public/` and resolve at runtime (verified 200). |
| LocalBusiness JSON-LD on the home page | ✅ | Inline in `index.html`, so on every page. |
| Contact form works end-to-end (Resend integration verified with a real test send) | ❌ | Deferred Phase 4.2. Both submit handlers carry `TODO(phase-4.2)`. The form *appears* to submit successfully but does not actually send anything. |
| No `console.log` left in production code | ✅ | Audit confirmed: 0 `console.log/warn/info/debug`. One `console.error` remains in `ContactForm.jsx:52` (error path) and one in `ErrorBoundary.jsx:11` — both intentional. |
| No `alert()` left in production code | ✅ | Both call sites replaced. |
| Bundle: < 200 KB gzipped JS, < 50 KB gzipped CSS | ✅ | 119 KB gz JS entry; 10 KB gz CSS. |
| No broken images | ⚠️ partial | The `imageSlug` fallback was removed (no more silent 404 loops). Gallery wedding/baby cookie sections still 404 16 of 18 thumbnails per visit (hardcoded hash suffix in `Gallery.jsx:29-33` doesn't match on-disk filenames); the `onError` fallback masks them visually but the requests are wasted. **Recommend fixing in a follow-up by replacing the templated arrays with a curated `string[]` of real on-disk paths.** |
| All routes return 200 | ✅ | All 16 paths verified. |
| `npm run build` produces no warnings | ✅ | |
| `.env.example` committed; `.env` not | ❌ | `.env.example` not created — Phase 4.2 deferral. When the Resend wiring lands, create `.env.example` with the three variable names from `README.md`. |
| Domain connected (`grodzinskibakery.com` or `grodzinskinorthbakery.com`) | ❌ | Pending. Update `index.html` `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`image`, plus `public/sitemap.xml` URLs and `public/robots.txt` Sitemap line. Currently all hard-coded to `grodzinskibakery.com`. |

## Remaining blockers before public launch

1. **Contact form does not send anything.** This is the single most embarrassing class of bug at launch. Either:
   - Wire Phase 4.2 (Resend + Express endpoint), or
   - Replace the form with a "mailto:" link pointing at `info@grodzinskibakery.com` until the backend lands.
2. **Favicon is the default Vite logo.** Generate the favicon pack.
3. **About page lineage copy.** `copy-revision-proposal.md` has the four edits ready to apply — needs Chris + Carolina sign-off.
4. **Domain choice.** Pick the canonical URL and propagate. Hard-coded to `grodzinskibakery.com` in 5 places (listed above).
5. **Logo compression.** `home/logo.png` is 1.87 MB; loads every pageview. Compress to ~50 KB WebP/AVIF.

## What was NOT changed (user's pre-existing work)

The user had three uncommitted edits in `public/images/home/` when this pass began. They remain uncommitted on this branch and were not touched by any cleanup commit:

```
 M public/images/home/cor_logo.png
 D public/images/home/logo.jpg
 M public/images/home/logo.png
?? public/images/home/cor_logo_white.png
```

`logo.jpg` shows as deleted in `git status` but isn't referenced anywhere in `src/`; safe to either commit the deletion or restore from git. The two `cor_logo*` changes and `logo.png` modification appear to be image re-exports — visible diff is binary, so review on the file system or in an image viewer before committing.

## Commit log (cleanup pass)

```
0e8ea5f feat: production meta tags, JSON-LD, robots, sitemap, README   (Phase 7)
311b58a copy: replace lineage claims with institution-led heritage     (Phase 6)
22c5af8 perf: lazy-load every route via Suspense + code-split          (Phase 5.1)
6cb7358 feat(a11y): lightbox Escape key, label icon-only buttons, ...  (Phase 4.6-4.7)
26cd4d2 feat: add 404 page, error boundary, and skip-to-content link   (Phase 4.3-4.4)
7a0eccc chore: replace alert()s with ContactForm built-in success UI   (Phase 4.1, 4.8)
d650265 chore(css): drop dead rules and broken @font-face block        (Phase 3)
26d1a36 chore: relocate one-off photo pipeline, drop sharp, ...        (Phase 1)
1ea8a87 chore: drop dead imageSlug fallback and retire productData.js  (Phase 1)
819d1e7 chore: move 565 MB photoshoot source out of public/images/     (Phase 1)
cbd7678 chore: archive stale top-level docs and tighten .gitignore     (Phase 1)
```

## Verdict

**The codebase is in materially better shape than at `8c30c45`:** build/CDN weight down 565 MB, JS bundle down 32 %, CSS down 30 %, 0 audit vulnerabilities, accessibility baseline raised, all routes verified. **It is not yet launchable** under a public domain because the contact form does not send anything, the favicon is the default Vite logo, and the canonical domain hasn't been chosen. Those three plus the About-page copy sign-off are the gate to flipping DNS.
