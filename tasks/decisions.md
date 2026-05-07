# Architecture Decisions — Grodzinski Website

## 2026-05-07: Menu Hub-and-Spoke Redesign

### New packages installed
- `zustand` — State management for filters (persisted) and future cart
- `vaul` — Bottom sheet primitive (Radix-based) for filter sheet and future cart drawer
- `fuse.js` — Client-side fuzzy search on products
- `vite-imagetools` (dev) — Build-time WebP/AVIF generation + srcset
- `sharp` (dev) — LQIP blur placeholder generation
- `typescript`, `@types/react`, `@types/react-dom` (dev) — TypeScript for new code
- `@vitejs/plugin-react` (dev) — Explicit React plugin for vite config

### Architecture
- Hub-and-spoke menu: `/menu` (hub), `/menu/:category`, `/menu/p/:slug`
- Nested routes under `<MenuLayout>` with reserved sticky bottom slot for future cart
- Zustand `filterStore` with persist middleware for dietary filters
- Zustand `cartStore` stub (Phase 2 swap-out point)
- New TypeScript files alongside existing JS (no migration of existing code)
- `products.generated.ts` auto-generated from `menuData.js` via `scripts/generate-products.mjs`
- CSS in separate `menu-redesign.css` to avoid modifying existing `App.css`

### What was NOT changed
- Existing pages (Home, Gallery, Catering, About, VisitUs) — untouched
- Existing `App.css` — not modified
- Existing `menuData.js` — kept as source data, still used by generation script
