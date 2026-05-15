# Grodzinski Bakery Website — Project Context

## What This Is

A website for **Grodzinski Bakery**, a traditional Jewish/European-style bakery in Toronto. Built with **React 19 + Vite + Tailwind CSS 3**. The site showcases their products, menu, gallery of custom cakes/holiday items, catering info, and store locations.

**Repo:** `c:\Users\xoxok\Projects\grodzinski-bakery`  
**Dev server:** `npm run dev` → `localhost:5173`  
**Build:** `npm run build` (uses `rolldown-vite` via npm override)

---

## Tech Stack

| Layer | Detail |
|-------|--------|
| Framework | React 19, React Router 7 |
| Build | Vite (aliased to `rolldown-vite@7.1.14`) |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Data source | `grodzinski_products.csv` (exported from Square POS) |
| Photo tools | Python scripts under `scripts/` (rembg, Pillow, OpenCV, CUDA) |

---

## Project Structure

```
├── index.html                  # Vite entry point
├── package.json
├── grodzinski_products.csv     # Product catalog from Square POS
├── src/
│   ├── main.jsx                # React root
│   ├── App.jsx                 # Router: /, /menu, /gallery, /catering, /about, /visit
│   ├── App.css / index.css     # Global styles
│   ├── productData.js          # Parses CSV → product objects, category mappings, thumbnails
│   ├── menuData.js             # Hand-curated menu with descriptions, tags, prices
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ContactForm.jsx
│   │   ├── GoogleMap.jsx
│   │   └── LocationCard.jsx
│   └── pages/
│       ├── Home.jsx            # Category grid with thumbnails
│       ├── Menu.jsx            # Full menu (uses menuData.js, NOT the CSV)
│       ├── Gallery.jsx         # Photo gallery by occasion/holiday
│       ├── Catering.jsx
│       ├── About.jsx
│       ├── VisitUs.jsx         # Locations + contact (consolidated page)
│       ├── Contact.jsx         # Legacy, redirects to /visit
│       └── Locations.jsx       # Legacy, redirects to /visit
├── public/
│   └── images/                 # ~500+ product/gallery photos
│       ├── home/               # Category thumbnails
│       ├── Photos/Raw/         # Original photos (Good, Bad, BEV, Hero subfolders)
│       └── Photos/Enhanced/    # Processed product photos (189 images)
├── scripts/
│   ├── photo_enhance.py        # CPU photo pipeline: bg removal, HEIC, crop, enhance
│   ├── photo_enhance_gpu.py    # GPU (CUDA) version of above
│   ├── photo_studio_relight.py # Studio relighting effects (flour, gradient, plain styles)
│   └── setup_gpu_env.ps1       # PyTorch/CUDA environment setup
└── tailwind.config.js
```

---

## Two Separate Data Systems

This is important to understand — the site has **two different data sources** for products:

### 1. `grodzinski_products.csv` → `productData.js`
- Raw export from **Square POS**
- `productData.js` parses it and maps Square category names to display categories (e.g. "Bagels" → "Bread & Rolls")
- Used by the **Home page** (category grid with thumbnails) and **Gallery page** (category list)
- Exports: `products`, `categories`, `categoryThumbnails`, `galleryCategories`

### 2. `menuData.js` (hand-curated)
- ~1000+ lines of manually written menu data with rich descriptions, tags, and placeholder images
- Used by the **Menu page** exclusively
- Has detailed item descriptions, dietary tags (Nut-Free, Pareve, etc.), and pricing

---

## Current Uncommitted Work (IMPORTANT)

The CSV file has been **reformatted** from the original Square POS export (35+ columns) to a simplified 4-column format:

**Old format (committed):** `Token,Item Name,Variation Name,...(35 columns)...Tax - Sales Tax (13%)`  
**New format (working copy):** `Category,Product,Price,Description`

**This creates a breaking mismatch:** `productData.js` still has the old `parseSquareCSV()` function that expects 22+ columns and references specific column indices (0=Token, 1=Item Name, 2=Variation Name, 12=Visibility, 21=Price, 23=Archived, 25=Alcohol, 34=Tax). The simplified CSV will cause this parser to skip every row (the `if (parts.length < 22) continue` guard).

**`productData.js` needs to be updated** to match the new 4-column CSV format, or the Home page product data will be empty.

---

## Routing

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Category grid |
| `/menu` | Menu | Full menu from `menuData.js` |
| `/gallery` | Gallery | Photo gallery by occasion |
| `/catering` | Catering | |
| `/about` | About | |
| `/visit` | VisitUs | Locations + contact combined |
| `/locations` | Redirect → `/visit` | |
| `/contact` | Redirect → `/visit` | |

---

## Photo Pipeline

The `scripts/` folder contains Python tools for batch-processing product photos:

- **`photo_enhance.py`** — CPU pipeline: background removal via `rembg`, HEIC conversion, EXIF orientation, smart cropping with saliency detection, enhancement → transparent PNG output
- **`photo_enhance_gpu.py`** — GPU-accelerated version for RTX 3080
- **`photo_studio_relight.py`** — Studio relighting simulation (flour texture, gradient, plain backgrounds)
- **`setup_gpu_env.ps1`** — Environment setup for PyTorch CUDA, rembg[gpu], OpenCV, diffusers

189 enhanced product photos have been generated and committed under `public/images/Photos/Enhanced/`.

---

## Git History (chronological)

```
e398fda first commit
4d8becb Initial commit
3025680 Updated pages, Navbar, styles, and layout
d38ec4c Added Catering page and routing updates
19d1148 Added images (need to add holiday pictures aswell)
5dda945 Updated Home page interactions, added visit map, removed testimonials
ea83602 Major website enhancement: Complete redesign with images, Google Maps
ebbe6de Add mobile responsiveness: navigation drawer, touch-friendly UI
dd15c36 Complete website redesign with new design system, Gallery page
0f621a7 UI/UX improvements: consolidated Visit Us page, progressive disclosure menu
5793607 Update phone number and business hours
d9c9c59 Add GPU-accelerated photo enhancement scripts for RTX 3080
d48a629 Update product data and UI components
60c02b4 Add enhanced product photos (189 images)  ← HEAD
```

**Uncommitted:** `grodzinski_products.csv` reformatted from 35-column Square export to 4-column simplified format. `productData.js` parser has NOT been updated to match yet.

---

## Key Things to Know

1. **The Menu page works independently** — it uses `menuData.js` (hand-curated), not the CSV. It will be unaffected by CSV changes.
2. **The Home page depends on CSV parsing** — `productData.js` feeds the category grid. The current CSV change breaks this until the parser is updated.
3. **No `requirements.txt`** for Python — dependencies are documented in script headers and `setup_gpu_env.ps1`.
4. **No Vite config file** — runs with Vite defaults.
5. **Large image assets** — `public/` has ~500+ images; the repo is image-heavy.
6. **`yolov8n.pt`** is untracked in the root (YOLO weights, likely used by photo scripts).
