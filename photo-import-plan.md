# Photo Import Plan — "Grodz picture/Edited" batch (Aug 16, 2026)

Source folder: `C:\Users\xoxok\Downloads\Grodz picture\Edited` (10 PNGs, ~2.5 MB each,
portrait, consistent linen-cloth styling matching the existing product photos).

All 10 images were visually verified. They split into three buckets:
**3 placeholder fills**, **4 new menu items**, **3 photo upgrades** of existing tiles.

Convention check (verified against repo): existing product photos are webp,
~1120×1400 (4:5-ish portrait), 100–250 KB, kebab-case names, under
`public/images/products/<folder>/`. `sharp` is already in `node_modules`.

---

## Phase 1 — Convert PNG → webp

One-off node script (use `sharp`; do NOT commit the script, run from scratchpad):
resize to width 1120 (keep aspect), `.webp({ quality: 82 })`. Verify each output
is under ~300 KB and looks clean.

| # | Source PNG | Output file (under `public/images/products/`) | Action |
|---|---|---|---|
| 1 | `Black Forest cake.png` | `menu/cakes-loaf/black-forest-cake.webp` | new file |
| 2 | `Chocolate fudge cake.png` | `menu/cakes-loaf/chocolate-fudge-cake.webp` | new file |
| 3 | `mocha  cake.png` (two spaces in name) | `menu/cakes-loaf/mocha-cake.webp` | new file |
| 4 | `Mixed berry Bundt.png` | `menu/cakes-loaf/mixed-berry-bundt.webp` | new file |
| 5 | `lemon merengue pie.png` | `menu/pies/lemon-meringue-pie.webp` | new file |
| 6 | `Yogurt parfait.png` | `menu/cookies-sweets/yogurt-parfait.webp` | new file |
| 7 | `sandwhichs.png` | `menu/cookies-sweets/sandwich.webp` | **overwrite** existing |
| 8 | `Chocolate danish.png` | `menu/danishes-babkas/chocolate-pastry.webp` | **overwrite** existing |
| 9 | `Chocolate buffalo.png` | `menu/danishes-babkas/bufolo-danish.webp` | **overwrite** existing |
| 10 | `poppy danish.png` | `menu/danishes-babkas/poppy-danish.webp` | new file |

Overwrites (7–9) keep the same filename → zero code changes needed for them; the
new shots are same-styling upgrades (sandwich: 3 assorted vs 1; danish/bufolo:
cleaner crops). Old versions stay in git history.

## Phase 2 — Data edits

### A. Fill placeholders — `src/data/productPhotoMap.ts`
- `'cakes-loaf'` → `'Black Forest': 'photo-coming-soon.svg'` ⇒ `'menu/cakes-loaf/black-forest-cake.webp'`
- `bundt` → `'Mixed Berry': 'photo-coming-soon.svg'` ⇒ `'menu/cakes-loaf/mixed-berry-bundt.webp'`
- `'cookies-sweets'` → `'Yogurt Parfait': 'photo-coming-soon.svg'` ⇒ `'menu/cookies-sweets/yogurt-parfait.webp'`

### B. New menu items (4)

**1. Mocha (cake)** — CSV-confirmed: listed in the 5" Round Cake $25.00 flavour
note ("Mocha cake — chocolate sponge, mocha buttercream filling, chocolate on top").
- `menuDisplay.ts` → `cakes-loaf` group, `Cakes` section items: add `'Mocha'` (after `'Black Forest'`).
- `productPhotoMap.ts` → `'cakes-loaf'`: `Mocha: 'menu/cakes-loaf/mocha-cake.webp'`.
- `priceList.ts` → Cakes section: `{ name: 'Mocha', price: 'from $25.00' }`.

**2. Chocolate Fudge (cake)** — CSV has "Chocolate Cake (Chocolate Sponge,
Chocolate Filling covered in Chocolate ganache)" in the same $25.00 note.
DEFAULT: add as a new tile distinct from the existing `Chocolate` tile.
- `menuDisplay.ts` → Cakes items: add `'Chocolate Fudge'`.
- `productPhotoMap.ts` → `'cakes-loaf'`: `'Chocolate Fudge': 'menu/cakes-loaf/chocolate-fudge-cake.webp'`.
- `priceList.ts` → Cakes: `{ name: 'Chocolate Fudge', price: 'from $25.00' }`.
- ⚠ OPEN QUESTION (see below): owner may instead want this photo to replace the
  existing plain `Chocolate` cake photo. Ask before executing if possible.

**3. Lemon Meringue (pie)** — already priced in `priceList.ts` (`$21.00`, CSV
line "Lemon Meringue Pie,21.00") but missing from the menu display.
- `menuDisplay.ts` → `pies` group items: `['Assorted', 'Lemon Meringue', 'Fruit Tarts']`.
- `productPhotoMap.ts` → `pies`: `'Lemon Meringue': 'menu/pies/lemon-meringue-pie.webp'`.
- `priceList.ts`: no change (entry exists).

**4. Poppy Danish** — photo is a poppy-seed danish; menu Danishes section has no
poppy item. CSV medium danish price is $2.80–$4.25.
- `menuDisplay.ts` → `danishes-babkas` group, `Danishes` section items: add `'Poppy Danish'` (after `'Bufolo Danish'`).
- `productPhotoMap.ts` → `'danishes-babkas'`: `'Poppy Danish': 'menu/danishes-babkas/poppy-danish.webp'`.
- `priceList.ts`: DEFAULT no change — the Danishes/Babkas price section is not
  1:1 with menu tiles (e.g. Assorted Danish, Conchas have no price rows), and the
  existing `'Poppy Seed' $12.99` row is the babka ring, not this danish.

### C. Folder map — `scripts/product-image-folders.mjs`
Add (alphabetical within their folder blocks, keys without `.webp`):
- `'black-forest-cake': 'menu/cakes-loaf'`
- `'chocolate-fudge-cake': 'menu/cakes-loaf'`
- `'mixed-berry-bundt': 'menu/cakes-loaf'`
- `'mocha-cake': 'menu/cakes-loaf'`
- `'lemon-meringue-pie': 'menu/pies'`
- `'yogurt-parfait': 'menu/cookies-sweets'`
- `'poppy-danish': 'menu/danishes-babkas'`
(`sandwich`, `chocolate-pastry`, `bufolo-danish` already mapped.)

### D. Do NOT touch
- `grodzinski_products.csv` / `products.generated.ts` / `npm run sync-prices` —
  the CSV is partially malformed (see memory: broken after reformat; cake
  flavour lists live inside a quoted note field). No CSV edits needed for this task.
- `galleryItems.ts` — none of these photos are custom-gallery cakes.

## Phase 3 — Verify

1. `npm run typecheck`.
2. Dev server (`.claude/launch.json` → `dev`, port 5173) — check:
   - `/menu/cakes-loaf`: Black Forest + Mocha + Chocolate Fudge tiles show real
     photos; Bundt section Mixed Berry shows photo. Cakes variety count on the
     hub goes 29 → 31.
   - `/menu/pies`: Lemon Meringue tile (count 2 → 3).
   - `/menu/cookies-sweets`: Yogurt Parfait photo; Sandwiches tile shows the new
     3-sandwich shot.
   - `/menu/danishes-babkas`: Poppy Danish tile; upgraded chocolate danish +
     bufolo photos.
3. No console errors; screenshot proof for the user.
4. Commit style (repo convention): `feat(menu): add mocha, fudge, lemon meringue & poppy danish + photo batch`
   — commit only when the user asks.

## Decisions (James, Aug 16 2026)

1. **Chocolate Fudge**: new tile, distinct from `Chocolate`. ✓
2. **Photo upgrades**: do NOT overwrite — save as new files and repoint the
   photo map; old files stay on disk:
   - `sandwhichs.png` → `menu/cookies-sweets/sandwiches-assorted.webp`
   - `Chocolate danish.png` → `menu/danishes-babkas/chocolate-danish.webp`
   - `Chocolate buffalo.png` → `menu/danishes-babkas/chocolate-bufolo-danish.webp`
3. **Pricing**: `from $25.00` for Mocha and Chocolate Fudge. ✓
