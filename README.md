# Grodzinski Bakery — Website

Marketing site for **Grodzinski Bakery**, a kosher European-style bakery in
Thornhill, Ontario serving the Greater Toronto Area since 1888.

Built and maintained by [Kim Consultant](https://kimconsultant.net) for
Chris and Carolina.

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19, React Router 7 |
| Build | Vite (`rolldown-vite@7.1.14` via npm override) |
| Styling | Tailwind 3 + hand-written CSS (`src/App.css`, `src/menu-redesign.css`) |
| Animation | `motion` (Framer Motion successor) |
| Icons | `lucide-react` |
| State | Zustand (`src/stores/filterStore.ts`) |
| Search | Fuse.js (client-side) |
| Image pipeline | `vite-imagetools` (configured for `?product` / `?thumb`; opt-in per import) |
| Backend (form) | Express + Resend — **not wired yet**; see Phase 4.2 of `cleanup-audit-phase-0.md` |
| Deploy | Railway, auto-deploy on push to `main` |

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle into dist/
npm run preview    # serve dist/ locally
npm run typecheck  # tsc --noEmit on src/ (does NOT run as part of build)
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/menu` | Menu hub (category grid) |
| `/menu/:category` | Category page (product list + filters) |
| `/menu/p/:slug` | Product detail |
| `/gallery` | Photo gallery |
| `/catering` | Catering info |
| `/about` | About the bakery |
| `/visit` | Location + hours + contact form |
| `/locations`, `/contact` | Redirect → `/visit` |
| `*` | 404 page |

## File layout (top-level)

```
index.html                          Vite entry point + meta + JSON-LD
grodzinski_products.csv             Raw POS export (NOT consumed at runtime;
                                    kept for product list cross-reference)
src/
  main.jsx                          React root
  App.jsx                           Router + lazy routes + ErrorBoundary
  App.css                           Global hand-written styles (cleaned 2026-05-14)
  index.css                         Tailwind directives + body baseline
  menu-redesign.css                 BEM block for /menu/* surfaces
  components/                       Cross-cutting components
    Navbar.jsx, Footer.jsx, ErrorBoundary.jsx, LoadingFallback.jsx,
    ContactForm.jsx, GoogleMap.jsx, AnimationWrappers.jsx,
    catalog/, filters/, layout/, ui/
  pages/                            Top-level pages (.jsx)
    Home.jsx, About.jsx, Gallery.jsx, Catering.jsx, VisitUs.jsx, NotFound.jsx
  routes/                           Nested /menu routes (.tsx)
    MenuLayout.tsx, MenuHub.tsx, CategoryPage.tsx, ProductPage.tsx
  data/
    products.ts                     Type + helper exports for the catalog
    products.generated.ts           Auto-generated (see below)
    galleryCategories.ts            14 gallery filter categories
  stores/
    filterStore.ts                  Zustand store (persisted dietary filters)
public/images/                      Site assets (home thumbnails, logos)
                                    NOTE: 565 MB of photoshoot source was
                                    moved out to _photos-source/ (gitignored)
                                    in the Phase 1 cleanup pass.
scripts/
  generate-products.mjs             Regenerates data/products.generated.ts
  take-screenshots.mjs              Playwright sweep for screenshots
tools/photo-pipeline/               One-off rembg/CUDA photo scripts (out of build)
tasks/                              Project doc / status / decisions
docs/archive/                       Older audit/strategy docs
```

## Adding or updating a product

1. Edit `grodzinski_products.csv` (4-column format: `Category,Product,Price,Description`).
2. Run `node scripts/generate-products.mjs` — overwrites `src/data/products.generated.ts`.
3. (Optional) Drop a product photo at `public/images/products/<slug>.jpg`
   and re-wire the `imageSlug` field in the Product interface +
   `ProductCard.tsx` + `ProductPage.tsx` (currently both default to the
   slider thumbnail; the fallback was removed in cleanup).

## Environment variables (production)

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx        # for /api/contact (not wired yet)
CONTACT_RECIPIENT_EMAIL=info@grodzinskibakery.com
CONTACT_FROM_EMAIL=noreply@grodzinskibakery.com
```

Copy these to a `.env` file at the repo root (gitignored). For Railway,
add them under the service's Variables tab.

## Deployment (Railway)

1. Connect the GitHub repo to a Railway service.
2. Build command: `npm install && npm run build`.
3. Start command: Railway serves the static `dist/` via the `vite preview`
   port or a separate static-host service — pick whichever your Railway
   project is configured for. (If running an Express server for the
   contact form, point Railway at that entry point instead.)
4. Domain: `grodzinskinorthbakery.com` (canonical, shown in the address bar).
   `grodzbakery.com` 301-redirects to it at the DNS layer (Cloudflare). The
   `index.html` canonical/OG tags and `sitemap.xml` are already set to it.

## Production checklist (favicon, etc.)

Favicons referenced from `index.html` that need to be generated before
the real domain goes live (currently 404):

- `public/favicon.ico` — 16x16, 32x32, 48x48 ICO
- `public/favicon-16x16.png`, `public/favicon-32x32.png`
- `public/favicon-180x180.png` (Apple touch)
- `public/favicon-192x192.png`, `public/favicon-512x512.png` (Android)

Recommended generator: [Realfavicongenerator.net](https://realfavicongenerator.net/)
fed `public/images/home/logo.png` with background color `#faf7f2`.

## Maintainer

Kim Consultant — kimconsultant.net
