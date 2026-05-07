# Cleanup Audit — Grodzinski Bakery Website

> **Generated:** May 7, 2026
> **Repo:** `c:\Users\xoxok\Projects\grodzinski-bakery`
> **Tracked files:** 1,264 (1,204 of those are images in `public/`)
> **Active entry:** `index.html` → `src/main.jsx` → `src/App.jsx`

---

## 0a. Dead Files (not imported anywhere)

These files exist in `src/` but are **not reachable** from the import tree rooted at `main.jsx → App.jsx`:

| File | Reason |
|------|--------|
| `src/pages/Contact.jsx` | Replaced by `/visit` redirect; never route-mounted |
| `src/pages/Locations.jsx` | Replaced by `/visit` redirect; never route-mounted |
| `src/pages/Menu.jsx` | Superseded by `src/routes/MenuHub.tsx` + `MenuLayout.tsx` |
| `src/menuData.js` | Only imported by dead `Menu.jsx` |
| `src/components/ProductCard.jsx` | Superseded by `src/components/catalog/ProductCard.tsx` |
| `src/components/LocationCard.jsx` | Only imported by dead `Locations.jsx` |
| `src/components/search/SearchOverlay.tsx` | No importer anywhere in app |
| `src/stores/cartStore.ts` | No importer; stub with no-op actions |
| `src/data/lqip.generated.ts` | No importer; exports empty `LQIP_MAP` object |

**Recommendation:** Delete all except those in section 0g (leave alone).

---

## 0b. Dead Code Within Files

### `src/pages/Home.jsx`
- **Unused imports (line 3):** `categories` and `categoryThumbnails` from `../productData` — JSX uses hardcoded `categoryImages` array instead

### `src/pages/VisitUs.jsx`
- **Unused default import (line 2):** `React` — not needed with automatic JSX runtime
- **console.log (line 10):** `console.log('Contact form submitted:', formData);`
- **Unused property:** `bakeryInfo.mapsUrl` (line 21) — never referenced in JSX

### `src/pages/About.jsx`
- **Unused default import:** `React` — not needed with automatic JSX runtime

### `src/pages/Catering.jsx`
- **Unused default import:** `React` — not needed with automatic JSX runtime

### `src/pages/Gallery.jsx`
- No issues found

### `src/pages/Contact.jsx` *(dead file — listed for completeness)*
- **Unused default import:** `React`
- **console.log (line 9):** `console.log('Contact form submitted:', formData);`
- **TODO (line 8):** "When backend is implemented…"

### `src/pages/Locations.jsx` *(dead file)*
- **Unused default import:** `React`

### `src/pages/Menu.jsx` *(dead file — in menu redesign scope)*
- **Unused default import:** `React` (hooks are used)

### `src/components/AnimationWrappers.jsx`
- **Unused import + re-export:** `AnimatePresence` is imported (line 5) and re-exported (lines 182–183) but never consumed from this module by any other file (all callers import `AnimatePresence` directly from `motion/react`)

### `src/components/ContactForm.jsx`
- **console.error (line 52):** `console.error('Form submission error:', error);` — *this is legitimate error reporting; keep*

### `src/components/ProductCard.jsx` *(dead file)*
- **Unused default import:** `React`

### `src/components/LocationCard.jsx` *(dead file)*
- **Unused default import:** `React`

### `src/productData.js`
- **Unused exports:** `products`, `getProductsByCategory`, `getProductsGroupedByCategory`, `formatPrice` — none are imported by any reachable file. Only `galleryCategories`, `categories`, and `categoryThumbnails` are imported (by `Home.jsx` and `Gallery.jsx`)

### `src/stores/filterStore.ts`
- **Dead action:** `setSearchQuery` is defined but has no callers anywhere in reachable code (SearchOverlay.tsx is the only caller and it's a dead file)

### `src/stores/cartStore.ts` *(dead file)*
- All actions are no-op stubs (`() => set((s) => s)`)

### Summary of console statements:
| File | Line | Type | Verdict |
|------|------|------|---------|
| `src/pages/VisitUs.jsx` | 10 | `console.log` | **Remove** |
| `src/pages/Contact.jsx` | 9 | `console.log` | Dead file — remove with file |
| `src/components/ContactForm.jsx` | 52 | `console.error` | **Keep** (genuine error reporting) |

### Commented-out code blocks (>2 lines):
None found across all `src/` files.

### TODO/FIXME comments:
| File | Line | Content |
|------|------|---------|
| `src/pages/Contact.jsx` | 8 | "When backend is implemented…" — dead file, will be deleted |

---

## 0c. Unused Dependencies

**Tool:** `npx depcheck` (v1.4.7)

### Unused dependencies (confirmed):
| Package | Verdict |
|---------|---------|
| `@21st-dev/magic` | **Remove** — not imported anywhere in src/ |
| `react-icons` | Used only in `src/components/Navbar.jsx` (3 icons: `AiOutlineMenu`, `AiOutlineClose`, `AiOutlinePhone`). The site also uses `lucide-react` everywhere else. **Candidate for removal** if Navbar icons are migrated to lucide. |

### Unused devDependencies (depcheck reports, but actually needed):
| Package | Why keep |
|---------|----------|
| `@tailwindcss/postcss` | Referenced by PostCSS pipeline (Tailwind 4 plugin) |
| `@types/react-dom` | TypeScript type support for React DOM |
| `autoprefixer` | Used in `postcss.config.cjs` |
| `postcss` | Build pipeline |
| `tailwindcss` | Core styling |
| `typescript` | TypeScript compilation for `.tsx` files |

### Confirmed used (no action):
`vite`, `@vitejs/plugin-react`, `vite-imagetools`, `react`, `react-dom`, `react-router-dom`, `motion`, `lucide-react`, `fuse.js`, `vaul`, `zustand`, `sharp` (scripts), `playwright` (scripts)

### Missing dependencies:
None reported.

---

## 0d. Asset Audit

### Image breakdown (all tracked):
| Location | Count | Notes |
|----------|-------|-------|
| `public/images/baked_goods/` | 625 | Product thumbnails (DO NOT DELETE) |
| `public/images/Photos/Raw/` | 355 | Original camera photos (HEIC, JPG) |
| `public/images/Photos/Enhanced/` | 189 | Processed PNG output from photo scripts |
| `public/images/home/` | 35 | Category thumbnails used on Home page |
| `public/vite.svg` | 1 | Vite favicon placeholder |
| **Total tracked images** | **1,204** | |

### Large file concerns:
- **Raw photos** (355 HEIC/JPG files) — these are the original camera files. Many are likely 2–8 MB each. They inflate the repo but are the source assets for the Enhanced pipeline.
- **Enhanced PNGs** (189 files) — transparent background PNGs, likely 1–5 MB each.
- **`yolov8n.pt`** — YOLOv8 nano model weights (~6.2 MB). **Untracked** per git status but exists on disk. Not used by the web app.

### Files not referenced in code:
- `public/images/Photos/Raw/` — **355 files** never referenced by any `src/` file. These are source material for the photo enhancement scripts (offline pipeline), not served by the app.
- `screenshots/` — **12 PNG files** generated by `scripts/take-screenshots.mjs`. Used in `WEBSITE_REVIEW.md` for documentation. Not served by the app.

### Problematic files:
| File | Issue |
|------|-------|
| `yolov8n.pt` (root, untracked) | ML model weights, not needed by web app — delete from working tree |
| `scripts/__pycache__/photo_enhance.cpython-311.pyc` (untracked) | Python bytecode cache — delete, add to `.gitignore` |
| `Grodzinski Bakery SRS Document.docx` (tracked) | Binary Word doc in repo root — consider moving to external docs |

### .psd / .zip / .bak files: None found.

---

## 0e. Config & Root Clutter

### `.gitignore` audit:
| Pattern | Present? | Action needed |
|---------|----------|---------------|
| `node_modules/` | Yes (`node_modules`) | OK |
| `dist/` | Yes (`dist`) | OK |
| `.env` / `.env.local` | Yes (`*.local`) | Missing explicit `.env` — **add** |
| `.DS_Store` | Yes | OK |
| `Thumbs.db` | No | **Add** |
| `*.log` | Yes (multiple patterns) | OK |
| `.vscode/` | Yes (with exception) | OK |
| `.idea/` | Yes | OK |
| `__pycache__/` | **Missing** | **Add** |
| `*.pyc` | **Missing** | **Add** |
| `*.pt` | **Missing** | **Add** (ML weights) |
| `coverage/` | **Missing** | **Add** |

### Lock files: Only `package-lock.json` — clean.

### Duplicate configs: None found (single tailwind, postcss, tsconfig pair).

### Root files that are clutter:
| File | Verdict |
|------|---------|
| `yolov8n.pt` | Delete from working tree (untracked) |
| `Grodzinski Bakery SRS Document.docx` | Binary file in repo; move to external docs or keep as reference |
| `Grodzinski_Bakery_web` (submodule) | Git submodule pointing to commit `ea83602`. No `.gitmodules` file exists — **orphaned submodule reference**. Should be removed with `git rm`. |

### Empty directories: None found tracked.

---

## 0f. README & Docs

### README.md
- **Status:** Exists but is a **single line**: `# Grodzinski_Bakery_web`
- **Issues:**
  - Wrong project name (references old submodule name)
  - No setup instructions
  - No project description
  - No stack info
  - No "how to run" section
  - No route list or structure
- **Action:** Rewrite in Phase 6

### Other documentation files:
| File | Status | Action |
|------|--------|--------|
| `context.md` | Current and useful — describes project structure, data flow, photo pipeline | Keep |
| `WEBSITE_REVIEW.md` | Thorough design review from Apr 2026 | Keep (reference) |
| `AGENTS.md` | AI agent config | Keep |
| `CLAUDE.md` | AI agent config | Keep |
| `GEMINI.md` | AI agent config | Keep |
| `tasks/todo.md` | Empty template | Keep (will be used) |
| `tasks/status.md` | Empty template | Keep (will be used) |
| `tasks/decisions.md` | Has menu redesign decisions | Keep |
| `tasks/product-photo-list.md` | Photo tracking | Keep |

---

## 0g. Files to Leave Alone (Menu Redesign Scope)

These files are **messy or broken** but will be **replaced** by the upcoming menu redesign. Do NOT waste cleanup effort on them:

| File | Reason |
|------|--------|
| `src/productData.js` | Broken parser (expects 22+ column Square CSV; current CSV is 4-column). Will be replaced. |
| `src/menuData.js` | Dead file (only imported by dead `Menu.jsx`). Will be part of menu redesign data layer. |
| `src/pages/Menu.jsx` | Dead file — superseded by new route system. Will be deleted as part of dead files. |
| `grodzinski_products.csv` | Source data — keep. Menu redesign will consume it differently. |
| `src/routes/MenuHub.tsx` | Active but will be redesigned. Don't refactor. |
| `src/routes/CategoryPage.tsx` | Active but will be redesigned. Don't refactor. |
| `src/routes/ProductPage.tsx` | Active but will be redesigned. Don't refactor. |
| `src/routes/MenuLayout.tsx` | Active but will be redesigned. Don't refactor. |
| `src/components/catalog/*` | Active but will be redesigned. Don't refactor. |
| `src/components/filters/*` | Active but will be redesigned. Don't refactor. |
| `src/data/products.ts` | Active menu data layer. Don't refactor. |
| `src/data/products.generated.ts` | Generated data. Don't refactor. |
| `src/stores/filterStore.ts` | Active menu store. Don't refactor (dead `setSearchQuery` can be cleaned). |

---

## Summary of Actionable Items by Phase

### Phase 1 — File Deletions:
- `src/pages/Contact.jsx`
- `src/pages/Locations.jsx`
- `src/components/ProductCard.jsx`
- `src/components/LocationCard.jsx`
- `src/components/search/SearchOverlay.tsx`
- `src/stores/cartStore.ts`
- `src/data/lqip.generated.ts`
- `src/pages/Menu.jsx` (dead; superseded by new routes)
- `src/menuData.js` (dead; only consumer was Menu.jsx)

### Phase 2 — Dead Code Removal:
- `src/pages/Home.jsx`: Remove unused `categories`, `categoryThumbnails` imports from `productData`
- `src/pages/VisitUs.jsx`: Remove `React` import, `console.log`, unused `mapsUrl` property
- `src/pages/About.jsx`: Remove `React` default import
- `src/pages/Catering.jsx`: Remove `React` default import
- `src/components/AnimationWrappers.jsx`: Remove unused `AnimatePresence` re-export
- `src/stores/filterStore.ts`: Remove dead `setSearchQuery` action

### Phase 3 — Dependency Removal:
- `npm uninstall @21st-dev/magic`
- Consider `npm uninstall react-icons` after migrating 3 Navbar icons to `lucide-react`

### Phase 4 — Legacy Cleanup:
- Remove orphaned `Grodzinski_Bakery_web` submodule reference (`git rm Grodzinski_Bakery_web`)
- Archive photo pipeline scripts to `scripts/archive/` (or keep if still used)
- Delete `yolov8n.pt` from working tree
- Delete `scripts/__pycache__/`

### Phase 5 — Style:
- Minimal; no obvious style conflicts found in active files

### Phase 6 — Config:
- Update `.gitignore` (add: `__pycache__/`, `*.pyc`, `*.pt`, `Thumbs.db`, `.env`, `coverage/`)
- Rewrite README.md
- Add useful npm scripts (lint, etc.)
- Remove orphaned submodule
