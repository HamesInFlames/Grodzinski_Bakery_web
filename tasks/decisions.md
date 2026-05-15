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

## 2026-05-15: Holidays + Dietary Filters (7-page IA)

### Architecture
- Holidays hub-and-spoke mirroring Menu: `/holidays` (hub), `/holidays/:occasion`, `/holidays/:occasion/p/:slug`
- `HolidaysLayout` wraps holiday routes with `<Outlet />` (same pattern as `MenuLayout`)
- `OccasionPage` reuses `CategoryPage` CSS classes and patterns (shared visual grammar)
- `ProductCard` + `ProductGrid` refactored with `linkPrefix` prop to support both `/menu/p` and `/holidays/:occasion/p` link targets
- `DietaryFilter` component: horizontal pill bar with DIETARY_TAGS const, aria-pressed buttons, 44×44px touch targets
- `filterStore.ts` extended with `activeTags` (DietaryTag[]) alongside existing `activeFilters` (DietaryAttribute[]) — additive, not breaking
- Document titles set via `useEffect(() => { document.title = ... })` rather than JSX `<title>` element (React 19 JSX title hoisting inconsistent with axe a11y checks)
- 18 existing products mapped to occasions via `occasion` field based on existing tags
- No new packages installed

### What was NOT changed
- Existing DietaryAttribute type and activeFilters kept intact (new DietaryTag is additive)
- FilterChipBar and FilterSheet unchanged (DietaryFilter added alongside them)
- No colors, fonts, or design tokens changed — all CSS uses existing `--color-*` variables
- No changes to Resend backend, About-page copy, domain references, logo, or favicon
