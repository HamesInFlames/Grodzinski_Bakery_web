# Menu + Holiday Revamp — Design Plan

> **Author:** Cursor Agent (Opus 4.6)
> **Date:** 2026-05-26
> **Status:** DRAFT — awaiting James review before any implementation begins
> **Scope:** Regular Menu restructure, Holiday page revamp, kosher cert marquee, configurator component, dietary simplification, cross-site nav, CSV ingestion rewrite

---

## 1. Questions for James

These must be answered before implementation begins. Do not guess on any of them.

### Q1. Holiday list contradiction

The new CSV (`grodzinski_products.csv`) still includes **Valentine's Day** (5 items), **Mother's Day** (4 items), **Father's Day** (3 items), and **Graduation cookie** (7 items). The May 19 meeting transcript said to remove non-Jewish holidays. Aniko's task list contradicted this by adding Mother's/Father's/Valentine's back.

The current `HOLIDAY_OCCASIONS` in `src/data/products.ts` (line 17-24) lists only 6 occasions: Rosh Hashanah, Sukkot, Yom Kippur, Simchat Torah, Hanukkah, Purim. The CSV also includes **Shavuot** (13 items) which was removed from the code but is still in the CSV.

**Which version is final?** Confirm the exact holiday list to build routes for. My recommendation: keep the 6 Jewish holidays currently in code, add Shavuot back (it's in the CSV with 13 items), and either drop the civil holidays entirely or file them under a "Celebrations" catch-all.

hold back on the other holiday ones. leave the Rosh Hashanah
ראש השנה
Round challah, honey cakes, and traditional sweets for the Jewish New Year.

4 items
Sukkot
סוכות
Festive baked goods to enjoy in the sukkah with family and friends.

0 items
Yom Kippur
יום כיפור
Traditional baked goods to break the fast and celebrate the holiest day of the year.

0 items
Simchat Torah
שמחת תורה
Festive treats and baked goods to celebrate the completion of the Torah reading cycle.

0 items
Hanukkah
חנוכה
Sufganiyot, decorated cookies, and festive treats for the Festival of Lights.

3 items
Purim
פורים
Hamantaschen, mishloach manot, and themed treats for Purim celebrations.

2 items

the following above should remain in teh Holiday, the rest like Graduation and Mother and Fathers day you can add as ect Holidays, or better name.

### Q2. Friday section UX

The CSV has a "Friday" section with 37 Challah & Bilka items — the same products as in Regular Menu but tagged for Shabbat ordering. Options:

- **(a)** Separate `/friday` or `/shabbat` route with its own page
- **(b)** A "Order for Shabbat" mode toggle on the homepage or menu hub — **recommended**
- **(c)** Ignore for now; fold Friday items into the Regular Menu Breads group

I recommend **(b)** — a prominent CTA/banner on the Menu hub that says "Ordering for Shabbat?" linking to a dedicated Shabbat ordering surface. But this is a UX decision that needs client input.

we can do b but more so as a Seperate category for it

### Q3. Catering on the menu vs. Catering page

The CSV puts "Catering" as a Group inside Regular Menu (19 items: tray items, platters). The site also has a dedicated `/catering` page (`src/pages/Catering.jsx`). Should the catering items:

- **(a)** Appear on both `/menu/catering` AND `/catering`
- **(b)** Only on `/catering` (remove from menu hierarchy)
- **(c)** Only on `/menu/catering` (retire the standalone catering page)

I recommend **(b)** — keep the existing `/catering` page as the catering surface and exclude the Catering group from the regular menu navigation. The standalone page can incorporate the CSV catering items.
 B
### Q4. Photo coverage

Audited `public/images/products/` against the CSV. See Section 8 for the full audit table. Summary: **43 photos exist for ~469 CSV items (9% coverage)**. Most groups have under 15% coverage. Sandwiches & Savouries and Catering have 0%.

Does this coverage level change the design approach? The configurator pattern requires at least one photo per Category section to feel right. See fallback strategy in Section 8.

the photos just leave it, some are already there connected just make sure when you build this it is still connected all the photos should be as is

### Q5. Group photo source

The `public/images/home/` directory has 6 category thumbnail PNGs (`thumbnail_babkas.png`, `thumbnail_breaks_rolls.png`, `thumbnail_cakes.png`, `thumbnail_challahs.png`, `thumbnail_cookies.png`, `thumbnail_danishes_sweets.png`). These could serve as category-level fallback images in the configurator.

However, many CSV categories (Bagels, Bread Items, Spelt bread, Churros/Donuts, Savouries, Elite salads, etc.) have no corresponding thumbnail. Does the photoshoot dump in `_photos-source/` (gitignored, referenced in `tools/photo-pipeline/README.md`) contain group-level photos, or do they need to be commissioned/sourced?

these are just for the main home thumbnails just leave them as is 

### Q6. What replaces `/menu/p/:slug`?

The meeting decision says "No individual product detail pages." The current route at `/menu/p/:slug` (`src/routes/ProductPage.tsx`, 99 lines) and `/holidays/:occasion/p/:slug` (`src/routes/HolidayProductPage.tsx`, 112 lines) need to be retired.

Options:
- **(a)** 301 redirect `/menu/p/:slug` to `/menu/:group` (the parent group page) — **recommended for SEO**
- **(b)** Delete entirely (404)
- **(c)** Keep for SEO but show a "this product is now at" redirect notice

I recommend **(a)** with a catch-all redirect from `/menu/p/*` to `/menu`. Confirm.

when i went to the urls its product not found 

### Q7. PDF price list — still wanted?

The May 19 meeting flagged a downloadable PDF price list. Since James decided to keep prices on-page, is the PDF still wanted as a backup download, or should that requirement be removed entirely?
no we meant the csv file

### Q8. Gluten Free items in CSV (discovered during audit)

The CSV contains a "Gluten Free" category under Cookies with 8 items (GF Bilka, GF Bites, GF Cookies, GF hamentashen, GF Pies, GF large challah, GF small challah). The meeting decision says "No Gluten Free anywhere — section, filter, label, badge. Gone."

Should these 8 items:
- **(a)** Be included in the catalog as regular items under their parent group (Cookies), without any GF labeling
- **(b)** Be excluded entirely from the website

I recommend **(a)** — the items still exist for sale, they just lose their GF branding.
B
### Q9. Holiday sub-groups

The CSV has holiday sub-groups that don't map 1:1 to occasions:
- "Rosh Hashanah" (40 items) AND "Rosh Hashanah Baskets" (11 items) — are these one page or two? dont include basket, 
- "Chanukah" (2 items) AND "Chanukah Cookies" (13 items) AND "Sufganiyot & Latkes" (4 items) — merge into single Hanukkah page? yes
- "Purim" (17 items) AND "Mishloach Manot" (11 items) — merge into single Purim page? if its the same yes

I recommend merging sub-groups into their parent holiday, treating the sub-group names as Category headings within the page (e.g., the Rosh Hashanah page has two sections: "Rosh Hashanah" and "Rosh Hashanah Baskets"). Confirm.

---

## 2. Current State Audit

### 2.1 Route table

From [`src/App.jsx`](src/App.jsx) (lines 45-63):

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home` | Homepage |
| `/menu` | `MenuLayout` → `MenuHub` | Menu landing — 12 category cards |
| `/menu/:category` | `MenuLayout` → `CategoryPage` | Category product listing |
| `/menu/p/:slug` | `MenuLayout` → `ProductPage` | Individual product detail |
| `/holidays` | `HolidaysLayout` → `HolidaysHub` | Holidays landing — 6 occasion cards |
| `/holidays/:occasion` | `HolidaysLayout` → `OccasionPage` | Occasion product listing |
| `/holidays/:occasion/p/:slug` | `HolidaysLayout` → `HolidayProductPage` | Holiday product detail |
| `/gallery` | Redirects to `/` | Gallery disabled |
| `/catering` | `Catering` | Standalone catering page |
| `/about` | `About` | About page |
| `/visit` | `VisitUs` | Location/contact page |
| `*` | `NotFound` | 404 |

### 2.2 Data model

[`src/data/products.ts`](src/data/products.ts) defines:

- `DietaryAttribute`: `'pareve' | 'dairy' | 'contains-egg'` (line 1)
- `DietaryTag`: 7 extended tags including `'gluten-free'` (lines 5-14)
- `HOLIDAY_OCCASIONS`: 6 occasions with slug/name/hebrew/order (lines 17-24)
- `ProductCategory`: 12 flat category slugs (lines 27-39)
- `Product` interface: slug, name, category, description, price, dietary, tags, image, squareToken, etc. (lines 41-61)
- `Category` interface: slug, name, shortDescription, heroImageSlug, itemCount (lines 63-71)
- `CATEGORIES`: 12 categories with metadata (lines 96-181)
- Helper functions: `getProductsByCategory`, `getProductBySlug`, `getCategoryBySlug`, `getProductsByOccasion`, `getOccasionBySlug` (lines 194-207)

[`src/data/products.generated.ts`](src/data/products.generated.ts): 130 curated products, 43 with `image` fields, 22 with `squareToken` fields (2015 lines).

[`src/data/holidays.ts`](src/data/holidays.ts): `HOLIDAY_OCCASION_META` record with descriptions, Hebrew names, pre-order notices (73 lines).

### 2.3 Components

**Catalog** (`src/components/catalog/`):
- `ProductCard.tsx` (36 lines) — card with image, name, description, price, dietary badges; links to `/menu/p/:slug`
- `ProductGrid.tsx` (36 lines) — grid of `ProductCard`s with empty state
- `DietaryBadges.tsx` (38 lines) — pareve/dairy/egg badge display
- `ProductActions.tsx` (21 lines) — phone CTA for product detail pages

**Filters** (`src/components/filters/`):
- `DietaryFilter.tsx` (70 lines) — 7 tag pills (including gluten-free), toggles `activeTags`
- `FilterChipBar.tsx` (47 lines) — inline pareve/dairy/egg chips, opens `FilterSheet`
- `FilterSheet.tsx` (71 lines) — bottom sheet with dietary attribute checkboxes

**UI** (`src/components/ui/`):
- `Badge.tsx` (21 lines) — styled dietary badge span
- `Chip.tsx` (33 lines) — toggle chip button
- `Sheet.tsx` (32 lines) — Vaul drawer wrapper

**Layout** (`src/components/layout/`):
- `Breadcrumb.tsx` — breadcrumb navigation

**State** ([`src/stores/filterStore.ts`](src/stores/filterStore.ts)): Zustand store with `activeFilters` (DietaryAttribute[]) and `activeTags` (DietaryTag[]), persisted to localStorage.

### 2.4 Styling

[`src/index.css`](src/index.css) (40 lines): Tailwind directives, body font (Inter), Hebrew font (Frank Ruhl Libre), scroll reveal animation.

[`src/App.css`](src/App.css): Full design token system at `:root` (line 128+):
- `--color-bg: #F0E5D5` (warm oat cream)
- `--color-bg-elevated: #FAF6EE` (lighter cream)
- `--color-primary: #1F1410` (espresso)
- `--color-accent: #B8860B` (heritage gold)
- `--font-sans: Inter` stack
- `--font-serif: 'Cormorant Garamond', Georgia, serif`
- `--font-display: 'Frank Ruhl Libre', 'Cormorant Garamond', Georgia, serif`

### 2.5 Navbar

[`src/components/Navbar.jsx`](src/components/Navbar.jsx) (195 lines): Fixed nav with logo, 6 links (Home, Menu, Holidays, Catering, About, Visit Us), phone CTA, mobile drawer with focus trap. No dropdown sub-menus currently.

### 2.6 Tests

3 test files exist:
- `tests/smoke.spec.ts` — smoke tests at 1440/375 viewports
- `tests/a11y.spec.ts` — axe accessibility checks
- `tests/interactions/filters.spec.ts` — filter interaction tests

66 total Playwright tests passing (requires `vite preview --port 4173`).

### 2.7 Assets

- `public/images/products/`: 43 `.webp` product photos
- `public/images/home/`: 15 PNGs (logos, category thumbnails, slider images)
- `public/images/certifications/`: 6 PNGs (COR, Pas Yisroel, Chalav Yisroel, Dairy Chalav Yisroel, Nut Free, Nut Free Black)
- `public/videos/`: showcase.mp4, cakes-pastry.mp4 + posters
- `_photos-source/`: gitignored, referenced in `tools/photo-pipeline/README.md`

---

## 3. Data Model Changes

### 3.1 New CSV structure

The CSV (`grodzinski_products.csv`, 483 lines) uses a 4-level hierarchy:

```
Section (Regular Menu | Friday | Holidays)
  └── Group (Breads | Cakes | Cookies | Pastries | S&S | Catering | Challah & Bilka | Rosh Hashanah | ...)
       └── Category (Bagels | Bread | Fancy Cakes | Danish/Croissant/Bun | ...)
            └── Item (Bagel Sliced | Crown Bubka | ...)
```

Columns: `Section, Group, Category, Item, Price, Unit, Taxable, Description, SquareToken`

### 3.2 Proposed TypeScript types

```typescript
// --- Dietary (simplified per meeting) ---
type DietaryLabel = 'pareve' | 'dairy';

// --- Sections ---
type MenuSection = 'regular' | 'friday' | 'holidays';

// --- Group (becomes a page/route) ---
interface MenuGroup {
  slug: string;                  // e.g. 'breads', 'rosh-hashanah'
  name: string;                  // e.g. 'Breads', 'Rosh Hashanah'
  section: MenuSection;
  tagline?: string;              // italic subtitle below page title
  hebrew?: string;               // for holiday groups
  order: number;                 // display order within section
  heroImage?: string;            // group-level hero/fallback image path
}

// --- Category (becomes a section within a page) ---
interface MenuCategory {
  slug: string;                  // e.g. 'bagels', 'fancy-cakes'
  name: string;                  // e.g. 'Bagels', 'Fancy Cakes'
  groupSlug: string;             // parent group slug
  order: number;                 // display order within group
  fallbackImage?: string;        // category-level fallback photo
  dietary?: DietaryLabel;        // if all items in this category share a dietary label
}

// --- Item (a variant row in the configurator) ---
interface MenuItem {
  slug: string;                  // auto-generated from Item name
  name: string;                  // e.g. 'Regular', 'Large', 'Crown Bubka'
  categorySlug: string;          // parent category slug
  groupSlug: string;             // parent group slug (denormalized for fast lookup)
  section: MenuSection;
  price: number | null;          // null = 'variable' or blank in CSV
  priceUnit?: string;            // '/lb' etc.
  taxable: boolean;
  description?: string;          // from CSV Description column (mostly empty)
  squareToken: string;           // stable join key for price sync
  image?: string;                // path to product photo, if one exists
  dietary?: DietaryLabel;        // pareve or dairy
  hasPhoto: boolean;             // explicit flag for configurator rotation logic
}

// --- Holiday-specific metadata (extends MenuGroup for holidays) ---
interface HolidayMeta {
  slug: string;
  name: string;
  hebrew: string;
  order: number;
  description: string;
  preOrderNotice?: string;
}
```

### 3.3 What changes from current model

| Aspect | Current | Proposed |
|--------|---------|----------|
| Hierarchy | Flat `Product` with `category` string | 3-level: `MenuGroup` → `MenuCategory` → `MenuItem` |
| Categories | 12 hardcoded slugs in union type | Dynamic, derived from CSV column 3 |
| Groups | Don't exist | New concept — maps to CSV column 2, becomes routes |
| Dietary | `DietaryAttribute[]` + `DietaryTag[]` (9 values) | Single `DietaryLabel` enum: `'pareve' \| 'dairy'` |
| Photo tracking | `image?: string` (undefined = no photo) | `image?: string` + explicit `hasPhoto: boolean` |
| Product count | 130 curated | ~469 from CSV |
| Occasions | Separate `occasion` field on Product | Holiday groups are first-class `MenuGroup` entries with `section: 'holidays'` |
| Descriptions | Present on all 130 products | Present on ~4 CSV items; rest blank until hand-written |

### 3.4 Files affected

- `src/data/products.ts` — complete rewrite of types, `CATEGORIES` array retired, replaced by `MENU_GROUPS` + `MENU_CATEGORIES` + helper functions
- `src/data/products.generated.ts` — complete rewrite, now exports `GENERATED_ITEMS: MenuItem[]` (generated from CSV)
- `src/data/holidays.ts` — `HOLIDAY_OCCASION_META` merged into the `MenuGroup` metadata for holiday-section groups
- `src/stores/filterStore.ts` — simplify: remove `activeTags`/`DietaryTag[]`, keep only `DietaryLabel` filter (pareve/dairy)

---

## 4. Routing Changes

### 4.1 Before vs. After

| Before | After | Notes |
|--------|-------|-------|
| `/menu` → `MenuHub` (12 category cards) | `/menu` → `MenuHub` (5-6 group cards) | Groups replace categories as nav targets |
| `/menu/:category` → `CategoryPage` | `/menu/:group` → `GroupPage` | Each group page has categories stacked vertically |
| `/menu/p/:slug` → `ProductPage` | **REMOVED** — 301 redirect to `/menu` | Per meeting: no individual product pages |
| `/holidays` → `HolidaysHub` (6 occasion cards) | `/holidays` → `HolidaysHub` (N occasion cards) | Count depends on Q1 answer |
| `/holidays/:occasion` → `OccasionPage` | `/holidays/:occasion` → `HolidayGroupPage` | Same URL, new component using configurator |
| `/holidays/:occasion/p/:slug` → `HolidayProductPage` | **REMOVED** — 301 redirect to `/holidays/:occasion` | Per meeting: no individual product pages |

### 4.2 New route table

```jsx
<Route path="/menu" element={<MenuLayout />}>
  <Route index element={<MenuHub />} />
  <Route path=":group" element={<GroupPage />} />
  <Route path="p/*" element={<Navigate to="/menu" replace />} />
</Route>

<Route path="/holidays" element={<HolidaysLayout />}>
  <Route index element={<HolidaysHub />} />
  <Route path=":occasion" element={<HolidayGroupPage />} />
  <Route path=":occasion/p/*" element={<RedirectToOccasion />} />
</Route>
```

### 4.3 Regular Menu groups → routes

Based on CSV analysis (pending Q3 for Catering):

| Group (CSV) | Route | Item count |
|-------------|-------|------------|
| Breads | `/menu/breads` | 50 |
| Cakes | `/menu/cakes` | 52 |
| Cookies | `/menu/cookies` | 69 |
| Pastries | `/menu/pastries` | 60 |
| Sandwiches & Savouries | `/menu/sandwiches-savouries` | 40 |
| Catering | `/menu/catering` or excluded (Q3) | 19 |

### 4.4 Holiday groups → routes

Pending Q1 and Q9, tentative mapping (merging sub-groups):

| Holiday (merged) | Route | CSV sub-groups merged | Item count |
|------------------|-------|-----------------------|------------|
| Rosh Hashanah | `/holidays/rosh-hashanah` | Rosh Hashanah + Rosh Hashanah Baskets | 51 |
| Sukkot | `/holidays/sukkot` | Sukkot | 4 |
| Hanukkah | `/holidays/hanukkah` | Chanukah + Chanukah Cookies + Sufganiyot & Latkes | 19 |
| Purim | `/holidays/purim` | Purim + Mishloach Manot | 28 |
| Shavuot | `/holidays/shavuot` | Shavuot | 13 |
| Yom Kippur | `/holidays/yom-kippur` | (no CSV items — placeholder) | 0 |
| Simchat Torah | `/holidays/simchat-torah` | (no CSV items — placeholder) | 0 |

Civil holidays (Valentine's, Mother's Day, Father's Day, Graduation) — pending Q1.

### 4.5 Navbar changes

The "Menu" nav link needs a **dropdown** opening to the 5-6 Regular Menu groups. The "Holidays" nav link needs a **dropdown** opening to the holiday groups. Currently `Navbar.jsx` has flat links with no dropdowns.

Proposed implementation:
- Add a `children` array to `NAV_LINKS` entries for Menu and Holidays
- Desktop: hover/focus opens a positioned dropdown panel
- Mobile drawer: accordion-expand sub-links under Menu/Holidays
- Keep existing focus trap and keyboard handling

---

## 5. Component Plan

### 5.1 New components

| Component | File | Status | Props | Depends on |
|-----------|------|--------|-------|------------|
| `KosherBanner` | `src/components/KosherBanner.tsx` | **New** | none | Certification badge images |
| `GroupPage` | `src/routes/GroupPage.tsx` | **New** (replaces `CategoryPage`) | route param `:group` | `CategorySection`, `Breadcrumb` |
| `HolidayGroupPage` | `src/routes/HolidayGroupPage.tsx` | **New** (replaces `OccasionPage`) | route param `:occasion` | `CategorySection`, `Breadcrumb` |
| `CategorySection` | `src/components/menu/CategorySection.tsx` | **New** | `category: MenuCategory, items: MenuItem[]` | `VariantConfigurator` |
| `VariantConfigurator` | `src/components/menu/VariantConfigurator.tsx` | **New** | `items: MenuItem[], fallbackImage?: string` | `VariantList`, `VariantImage` |
| `VariantList` | `src/components/menu/VariantList.tsx` | **New** | `items: MenuItem[], activeIndex: number, onSelect: (i) => void` | — |
| `VariantImage` | `src/components/menu/VariantImage.tsx` | **New** | `src: string, alt: string, isPlaceholder: boolean` | — |
| `DietaryTag` | `src/components/menu/DietaryTag.tsx` | **New** | `label: DietaryLabel` | — |
| `TovaButton` | `src/components/TovaButton.tsx` | **New** | none | — |
| `NavDropdown` | `src/components/NavDropdown.tsx` | **New** | `label: string, items: {name, href}[]` | — |

### 5.2 Refactored components

| Component | Current file | Changes |
|-----------|--------------|---------|
| `MenuHub` | `src/routes/MenuHub.tsx` | Rewrite to show 5-6 group cards instead of 12 category cards |
| `HolidaysHub` | `src/routes/HolidaysHub.tsx` | Update to use new `MenuGroup[]` data for holiday section |
| `Navbar` | `src/components/Navbar.jsx` | Add dropdown sub-menus for Menu and Holidays links |
| `DietaryFilter` | `src/components/filters/DietaryFilter.tsx` | Simplify to 2 options: Pareve / Dairy. Remove all other tags |
| `FilterChipBar` | `src/components/filters/FilterChipBar.tsx` | Simplify to match 2-value dietary model |
| `filterStore` | `src/stores/filterStore.ts` | Remove `activeTags`/`DietaryTag[]`, simplify to `DietaryLabel` filter |

### 5.3 Retired components

| Component | File | Reason |
|-----------|------|--------|
| `ProductPage` | `src/routes/ProductPage.tsx` | No individual product pages per meeting |
| `HolidayProductPage` | `src/routes/HolidayProductPage.tsx` | Same |
| `ProductCard` | `src/components/catalog/ProductCard.tsx` | Replaced by `VariantList` rows in configurator |
| `ProductGrid` | `src/components/catalog/ProductGrid.tsx` | Replaced by vertical `CategorySection` stacking |
| `ProductActions` | `src/components/catalog/ProductActions.tsx` | No detail pages to show actions on |
| `FilterSheet` | `src/components/filters/FilterSheet.tsx` | Overkill for 2-value filter; inline chips suffice |

### 5.4 Component detail: `KosherBanner`

```
┌────────────────────────────────────────────────────────────────────┐
│ [COR logo] COR Certified Kosher · [badge] Pas Yisroel · [badge]  │
│ Chalav Yisroel · [badge] Dairy Chalav Yisroel ·  (repeating →)   │
└────────────────────────────────────────────────────────────────────┘
```

- **File:** `src/components/KosherBanner.tsx`
- **Placement:** Rendered in `App.jsx` ABOVE `<Navbar />`, outside `<main>`
- **Content:** 4 badge items repeated in a continuous loop: COR Certified Kosher, Pas Yisroel, Chalav Yisroel, Dairy Chalav Yisroel
- **Badge images:** from `public/images/certifications/` (cor-kosher.png, pas-yisroel.png, chalav-yisroel.png, dairy-chalav-yisroel.png)
- **Animation:** CSS `@keyframes` horizontal scroll, `animation: scroll Xs linear infinite` on a doubled inner track
- **Sizing:** Height ~32-36px, badge icons ~20px, text in `--font-sans` at 12-13px, uppercase tracking
- **Background:** `--color-primary` (#1F1410 espresso) with cream/gold text for contrast
- **`prefers-reduced-motion`:** When reduced motion, remove animation; display badges statically in a centered flexbox row, wrapping on mobile
- **No JS needed** — pure CSS animation with `@media (prefers-reduced-motion: reduce)` override

### 5.5 Component detail: `TovaButton`

- **File:** `src/components/TovaButton.tsx`
- **Placement:** Rendered in `App.jsx` after `<Footer />`, uses `position: sticky; bottom: 1rem; float: right` (avoids `position: fixed` which may break the QA harness)
- **Alternative approach:** Place inside each page component as the last element, absolutely positioned within the page's relative container. This avoids stacking-context issues.
- **Content:** "Visit Tova's Bakery" text + external link icon, links to `https://tovasbakery.com`
- **Styling:** Small pill button, `--color-primary` background, cream text, 48px min touch target (WCAG 2.5.8), subtle shadow, `target="_blank" rel="noopener noreferrer"`
- **Mobile:** Same size, pinned to bottom-right with 16px margin

### 5.6 Component detail: `NavDropdown`

- **File:** `src/components/NavDropdown.tsx`
- **Props:** `label: string`, `items: { name: string; href: string }[]`, `isActive: boolean`
- **Desktop behavior:** On hover or focus, show a positioned dropdown panel below the nav link. Delay close by 150ms to allow mouse travel. Keyboard: Enter/Space toggles, ArrowDown focuses first item, Escape closes.
- **Mobile drawer:** Accordion pattern — tapping "Menu" expands the 5-6 group links indented below it in the drawer nav list.
- **ARIA:** `aria-haspopup="true"`, `aria-expanded`, dropdown gets `role="menu"`, items get `role="menuitem"`

---

## 6. The Marquee Banner

### 6.1 Specification

- **Component:** `KosherBanner.tsx` (see 5.4 above)
- **Position:** First child of `.app` div, before `<Navbar />`. Not inside `<nav>`, not inside `<main>`.
- **Height:** 32px desktop, 28px mobile. Does not scroll with content — sits at absolute top of page flow (not fixed/sticky).
- **Background:** `var(--color-primary)` (#1F1410)
- **Text:** `var(--color-bg-elevated)` (#FAF6EE), 12px, uppercase, `letter-spacing: 0.08em`, `var(--font-sans)`
- **Badge icons:** 18px height, inline with text, `filter: brightness(0) invert(1)` if badges are dark on transparent
- **Separator:** Gold dot or vertical bar (`var(--color-accent)`) between items

### 6.2 Animation

CSS-only marquee using the doubled-content technique:

```css
.kosher-banner__track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .kosher-banner__track {
    animation: none;
    width: auto;
    justify-content: center;
    flex-wrap: wrap;
  }
}
```

The inner track renders the 4 badges twice (8 total). As the first set scrolls off-screen left, the second set seamlessly replaces it. Speed of 30s is a starting point — adjust for feel.

### 6.3 Integration with existing layout

`src/App.jsx` currently has:
```jsx
<div className="app">
  <a href="#main-content" className="skip-link">Skip to content</a>
  <Navbar />
  ...
```

Changes to:
```jsx
<div className="app">
  <a href="#main-content" className="skip-link">Skip to content</a>
  <KosherBanner />
  <Navbar />
  ...
```

The skip-link stays first for a11y. The banner is cosmetic/informational and should have `aria-hidden="true"` or `role="marquee"` with appropriate labeling.

---

## 7. The Configurator Component

### 7.1 Layout

Each `CategorySection` renders one category's worth of items as a two-column configurator:

```
Desktop (>768px):
┌──────────────────────────────────────────────────────────────┐
│  CATEGORY NAME                                                │
│  ┌─────────────────────┐  ┌────────────────────────────────┐ │
│  │                     │  │  Variant A ............. $7.99  │ │
│  │   [variant image]   │  │  Variant B ............. $5.79  │ │
│  │    auto-rotates     │  │  Variant C ............. $8.50  │ │
│  │                     │  │  Variant D ............. $8.13  │ │
│  │                     │  │  ...                            │ │
│  └─────────────────────┘  └────────────────────────────────┘ │
│  Dietary: Pareve                                              │
└──────────────────────────────────────────────────────────────┘
```

Mobile (<768px): Stacks vertically — image on top, variant list below.

### 7.2 Sizing rationale

- **Image area:** `aspect-ratio: 4/5` to match existing product photo dimensions (the 43 webp files are all 4:5 portrait)
  - Desktop: `max-width: 400px`, constrained by container
  - Mobile: full-width, `max-height: 300px`, `object-fit: cover`
- **Variant list:** Fills remaining horizontal space on desktop (typically 50-60% of container)
- **Container:** `max-width: 960px` centered, matching existing content width patterns in the codebase
- **Gap between sections:** 48px desktop, 32px mobile — enough breathing room for the vertical stack

### 7.3 Auto-rotation behavior

```
STATE: idle
  → Every 4 seconds, advance to next variant that has a photo
  → Wrap around to first photo-variant after last

STATE: hovering (mouse enters section container)
  → Pause rotation immediately
  → On mouse leave: wait 2 seconds, then resume

STATE: clicked (user clicks a variant row)
  → Switch image to that variant immediately
  → Pause rotation for 5 seconds
  → After 5 seconds, resume auto-rotation from clicked variant

STATE: reduced-motion (prefers-reduced-motion: reduce)
  → No auto-rotation at all
  → First photo-variant displayed statically
  → Click a variant → image swaps instantly (no transition)
```

### 7.4 Transition

Image crossfade: `opacity` transition over 400ms with `position: absolute` stacking (outgoing fades out while incoming fades in). Use Motion's `AnimatePresence` with `mode="wait"` for the swap.

With `prefers-reduced-motion`: instant swap, no opacity transition.

### 7.5 Variant list styling

Restaurant-menu style with dotted leader:

```css
.variant-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 6px 0;
  cursor: pointer;
  min-height: 44px; /* WCAG 2.5.8 touch target */
}

.variant-row__name {
  font-family: var(--font-sans);
  font-size: 15px;
  white-space: nowrap;
}

.variant-row__dots {
  flex: 1;
  border-bottom: 1px dotted var(--color-rule);
  margin-bottom: 4px;
}

.variant-row__price {
  font-family: var(--font-serif);
  font-weight: 500;
  white-space: nowrap;
}
```

Active variant: gold left border (`border-left: 3px solid var(--color-accent)`), slightly bolder text, background tint of `var(--color-bg-elevated)`.

Price display: `$X.XX` for numeric, blank or "Call" for null/variable, append unit if present (e.g., "$20.00/lb").

### 7.6 Keyboard support

- **Tab** into the variant list focuses the first row
- **ArrowDown / ArrowUp** moves focus between variant rows (roving tabindex pattern)
- **Enter / Space** on a focused row selects it (swaps image, pauses rotation)
- **Escape** while focused in list returns focus to section heading
- Each variant row: `role="option"`, parent list: `role="listbox"`, `aria-activedescendant` tracks current selection
- Image area: `aria-live="polite"` so screen readers announce variant changes, `aria-label` describes current variant

### 7.7 WCAG 2.2 compliance

- **SC 2.5.8 (Target Size):** All variant rows have `min-height: 44px` (48px recommended). Touch target for each row spans full width.
- **SC 2.2.2 (Pause, Stop, Hide):** Auto-rotation pauses on hover/focus/click. `prefers-reduced-motion` disables it entirely.
- **SC 1.4.3 (Contrast):** Text on `--color-bg-elevated` (#FAF6EE) — espresso ink (#1F1410) provides 15.2:1 ratio. Gold accent text on cream — needs verification but `#876205` (text-safe gold from design tokens) on #FAF6EE gives ~5.3:1 (passes AA).
- **SC 4.1.2 (Name, Role, Value):** Listbox/option ARIA roles. Image has descriptive alt text.

---

## 8. Photo Strategy

### 8.1 Recommendation: Hybrid fallback

**Tier 1 — Individual variant photo:** If the item has a `.webp` in `public/images/products/`, show it. This is the ideal case.

**Tier 2 — Category/group fallback photo:** If no individual photo, use a category-level or group-level photo. Source from `public/images/home/thumbnail_*.png` where available, or commission new ones.

**Tier 3 — Typographic placeholder:** If no photo exists at any level, render the variant name in `var(--font-serif)` at 28px over a warm cream background (`var(--color-bg-elevated)`) with a subtle decorative border. This is better than a generic "coming soon" image because it provides useful information.

**Implementation in data model:** The `hasPhoto` boolean on `MenuItem` controls configurator rotation. Only items with `hasPhoto: true` participate in auto-rotation. Items without photos are still listed in the variant list with prices. When clicked, they show the Tier 2 fallback or Tier 3 placeholder.

### 8.2 Photo coverage audit

| Group | CSV Items | Photos on disk | Coverage | Available fallback thumbnail |
|-------|-----------|---------------|----------|------------------------------|
| **Breads** | 50 | 4 (bagels: plain, sesame, everything; onion rolls) | 8% | `thumbnail_breaks_rolls.png`, `thumbnail_challahs.png` |
| **Cakes** | 52 | 6 (carrot, caramel crunch, custom celebration, apple/choco/marble loaf) | 12% | `thumbnail_cakes.png` |
| **Cookies** | 69 | 8 (assorted fancy, choco chip, baby shower, birthday, rogalach tray, mandel bread, butter, hamantaschen) | 12% | `thumbnail_cookies.png` |
| **Pastries** | 60 | 13 (crown/ring babka, poppy twist, cheese/apple danish, cinnamon bun, croissants, petit fours, brownie, pies) | 22% | `thumbnail_danishes_sweets.png`, `thumbnail_babkas.png` |
| **Sandwiches & Savouries** | 40 | 0 | 0% | None |
| **Catering** | 19 | 0 | 0% | None |
| **Friday (Challah & Bilka)** | 37 | 2 (plain challah large, sesame challah) | 5% | `thumbnail_challahs.png` |
| **Rosh Hashanah** (merged) | 51 | 2 (round challah, apple cookies) | 4% | None |
| **Hanukkah** (merged) | 19 | 2 (cookies platter, sugar cookies) | 11% | None |
| **Purim** (merged) | 28 | 1 (hamantaschen dozen) | 4% | None |
| **Shavuot** | 13 | 0 | 0% | None |
| **Sukkot** | 4 | 0 | 0% | None |
| **Valentine's Day** | 5 | 1 (valentines cookies) | 20% | None |
| **Mother's Day** | 4 | 1 (cookie bouquet) | 25% | None |
| **Father's Day** | 3 | 1 (cookies) | 33% | None |
| **Graduation** | 7 | 0 | 0% | None |
| **TOTAL** | **~461** | **~41 mapped** | **~9%** | 6 thumbnails |

Note: `halloween-cookies.webp` and `passover-cookie-assortment.webp` exist on disk but map to items/occasions not currently in the build (Halloween not in CSV, Passover removed from holidays). These are 2 orphaned photos.

### 8.3 Photo naming convention

Current: slug-based `.webp` files in `public/images/products/` matching the `slug` field in `products.generated.ts` (e.g., `chocolate-crown-babka.webp`).

New CSV items need slugs generated from `Item` name (lowercased, spaces → hyphens, special chars stripped). The generation script must check for slug collisions (e.g., multiple items named "Regular" across different categories — these need category-prefixed slugs like `bagels-regular`, `bread-regular`).

Photo mapping will use the `squareToken` as the stable join key between existing photos and CSV items, since item names may not match curated slugs exactly.

---

## 9. Migration of CSV Ingestion

### 9.1 Current state

`scripts/generate-products.mjs` was **deleted** (referenced deleted `src/menuData.js`). `scripts/sync-prices.mjs` exists and reads from the CSV by `squareToken` to update prices in `products.generated.ts`.

### 9.2 New script: `scripts/generate-catalog.mjs`

Purpose: Parse `grodzinski_products.csv` and generate `src/data/products.generated.ts`.

**Input:** `grodzinski_products.csv` (9 columns)
**Output:** `src/data/products.generated.ts` exporting:
- `GENERATED_GROUPS: MenuGroup[]`
- `GENERATED_CATEGORIES: MenuCategory[]`
- `GENERATED_ITEMS: MenuItem[]`

**Processing steps:**

1. Read CSV, skip blank separator rows (where all columns are empty)
2. For each data row, extract Section/Group/Category/Item/Price/Unit/Taxable/Description/SquareToken
3. Build unique Group list with auto-generated slugs and section assignment
4. Build unique Category list within each Group
5. Build Item list with:
   - Auto-slug from `{category-slug}-{item-name-slugified}` (to avoid collisions for generic names like "Regular")
   - Price parsed as number or null for "variable"/empty
   - `hasPhoto: true` if a matching `.webp` exists in `public/images/products/`
   - Photo matching: first try direct slug match, then try squareToken match against the existing curated catalog's squareToken→image mapping
6. Respect exclusions:
   - If GF items are included (pending Q8), strip GF labeling but keep items
   - If Catering is excluded from menu (pending Q3), skip those rows or tag them differently
7. Preserve hand-written descriptions: maintain a `src/data/descriptions.ts` sidecar file mapping `squareToken → description` for the ~130 existing product descriptions. The generator merges these in.
8. Write TypeScript output with `as const` assertions where appropriate

**What happens to `sync-prices.mjs`:** Still needed. It reads CSV prices by squareToken and stamps them into `products.generated.ts`. Refactor to work with the new `MenuItem[]` shape instead of the old `Product[]`.

### 9.3 Description preservation strategy

The existing 130 products in `products.generated.ts` have hand-written descriptions. The new CSV has descriptions on only ~4 items. To avoid losing existing work:

1. Extract a `DESCRIPTION_OVERRIDES: Record<string, string>` map from current `products.generated.ts`, keyed by `squareToken` (for the 22 that have tokens) and `slug` (for the rest)
2. Store in `src/data/descriptions.ts`
3. Generator merges: CSV description → description override → empty string (in priority order)
4. New descriptions can be added to `descriptions.ts` over time without re-running the generator

---

## 10. Impact on Existing Tests

### 10.1 Tests that will break

All 3 test files will need updates:

**`tests/smoke.spec.ts`** — Currently tests `/menu`, `/menu/challah-bilkas`, probably checks for product cards, category names. Will break because:
- Category slugs change (e.g., `challah-bilkas` → part of `breads` group)
- Product card class `.pcard` replaced by configurator variant rows
- Page structure completely different

**`tests/a11y.spec.ts`** — Axe checks at `/menu` and category pages. Will need updated URLs and may catch new a11y issues in the configurator component.

**`tests/interactions/filters.spec.ts`** — Filter behavior tests. Will break because:
- `DietaryTag` pills reduced from 7 to 2
- Product grid replaced by configurator
- Filter result counts will be different

### 10.2 New tests needed

| Test | Type | What it verifies |
|------|------|------------------|
| Marquee banner renders | Smoke | `KosherBanner` visible on every page, 4 badges present |
| Marquee reduced-motion | A11y | Animation stops when `prefers-reduced-motion` is set |
| Group page loads | Smoke | Each of the 5-6 menu groups renders with correct categories |
| Configurator image rotation | Interaction | Auto-rotation advances, pauses on hover, resumes after delay |
| Configurator variant click | Interaction | Clicking a variant swaps the image and highlights the row |
| Configurator keyboard nav | A11y | Arrow keys navigate variants, Enter selects |
| Holiday page loads | Smoke | Each holiday occasion renders with correct categories |
| Dietary filter (2-value) | Interaction | Pareve/Dairy filter toggles work, items filter correctly |
| Nav dropdown opens | Smoke | Menu/Holidays dropdowns open on hover/click |
| Tova button visible | Smoke | Cross-site button renders on all pages, links correctly |
| Product page redirects | Smoke | `/menu/p/some-slug` 301s to `/menu` |
| Touch target sizes | A11y | Variant rows meet 44px minimum height |
| ARIA roles on configurator | A11y | Listbox/option roles, aria-activedescendant |

---

## 11. Implementation Phases

### Phase 1: Data Layer + CSV Ingestion (Foundation)

**Goal:** New data model types and CSV-to-TypeScript generation working.

**Tasks:**
- Rewrite `src/data/products.ts` with new types (`MenuGroup`, `MenuCategory`, `MenuItem`, `DietaryLabel`)
- Extract description overrides from current `products.generated.ts` into `src/data/descriptions.ts`
- Write `scripts/generate-catalog.mjs` to parse CSV and output new `products.generated.ts`
- Update `src/data/holidays.ts` to use `MenuGroup` metadata for holiday groups
- Simplify `src/stores/filterStore.ts` to 2-value dietary filter
- Run generator; verify output item counts match CSV
- `npm run build` must pass

**Dependencies:** Answers to Q1 (holiday list), Q3 (catering), Q8 (GF items), Q9 (holiday sub-groups)
**Definition of done:** `products.generated.ts` exports `GENERATED_GROUPS`, `GENERATED_CATEGORIES`, `GENERATED_ITEMS` with correct counts; build clean.

### Phase 2: Configurator Component (Core UI)

**Goal:** The `VariantConfigurator` and `CategorySection` components working in isolation.

**Tasks:**
- Build `VariantConfigurator.tsx` with auto-rotation, pause/resume, image swap
- Build `VariantList.tsx` with dotted-leader price rows
- Build `VariantImage.tsx` with crossfade transitions
- Build `CategorySection.tsx` combining configurator + heading + dietary tag
- Build `DietaryTag.tsx` for pareve/dairy labels
- Implement `prefers-reduced-motion` handling throughout
- Implement keyboard navigation (roving tabindex, ARIA roles)
- Add CSS to `App.css` under namespaced classes
- Test in Storybook-style isolation (or just with a test route)

**Dependencies:** Phase 1 (data layer must exist for types/test data)
**Definition of done:** Configurator renders a category section with rotating images, clickable variants, keyboard support, reduced-motion fallback. Build clean.

### Phase 3: Menu Pages (Route Restructure)

**Goal:** New menu route structure live with configurator-based group pages.

**Tasks:**
- Rewrite `MenuHub.tsx` to show 5-6 group cards
- Build `GroupPage.tsx` — loads group data, renders `CategorySection` for each category
- Remove `ProductPage.tsx` route, add 301 redirect
- Update `MenuLayout.tsx` if needed
- Wire new routes in `App.jsx`
- Update breadcrumbs for new hierarchy
- Refactor dietary filter components for 2-value model

**Dependencies:** Phase 2 (configurator component ready)
**Definition of done:** `/menu` shows group cards; `/menu/breads` (etc.) shows configurator sections; `/menu/p/*` redirects to `/menu`. Build clean.

### Phase 4: Holiday Pages (Mirror of Phase 3)

**Goal:** Holiday routes updated to use same configurator pattern.

**Tasks:**
- Rewrite `HolidaysHub.tsx` to show holiday group cards from new data
- Build `HolidayGroupPage.tsx` (or share `GroupPage` with a `section` prop)
- Remove `HolidayProductPage.tsx` route, add 301 redirect
- Update holiday metadata (descriptions, Hebrew names, pre-order notices)
- Wire new routes in `App.jsx`

**Dependencies:** Phase 3 (menu pages prove the pattern works)
**Definition of done:** `/holidays` shows holiday cards; `/holidays/rosh-hashanah` (etc.) shows configurator sections. Build clean.

### Phase 5: Kosher Banner + Tova Button + Nav Dropdowns

**Goal:** Site-wide UI additions.

**Tasks:**
- Build `KosherBanner.tsx` with CSS marquee animation
- Build `TovaButton.tsx` with cross-site link
- Build `NavDropdown.tsx` for Menu/Holidays sub-navigation
- Refactor `Navbar.jsx` to use `NavDropdown` for Menu and Holidays links
- Add mobile drawer accordion for sub-links
- Integrate banner and button in `App.jsx`
- Verify reduced-motion behavior

**Dependencies:** None (can be parallelized with Phase 3/4 if different developers)
**Definition of done:** Banner scrolls on every page, stops on reduced-motion. Tova button visible on every page. Nav dropdowns work on desktop and mobile. Build clean.

### Phase 6: Test Suite Update

**Goal:** All existing tests updated, new tests added for configurator and site-wide elements.

**Tasks:**
- Update `smoke.spec.ts` for new routes and page structure
- Update `a11y.spec.ts` for new pages
- Rewrite `filters.spec.ts` for 2-value dietary filter
- Add configurator interaction tests (rotation, click, keyboard)
- Add marquee/banner tests
- Add nav dropdown tests
- Add redirect tests for retired routes
- All tests pass at 1440px and 375px viewports

**Dependencies:** Phases 3-5 (all UI must be in place)
**Definition of done:** Full test suite green. No axe violations on new pages.

### Phase 7: Polish + QA + Cleanup

**Goal:** Final pass before PR review.

**Tasks:**
- Remove dead code: old `ProductCard`, `ProductGrid`, `ProductActions`, `FilterSheet`, old category/occasion types
- Compress any new images added
- Verify all responsive breakpoints (375px, 768px, 1024px, 1440px)
- Lighthouse audit: a11y ≥ 95, performance acceptable
- Update `tasks/status.md` with session summary
- Update `tasks/decisions.md` with architectural decisions made
- Final `npm run build` — clean, no warnings

**Dependencies:** Phase 6
**Definition of done:** Build clean, tests green, no dead code, responsive verified, Lighthouse acceptable. Ready for James QA.

---

## 12. Risks and Unknowns

### 12.1 High risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Photo coverage too low for configurator** | 91% of items have no photo; many category sections would show only fallback images, making the configurator feel empty | Tier 2/3 fallback strategy (Section 8). For categories with 0 photos (Sandwiches, Catering, Sukkot), the configurator degrades to a static image + price list. Consider commissioning a small photoshoot for at least 1 photo per category. |
| **Holiday list ambiguity** | Building routes for wrong holidays wastes effort | Block Phase 4 on Q1 answer. Phase 3 (menu) can proceed independently. |
| **CSV item name collisions** | Multiple items named "Regular" or "variable" across different categories | Slug generation must prefix with category slug. This adds complexity to the generator. |

### 12.2 Medium risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **~469 items is a large page** | Groups like Cookies (69 items across 7 categories) may feel overwhelming | Each category is its own collapsed section. Users scroll through sections, not a single massive list. |
| **Description gap** | Only ~130 of 469 items have descriptions; rest are empty | Descriptions are optional in the configurator — variant rows show name + price only. Descriptions can be added later to `descriptions.ts`. |
| **Navbar dropdown complexity** | Adding dropdowns to existing Navbar may break mobile drawer behavior | Build `NavDropdown` as an isolated component first; integrate carefully with existing focus trap logic. |
| **SEO impact of removing `/menu/p/:slug`** | Any indexed product URLs will 404 without redirects | 301 redirect catch-all mitigates. Low risk since site is pre-launch. |

### 12.3 Unknowns requiring resolution

| Unknown | What resolves it |
|---------|-----------------|
| Exact holiday list | James answers Q1 |
| Friday section treatment | James answers Q2 |
| Catering placement | James answers Q3 |
| Whether `_photos-source/` has group-level photos | James checks local disk (Q5) |
| PDF price list requirement | James answers Q7 |
| GF item handling | James answers Q8 |
| Holiday sub-group merging | James answers Q9 |

---

## 13. Estimate of Complexity

| Phase | Effort | Riskiest aspect |
|-------|--------|-----------------|
| Phase 1: Data Layer + CSV Ingestion | **L** | Slug collision handling; description preservation; getting the generator right for 469 items across 3 sections |
| Phase 2: Configurator Component | **L** | Auto-rotation state machine; keyboard a11y; reduced-motion; image crossfade timing; this is the most novel component |
| Phase 3: Menu Pages | **M** | Wiring new routes; ensuring all 5-6 groups render correctly with variable-length category lists |
| Phase 4: Holiday Pages | **S** | Mirrors Phase 3 pattern; main work is metadata (descriptions, Hebrew, pre-order notices) |
| Phase 5: Banner + Button + Nav Dropdowns | **M** | Nav dropdown is the tricky part — desktop hover + mobile accordion + focus trap integration |
| Phase 6: Test Suite | **M** | Rewriting all 66 tests plus adding ~13 new ones; configurator interaction tests are complex |
| Phase 7: Polish + QA | **S** | Standard cleanup pass; no new features |

**Overall estimate:** ~5-7 focused implementation sessions.

**Riskiest phase:** Phase 2 (Configurator Component). It's the most novel piece — auto-rotating image carousel with pause/resume/click behavior, keyboard navigation, ARIA roles, reduced-motion fallback, and photo-aware rotation logic. Getting this right determines whether the whole revamp feels polished or janky. I recommend building this in isolation with test data before integrating into real pages.

**Second riskiest:** Phase 1 (Data Layer). The CSV ingestion script must handle edge cases (blank prices, "variable" strings, multi-line descriptions in the CSV like the Fancy Cakes 5" Round Cake entry at CSV line 71-83, slug collisions, squareToken matching for photo/description preservation). This is the foundation everything else builds on.
