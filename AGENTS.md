# AGENTS.md — Universal AI Agent Configuration

## Project
- Name: Grodzinski Bakery Website
- Company: Kim Consultant (kimconsultant.net)
- Client: Chris and Carolina
- Developer: James
- Stack: React 19 + Vite (rolldown-vite) + React Router 7 + Motion + Tailwind 3 + Express + Resend; deploy on Railway
- Icons: lucide-react (no emoji as functional icons)

## Code conventions
- TypeScript for new code; existing .jsx kept as-is (gradual migration)
- React functional components with hooks only
- Motion library for animations
- Tailwind utility classes for new components; legacy hand-written CSS in src/App.css being phased down
- ESM imports, no CommonJS
- Path alias: `@/*` resolves to `src/*`

## Workflow
- Read tasks/todo.md before starting work
- Update tasks/status.md after each session
- Log decisions in tasks/decisions.md
- Run npm run build before committing
- Test at 1440px and 375px viewports

## Do NOT
- Install packages without documenting in decisions.md
- Modify Railway config without approval
- Delete .env files
