// Wires mapped Downloads photos into the catalog.
// 1. Copies each source PNG → public/images/products/<slug>.png
// 2. Patches src/data/products.generated.ts to add image: "/images/products/<slug>.png"
//
// Source mapping derived from tasks/image-mapping.csv (see worktree busy-shirley-59215d).
// Only HIGH + MEDIUM confidence matches are wired here; LOW / off-catalog photos are
// left out so the catalog stays honest (those products show coming-soon.png).

import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SRC_ROOT = 'C:/Users/JamesPc/Downloads/Edited Chat Gpt/Edited Chat Gpt';
const PRODUCTS_DIR = join(REPO_ROOT, 'public/images/products');
const DATA_FILE = join(REPO_ROOT, 'src/data/products.generated.ts');

// slug → [folder, filename] within SRC_ROOT
const MAPPING = {
  // Loaf cakes
  'marble-loaf-cake':            ['Loaf', 'Loaf.png'],
  'apple-loaf-cake':             ['Loaf', 'ChatGPT Image May 14, 2026, 02_50_36 PM (3).png'],
  'chocolate-loaf-cake':         ['Refrigerated', 'ChatGPT Image May 14, 2026, 07_19_27 PM (3).png'],

  // Challahs
  'sesame-challah':              ['Loaf', 'ChatGPT Image May 14, 2026, 07_31_54 PM.png'],
  'plain-challah-large':         ['Loaf', 'ChatGPT Image May 14, 2026, 09_03_52 PM (6).png'],

  // Pies
  'cherry-pie':                  ['Pie', 'ChatGPT Image May 14, 2026, 08_46_16 PM (1).png'],
  'blueberry-pie':               ['Pie', 'ChatGPT Image May 14, 2026, 08_46_16 PM (2).png'],

  // Cakes
  'caramel-crunch-cake':         ['Refrigerated', 'ChatGPT Image May 14, 2026, 09_03_52 PM (8).png'],
  'carrot-cake':                 ['Refrigerated', 'ChatGPT Image May 14, 2026, 09_12_28 PM (5).png'],
  'custom-celebration-cake':     ['Refrigerated', 'ChatGPT Image May 14, 2026, 09_03_53 PM (10).png'],

  // Petit fours / desserts
  'opera-petit-fours':           ['Refrigerated', 'ChatGPT Image May 14, 2026, 09_12_28 PM (7).png'],
  'brownie-squares':             ['Refrigerated', 'ChatGPT Image May 14, 2026, 09_03_52 PM (3).png'],
  'mini-pastry-assortment':      ['Refrigerated', 'ChatGPT Image May 14, 2026, 09_03_52 PM (4).png'],

  // Babkas
  'chocolate-ring-babka':        ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 06_48_00 PM (5).png'],
  'chocolate-crown-babka':       ['Pie', 'ChatGPT Image May 14, 2026, 02_49_42 PM (6).png'],
  'poppy-seed-twist':            ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 02_49_42 PM (8).png'],

  // Cookies
  'chocolate-chip-cookies-dozen':['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 02_50_35 PM (1).png'],
  'baby-shower-cookies':         ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (2).png'],
  'birthday-cookies':            ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (3).png'],
  'assorted-fancy-cookies-box':  ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (5).png'],
  'mandel-bread':                ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 09_32_48 PM (1).png'],
  'rogalach-tray-assorted':      ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 02_49_42 PM (9).png'],
  'butter-cookies-box':          ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 02_50_37 PM (8).png'],
  'hamantaschen-assorted':       ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 07_13_46 PM (9).png'],

  // Bagels & rolls
  'plain-bagel':                 ['Savory Pastries', 'ChatGPT Image May 14, 2026, 06_48_00 PM (7).png'],
  'sesame-seed-bagel':           ['Savory Pastries', 'ChatGPT Image May 14, 2026, 06_48_00 PM (8).png'],
  'everything-bagel':            ['Savory Pastries', 'ChatGPT Image May 14, 2026, 07_13_46 PM (6).png'],
  'onion-rolls-6-pack':          ['Savory Pastries', 'ChatGPT Image May 14, 2026, 07_00_43 PM (1).png'],

  // Danishes
  'croissant-plain':             ['Savory Pastries', 'ChatGPT Image May 14, 2026, 07_19_28 PM (6).png'],
  'chocolate-croissant':         ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 07_19_28 PM (8).png'],
  'cinnamon-bun':                ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 07_06_39 PM (6).png'],
  'apple-danish':                ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 02_50_36 PM (5).png'],
  'cheese-danish':               ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 07_13_46 PM (10).png'],

  // Holidays — reuse close visual matches (none of the holiday SKUs have direct shoots)
  'hamantaschen-dozen':          ['Sweet Pastries', 'ChatGPT Image May 14, 2026, 07_13_46 PM (9).png'],
  'valentines-day-cookies':      ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (2).png'],   // teddy bears w/ hearts
  'mothers-day-cookie-bouquet':  ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (3).png'],   // butterfly + unicorn cookies
  'chanukah-sugar-cookies-dozen':['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 02_50_37 PM (10).png'],  // Mazel Tov + Star of David
  'chanukah-cookies-platter':    ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (5).png'],   // assorted platter
  'passover-cookie-assortment':  ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (5).png'],   // assorted platter (shared)
  'fathers-day-cookies':         ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_00_44 PM (3).png'],   // soccer-ball cookie
  'halloween-cookies':           ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (3).png'],   // butterfly/unicorn (placeholder)
  'rosh-hashanah-round-challah': ['Loaf', 'ChatGPT Image May 14, 2026, 09_03_52 PM (6).png'],                 // braided challah (not round, placeholder)
  'apple-cookies-rosh-hashanah': ['Cookies & Biscuits', 'ChatGPT Image May 14, 2026, 07_06_39 PM (3).png'],   // decorated cookies (placeholder)
};

mkdirSync(PRODUCTS_DIR, { recursive: true });

const copied = [];
const missing = [];
for (const [slug, [folder, filename]] of Object.entries(MAPPING)) {
  const src = join(SRC_ROOT, folder, filename);
  const dst = join(PRODUCTS_DIR, `${slug}.png`);
  if (!existsSync(src)) {
    missing.push({ slug, src });
    continue;
  }
  copyFileSync(src, dst);
  copied.push(slug);
}

console.log(`Copied ${copied.length} photos to public/images/products/`);
if (missing.length) {
  console.log(`MISSING ${missing.length} sources:`);
  for (const m of missing) console.log(`  ${m.slug}: ${m.src}`);
}

// Patch products.generated.ts: insert `image: "/images/products/<slug>.png",` after the slug line
let data = readFileSync(DATA_FILE, 'utf8');
let patched = 0;
for (const slug of copied) {
  const slugLine = `    slug: "${slug}",`;
  const imageLine = `    image: "/images/products/${slug}.png",`;
  if (data.includes(imageLine)) continue; // idempotent
  if (!data.includes(slugLine)) {
    console.warn(`!! slug line not found for ${slug}`);
    continue;
  }
  data = data.replace(slugLine, `${slugLine}\n${imageLine}`);
  patched++;
}
writeFileSync(DATA_FILE, data);
console.log(`Patched ${patched} entries in products.generated.ts`);
