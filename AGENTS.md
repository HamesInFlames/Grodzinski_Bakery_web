# AGENTS.md — project conventions

## Project
- Name: Grodzinski Bakery website
- Developer: James (Kim Consultant)
- Stack: React 19, React Router 7, TypeScript + JSX, Vite (rolldown-vite), Tailwind CSS 3, Motion, lucide-react, embla-carousel-react, Playwright
- Repo: github.com/HamesInFlames/Grodzinski_Bakery_web

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npx playwright test` (needs the site served at http://localhost:4173, for example `npm run preview`)
- Lint: none
- Typecheck: `npm run typecheck`
- Other: `npm run sync-prices`, `npm run audit-photos`

## Code conventions
- Animation uses the `motion` package. Do not install `framer-motion`.
- Styling is Tailwind 3 plus hand-written CSS (`src/App.css`, `src/menu-redesign.css`).
- `src/data/products.generated.ts` is auto-generated. Do not hand-edit it (see README).
- Pages are in `src/pages` (.jsx). Nested menu and holiday routes are in `src/routes` (.tsx).
- Tests are in `tests/`. Playwright runs at 1440px and 375px widths.

## Workflow
- Read tasks/todo.md before starting work
- Update tasks/status.md after each session
- Log decisions in tasks/decisions.md
- Run `npm run build` before committing

## Do NOT
- Change existing styling, copy or behaviour the task did not ask about
- Install packages without documenting in tasks/decisions.md
- Modify deployment config without approval
- Delete .env files

## Lessons
<!-- added by /kc-workflow:reflect -->
