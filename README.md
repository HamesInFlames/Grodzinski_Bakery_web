# Grodzinski Bakery — Website

Custom heritage-brand marketing site for **Grodzinski Bakery**, a kosher,
European-style bakery in Thornhill, Ontario serving the Greater Toronto Area
since 1888.

- **Live:** [grodzbakery.com](https://grodzbakery.com) → canonical
  [grodzinskinorthbakery.com](https://grodzinskinorthbakery.com)
  (`grodzbakery.com` 301-redirects to the canonical host at the DNS layer)
- **Repo:** [`HamesInFlames/Grodzinski_Bakery_web`](https://github.com/HamesInFlames/Grodzinski_Bakery_web)
- **Built & maintained by:** [Kim Consultant](https://kimconsultant.net) for
  Chris and Carolina (who also own [Tova's Bakery](https://tovasbakery.com))

---

## 1. Overview

A single-page React application (client-side routed) presenting the bakery's
story, menu, holiday offerings, catering, and location/contact details. The
site is **fully static** — there is no application server. The contact form
delivers straight to email via a hosted relay (see [Forms](#forms)).

### Pages

| Path | Page | Notes |
|---|---|---|
| `/` | Home | |
| `/menu` | Menu hub | **Currently a "Coming Soon" placeholder** on production |
| `/holidays` | Holidays hub | **Currently a "Coming Soon" placeholder** on production |
| `/catering` | Catering | |
| `/about` | About | |
| `/visit` | Visit Us | Location, hours, map, and contact form |
| `/gallery` → `/` | redirect | |
| `/locations`, `/contact` → `/visit` | redirect | |
| `*` | 404 | |

> **Menu & Holidays are intentionally placeholders.** While James finalizes
> the product catalog, the production branch (`live-build`) ships "Coming Soon"
> pages for `/menu` and `/holidays`, and all of their sub-routes redirect back
> to the hub. The full configurator-style menu lives on `main` (work in
> progress). See [Branches](#branches).

### Key features

- **Kosher-certification marquee** on every page — an auto-scrolling banner of
  **COR Certified · Nut Free · Pas Yisroel · Chalav Yisroel** badges.
- **Configurator menu pattern** (on the full menu): auto-rotating product
  imagery paired with clickable variant lists and per-variant pricing.
- **Cross-site nav** — a persistent "Visit Tova's Bakery" button linking to the
  sister bakery.
- **Dietary tags** — Pareve / Dairy only (Gluten Free was removed).
- **Accessibility baseline** — skip-link, semantic landmarks, reduced-motion
  support, and an axe-core test pass (see [Testing](#9-testing)).

---

## 2. Tech stack

| Layer | Tool |
|---|---|
| Framework | React 19 + React Router 7 (`react-router-dom`) |
| Language | TypeScript 6 (**strict mode**) + JSX |
| Build | Vite 7 — **`rolldown-vite@7.1.14`** pinned via an npm `override` |
| Styling | Tailwind CSS **3** + hand-written CSS (`src/App.css`, `src/menu-redesign.css`) |
| Animation | **`motion`** (the Motion package — *not* `framer-motion`; do not install the latter) |
| Icons | `lucide-react` |
| State | Zustand (persisted dietary filters — `src/stores/filterStore.ts`) |
| Search | Fuse.js (client-side fuzzy search) |
| Carousels / drawers | `embla-carousel-react` + `vaul` (**not Swiper**) |
| Image pipeline | `vite-imagetools` (opt-in `?product` / `?thumb` imports) |
| Forms | **Web3Forms** hosted email relay (no backend) |

There is **no Express server, no Resend, and no database** — the entire site is
prerendered static assets plus the client-side Web3Forms POST.

---

## 3. Prerequisites

- **Node.js 20+** (no version is pinned in the repo; React 19 + Vite 7 require
  20 or newer).
- **npm** (the repo uses `package-lock.json`).

---

## 4. Getting started

```bash
git clone https://github.com/HamesInFlames/Grodzinski_Bakery_web.git
cd Grodzinski_Bakery_web
npm install
npm run dev          # http://localhost:5173
```

To run the contact form against your own inbox locally, set
`VITE_WEB3FORMS_ACCESS_KEY` (see [Environment variables](#8-environment-variables)).
The form also has a working key committed as a fallback, so it works out of the
box in dev.

---

## 5. Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server (HMR) on `:5173` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | `tsc --noEmit` over `src/` (**not** part of `build`) |
| `npm run sync-prices` | Sync prices into the catalog (`scripts/sync-prices.mjs`) |
| `node scripts/generate-catalog.mjs` | Regenerate the product catalog from the CSV (see below) |
| `npx playwright test` | Run the Playwright suite (e2e + accessibility) |

---

## 6. Project structure

```
index.html                     Vite entry — meta tags + JSON-LD
grodzinski_products.csv        Source catalog (POS export) — pipeline input
playwright.config.ts           E2E / a11y test config
tailwind.config.js  vite.config.ts  tsconfig*.json  postcss.config.cjs

src/
  main.jsx                     React root
  App.jsx                      Router, lazy routes, ErrorBoundary, page chrome
  App.css / index.css          Global + hand-written styles
  menu-redesign.css            BEM styles for /menu surfaces
  components/                  Cross-cutting UI
    Navbar.jsx, Footer.jsx, KosherBanner.tsx, TovaButton.tsx,
    ContactForm.jsx, GoogleMap.jsx, AnimationWrappers.jsx,
    ErrorBoundary.jsx, LoadingFallback.jsx,
    catalog/, filters/, layout/, ui/
  pages/                       Top-level pages (.jsx)
    Home, About, Catering, VisitUs, NotFound
  routes/                      Nested /menu + /holidays routes (.tsx)
    MenuLayout, MenuHub, HolidaysLayout, HolidaysHub, ...
  data/
    products.ts                Catalog types + helpers (DietaryTag, etc.)
    products.generated.ts      AUTO-GENERATED — do not hand-edit
    galleryCategories.ts       Gallery filter categories
  stores/filterStore.ts        Zustand (persisted dietary filters)
  lib/sendContactMessage.js    Web3Forms POST helper

public/images/                 Site assets (logos, product/home photos, certs)
scripts/                       Build-time + photo tooling (see Data pipeline)
tests/                         Playwright specs
tools/                         One-off photo-pipeline scripts (out of build)
tasks/                         Project status / decisions log
```

---

## 7. Data pipeline

The menu catalog is generated from a CSV — never hand-edit the generated file.

```
grodzinski_products.csv  ──►  node scripts/generate-catalog.mjs  ──►  src/data/products.generated.ts
```

1. Edit `grodzinski_products.csv` (the POS-exported product list).
2. Run `node scripts/generate-catalog.mjs` — this overwrites
   `src/data/products.generated.ts` and maps item slugs to product photos in
   `public/images/products/`.
3. To refresh prices only, use `npm run sync-prices`.

Supporting image tooling also lives in `scripts/` (`generate-lqip.mjs`,
`optimize-product-images.mjs`, `wire-images.mjs`) and `tools/` (rembg/relight
scripts) — these are one-off helpers, not part of `npm run build`.

---

## 8. Environment variables

The only runtime variable is the Web3Forms access key. Put it in a
`.env` at the repo root (gitignored) for local dev, and in the Railway
service's **Variables** tab for production:

```
VITE_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

<a name="forms"></a>
**How the form works:** the browser POSTs submissions directly to
`https://api.web3forms.com/submit`; Web3Forms emails them to
**info@grodzbakery.com**. No server is involved. The access key is owned by
that inbox (create one at [web3forms.com](https://web3forms.com)). A hidden
honeypot field guards against spam, and `replyto` is set to the customer's
address. A working key is also committed as a fallback in
`src/lib/sendContactMessage.js`.

---

## 9. Testing

The QA harness runs against a running build via Playwright:

| Tool | Purpose |
|---|---|
| `@playwright/test` | End-to-end / smoke flows |
| `@axe-core/playwright` | Accessibility (WCAG 2.1 / 2.2 AA) |
| `@lhci/cli` (Lighthouse CI) | Performance / SEO budgets |

```bash
npx playwright test          # e2e + a11y
npx lhci autorun             # Lighthouse (if configured)
```

---

## 10. Deployment

- **Host:** Railway — auto-deploys on push.
- **DNS / CDN / security:** Cloudflare.
- **Build command:** `npm install && npm run build`
- **Output:** static `dist/` (served by Railway's static host or `vite preview`).
- **Canonical domain:** `grodzinskinorthbakery.com`. `grodzbakery.com`
  301-redirects to it at the Cloudflare DNS layer. The `<link rel="canonical">`
  / OG tags in `index.html` and `sitemap.xml` already point at the canonical
  host.

### Branches

| Branch | Role |
|---|---|
| **`live-build`** | **Production.** Menu & Holidays are "Coming Soon" placeholders while the catalog is finalized. |
| `main` | Full menu/holidays build — work in progress; not yet finished. |

### Pre-launch checklist (favicons)

Favicons referenced by `index.html` should be generated before launch
(currently 404):

- `public/favicon.ico` (16/32/48), `favicon-16x16.png`, `favicon-32x32.png`
- `favicon-180x180.png` (Apple touch), `favicon-192x192.png`,
  `favicon-512x512.png` (Android)

Generate with [realfavicongenerator.net](https://realfavicongenerator.net/)
from `public/images/home/logo.png`, background `#faf7f2`.

---

## 11. Content updates (for maintainers)

Common "how do I change…" tasks:

- **Change a product or price** — edit `grodzinski_products.csv`, then
  `node scripts/generate-catalog.mjs` (or `npm run sync-prices` for prices
  only). Commit the regenerated `products.generated.ts`. See
  [Data pipeline](#7-data-pipeline).
- **Swap a product photo** — drop the new image at
  `public/images/products/<slug>.webp` (run `scripts/optimize-product-images.mjs`
  to optimize) and confirm the slug→photo mapping in `generate-catalog.mjs`.
- **Update hours / address / phone / email** — edit the Visit Us page
  (`src/pages/VisitUs.jsx`) and `src/data/bakeryLocation.js`.
- **Edit holiday offerings** — update the holidays data/routes under
  `src/routes/` and `src/data/`.
- **Bring the Menu/Holidays pages back online** — merge the finished `main`
  build into `live-build` (replacing the "Coming Soon" hubs).
- **Where the contact form goes** — change the recipient by reissuing the
  Web3Forms key for a different inbox; update `VITE_WEB3FORMS_ACCESS_KEY`.

---

## 12. License & ownership

Proprietary. © Grodzinski Bakery. All rights reserved.
Designed and built by **Kim Consultant** — [kimconsultant.net](https://kimconsultant.net).
