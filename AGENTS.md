# AGENTS.md — project conventions

## Project
- Name: Grodzinski Bakery website
- Developer: James (Kim Consultant)
- Stack: React 19 + React Router 7 (`react-router-dom`), TypeScript (strict) + JSX, Vite (`rolldown-vite@7.1.14` pinned via npm `overrides`), Tailwind CSS 3 + hand-written CSS, `motion`, `lucide-react`, `embla-carousel-react`, `vite-imagetools`, Playwright + axe-core + Lighthouse CI for QA. Contact form uses the Web3Forms hosted relay (no backend).
- Repo: github.com/HamesInFlames/Grodzinski_Bakery_web
- Deploy: Railway (per README); DNS/CDN via Cloudflare. Canonical domain grodzinskinorthbakery.com.
- Branches: `live-build` is production (Menu and Holidays are "Coming Soon" placeholders); `main` holds the full menu/holidays build, still in progress.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Typecheck: `npm run typecheck` (not part of build)
- Sync prices: `npm run sync-prices`
- Photo audit: `npm run audit-photos`
- Test: no `test` script in package.json; README documents `npx playwright test` (e2e + accessibility)
- Lint: none configured

## Code conventions
- Mixed `.jsx` (pages, most components) and `.tsx` (routes, some components).
- Styling: Tailwind 3 plus hand-written CSS in `src/App.css`, `src/index.css`, `src/menu-redesign.css`.
- Animation: the `motion` package (import from `motion/react`), never `framer-motion`.
- Icons: `lucide-react`.
- Product catalog is generated: edit `grodzinski_products.csv`, run `node scripts/generate-catalog.mjs` to regenerate `src/data/products.generated.ts`.
- Photos are webp under `public/images/products/`, kebab-case names (see `photo-import-plan.md`).
- Env: optional `VITE_WEB3FORMS_ACCESS_KEY` in a root `.env` (gitignored); see README section 8.

## Workflow
- Read tasks/todo.md before starting work
- Update tasks/status.md after each session
- Log decisions in tasks/decisions.md
- Run `npm run build` before committing

## Do NOT
- Install packages without documenting in tasks/decisions.md
- Modify deployment config without approval
- Delete .env files
- Hand-edit `src/data/products.generated.ts` (auto-generated; README)
- Install `framer-motion` (README: use `motion` instead)
- Refactor the menu-redesign-scope files from cleanup-audit.md section 0g that still exist (`src/routes/MenuHub.tsx`, `src/routes/MenuLayout.tsx`, `src/data/products.ts`); that audit is dated May 2026 and its other paths are gone, so confirm it is still current

## Lessons
<!-- added by /kc-workflow:reflect -->
