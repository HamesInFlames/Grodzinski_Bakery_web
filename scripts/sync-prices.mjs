/**
 * sync-prices.mjs — Hybrid pricing model
 *
 * Reads the curated catalog (src/data/products.generated.ts) and the Square
 * POS export (grodzinski_products.csv), then for every product with a
 * `squareToken` field, overrides the `price` field with the current Square
 * price. Products without a squareToken keep their curated price.
 *
 * Source of truth:
 *   - slug, name, category, description, image, dietary, occasion → curated
 *   - price, priceUnit, taxable                                    → Square CSV (joined by SquareToken)
 *
 * Manual slug → SquareToken table below covers conservative, single-SKU
 * matches only. Trays / dozens / platters / boxes in the curated catalog
 * are intentionally NOT mapped to single Square SKUs even if the names
 * look similar — that gives wrong prices (e.g. mapping "Wedding Cookies
 * Tray" curated at $28 to Square's "Cookies / Wedding Cookies" at $3.95
 * per cookie would crash the price). Extend cautiously.
 *
 * Run: node scripts/sync-prices.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CSV_PATH = resolve(ROOT, 'grodzinski_products.csv');
const GEN_PATH = resolve(ROOT, 'src/data/products.generated.ts');

// --- Curated slug → SquareToken mapping --------------------------------------
//
// Each entry is a high-confidence single-SKU-to-single-SKU match. Comment
// names the Square Category / Item the token resolves to.

const SLUG_TO_SQUARE_TOKEN = {
  // ── Challah & Bilkas (singles) ───────────────────────────────────────────
  'plain-challah-large':            'LSKKNDVPOBRG6AXCV7DKUXW2', // Challah / Large
  'plain-challah-small':            'AU4DYHIEA7LJD4OHIH4REFV3', // Challah / Small
  'sesame-challah':                 'LSKKNDVPOBRG6AXCV7DKUXW2', // Challah / Large (Square doesn't differentiate topping)
  'whole-wheat-challah':            '4375GQ4WLW25T2TSO3NFRXQ7', // Challah Multigrain / Large
  'challah-seeds-square':           'ZHAL4JXAEEE4ILFEEKCJWGSM', // Challah / Square challa

  // ── Breads & Rolls (singles) ─────────────────────────────────────────────
  // Square's "Bagels / Regular" is one SKU for all toppings — all three map to it
  'plain-bagel':                    'JYQKXTB3WGJV4SYTWFUYCDCF', // Bagels / Regular
  'sesame-seed-bagel':              'JYQKXTB3WGJV4SYTWFUYCDCF',
  'everything-bagel':               'JYQKXTB3WGJV4SYTWFUYCDCF',
  'multigrain-bread':               'OA6XFATRJSRB4WFYF576C6J7', // Bread / Multigrain/Rye large

  // ── Babkas (singles) ─────────────────────────────────────────────────────
  'chocolate-loaf-babka':           'AWKEAY3ZBBF2ZU5R3CJNJ5JO', // Bubka / Chocolate Loaf Bubka
  'chocolate-crown-babka':          'JGEYZVV7O77H6YZO72LIMNNC', // Bubka / Crown Bubka
  'chocolate-kokosh-babka':         'CXJVD2XXHD5KPULWEYQIITIC', // Bubka / Chocolate Strip/Kokosh
  'icy-bun-tray':                   '2KEKUVX73XO4SATGZNMTEHMF', // Bubka / Icy Bun Tray (1:1 — both sides are trays)

  // ── Cakes (variable-price custom matches) ────────────────────────────────
  // These map to Square's `Custom Cake` which has price=variable — the
  // sync script skips variable prices, so this just stamps the token for
  // future reference. Curated price stays authoritative.
  'custom-celebration-cake':        'Z6N3USLAMPKXYCDLOGC2YDZQ', // Fancy Cakes / Custom Cake (variable)
  'custom-wedding-cake':            'Z6N3USLAMPKXYCDLOGC2YDZQ',

  // ── Cookies (single SKU equivalents only) ────────────────────────────────
  // Both sides are "per box / per dozen" units, so the price aligns.
  'chocolate-chip-cookies-dozen':   'DM7HWOUEVM4CKE2BBGW5PHFJ', // Boxed cookies / Chocolate Chip Cookies (boxed)
  'chocolate-rogalach':             'KM7TFWDHCZZXT4ACYBA7DGK4', // Rogallach / Rogallach Choc & Cinnamon (each)

  // ── Pies (lemon meringue only — others lack a clean match) ──────────────
  // Curated cherry/blueberry/peach/pumpkin/apple pies are full-size; Square's
  // generic "Small pie" is personal-size. Don't conflate them.
  'lemon-meringue-pie':             'MTXEA5PD43746GAXUHLVZFO3', // Pies / Lemon Meringue Pie

  // ── Danishes (singles) ───────────────────────────────────────────────────
  'cheese-danish':                  '7P6JN47KAEL5JOXF5QUERNNV', // Danish / Cheese Danish&cheese croassaint

  // ── Holidays — Rosh Hashanah ────────────────────────────────────────────
  'rosh-hashanah-round-challah':    'KKNGFC5DQ33SXF3QALHP6I4C', // Rosh Hashanah / Large round challah
  'rosh-hashanah-gift-basket':      'XMZZ34NXJA3PBBDPONYQT375', // Rosh Hashanah / Gift Basket

  // ── Holidays — Civil ─────────────────────────────────────────────────────
  // Only mothers-day-cookie-bouquet has a clean Square equivalent (single
  // bouquet SKU on both sides). Other civil-holiday products in the curated
  // catalog are platters/dozens and Square has only single-cookie SKUs.
  'mothers-day-cookie-bouquet':     '3ORGMXHXOUDPCB3NVN6SFXDG', // Mother's Day / Cupcake bouquet
};

// --- Parse CSV ---------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let i = 0;
  let row = [];
  let field = '';
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i += 2; continue; }
      if (c === '"') { inQuotes = false; i++; continue; }
      field += c; i++;
    } else {
      if (c === '"') { inQuotes = true; i++; continue; }
      if (c === ',') { row.push(field); field = ''; i++; continue; }
      if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
      if (c === '\r') { i++; continue; }
      field += c; i++;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const csvText = readFileSync(CSV_PATH, 'utf-8');
const csvRows = parseCsv(csvText);
const header = csvRows[0];
const tokenIdx = header.indexOf('SquareToken');
const priceIdx = header.indexOf('Price');
const unitIdx = header.indexOf('Unit');
const taxIdx = header.indexOf('Taxable');
const itemIdx = header.indexOf('Item');
const catIdx = header.indexOf('Category');

const byToken = new Map();
for (let r = 1; r < csvRows.length; r++) {
  const row = csvRows[r];
  if (!row[tokenIdx]) continue;
  byToken.set(row[tokenIdx], {
    item: row[itemIdx],
    category: row[catIdx],
    price: row[priceIdx],
    unit: row[unitIdx],
    taxable: row[taxIdx],
  });
}

// --- Validate ---------------------------------------------------------------

const missingTokens = [];
for (const [slug, token] of Object.entries(SLUG_TO_SQUARE_TOKEN)) {
  if (!byToken.has(token)) missingTokens.push({ slug, token });
}
if (missingTokens.length) {
  console.error('\n!! Tokens in mapping not found in CSV — fix before continuing:');
  for (const m of missingTokens) console.error(`   ${m.slug} -> ${m.token}`);
  process.exit(1);
}

// --- Patch products.generated.ts --------------------------------------------

let gen = readFileSync(GEN_PATH, 'utf-8');

// Update header comment to reflect new reality
gen = gen.replace(
  /^\/\/ AUTO-GENERATED[\s\S]*?(?=\nimport)/,
  `// Curated product catalog with Square POS price sync.
//
// Edit slug / name / description / image / category / dietary / occasion here.
// Prices for products that carry a squareToken field are overwritten from
// grodzinski_products.csv each time scripts/sync-prices.mjs runs — do NOT
// hand-edit those prices, they will be re-stamped.
//
// Run: node scripts/sync-prices.mjs

`
);

let tokenAdded = 0;
let priceUpdated = 0;
let priceUnchanged = 0;
let skippedVariable = 0;
const priceChanges = [];
const skipped = [];

for (const [slug, token] of Object.entries(SLUG_TO_SQUARE_TOKEN)) {
  const csvRow = byToken.get(token);
  const newPriceRaw = (csvRow.price || '').trim();

  // Locate the product block by slug
  const blockRe = new RegExp(`(  \\{\\s*\\n)((?:[^\\}]|\\{[^\\}]*\\})*?slug: "${slug}",[\\s\\S]*?)(  \\},)`, 'm');
  const blockMatch = gen.match(blockRe);
  if (!blockMatch) {
    skipped.push(slug);
    continue;
  }
  let block = blockMatch[2];

  // Update price field if Square has a numeric price (skip 'variable' / blank)
  if (newPriceRaw && newPriceRaw !== 'variable') {
    const newPrice = Number(newPriceRaw);
    if (!Number.isNaN(newPrice)) {
      const priceRe = /(\n    )price: ([0-9.]+|null)(,)/;
      const pm = block.match(priceRe);
      if (pm) {
        const oldPrice = Number(pm[2]);
        if (!Number.isNaN(oldPrice) && Math.abs(oldPrice - newPrice) > 0.001) {
          priceChanges.push({ slug, old: oldPrice, new: newPrice });
          priceUpdated++;
        } else {
          priceUnchanged++;
        }
        block = block.replace(priceRe, `$1price: ${newPrice}$3`);
      }
    }
  } else {
    skippedVariable++;
  }

  // Add squareToken field if not present (insert after the slug line).
  // Note: block starts directly with the first field line (no leading \n),
  // so we match the slug line with optional leading newline.
  if (!block.includes('squareToken:')) {
    const before = block;
    block = block.replace(
      /(^|\n)(    slug: "[^"]+",)/,
      `$1$2\n    squareToken: "${token}",`
    );
    if (block !== before) tokenAdded++;
  }

  // Splice back into the generated file
  gen = gen.replace(blockRe, `${blockMatch[1]}${block}${blockMatch[3]}`);
}

writeFileSync(GEN_PATH, gen, 'utf-8');

// --- Report -----------------------------------------------------------------

console.log(`Sync complete.`);
console.log(`  Mapped slugs in table:          ${Object.keys(SLUG_TO_SQUARE_TOKEN).length}`);
console.log(`  squareToken fields added:       ${tokenAdded}`);
console.log(`  Prices changed:                 ${priceChanges.length}`);
console.log(`  Prices unchanged (same value):  ${priceUnchanged}`);
console.log(`  Skipped (variable / no price):  ${skippedVariable}`);
if (skipped.length) {
  console.log(`  Not found in generated.ts:      ${skipped.length}`);
  for (const s of skipped) console.log(`    - ${s}`);
}
if (priceChanges.length) {
  console.log(`\nPrice changes applied:`);
  for (const p of priceChanges.sort((a, b) => Math.abs(b.new - b.old) - Math.abs(a.new - a.old))) {
    const d = p.new - p.old;
    const sign = d >= 0 ? '+' : '';
    console.log(`  ${p.slug.padEnd(36)} $${p.old.toFixed(2)} -> $${p.new.toFixed(2)}  (${sign}${d.toFixed(2)})`);
  }
}
