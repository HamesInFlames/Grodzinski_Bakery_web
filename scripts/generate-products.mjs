/**
 * Generate typed Product[] data from menuData.js (curated source)
 * and grodzinski_products.csv (raw POS data for supplemental items).
 *
 * Run: node scripts/generate-products.mjs
 * Output: src/data/products.generated.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseDietary(tags) {
  const dietary = [];
  const tagStr = tags.map((t) => t.toLowerCase()).join(' ');
  if (tagStr.includes('pareve')) dietary.push('pareve');
  if (tagStr.includes('dairy')) dietary.push('dairy');
  if (tagStr.includes('contains egg') || tagStr.includes('egg')) dietary.push('contains-egg');
  return dietary;
}

function parsePrice(priceStr) {
  if (!priceStr || priceStr === 'Call for pricing' || priceStr === 'variable') return null;
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? null : num;
}

function extractTags(item, categoryName) {
  const tags = [];
  if (item.tags) {
    for (const t of item.tags) {
      const tl = t.toLowerCase();
      if (
        tl === 'nut-free' ||
        tl === 'kosher' ||
        tl === 'pareve' ||
        tl === 'dairy' ||
        tl === 'contains egg' ||
        tl === 'contains gluten'
      )
        continue;
      tags.push(t);
    }
  }
  if (categoryName) tags.push(categoryName);
  return tags;
}

// Category ID mapping from menuData
const CATEGORY_MAP = {
  'challah-bilkas': 'challah-bilkas',
  'bread-rolls': 'bread-rolls',
  babkas: 'babkas',
  cakes: 'cakes',
  'bundt-cakes': 'bundt-cakes',
  'loaf-cakes': 'loaf-cakes',
  cookies: 'cookies',
  'danishes-sweets': 'danishes-sweets',
  'desserts-petitfours': 'desserts-petits-fours',
  pies: 'pies',
  'gifts-baskets': 'gifts-baskets',
  'holiday-seasonal': 'holiday-seasonal',
};

// Load menuData.js manually since it uses ESM exports
// We'll eval the file content by extracting the array
const menuDataContent = readFileSync(resolve(ROOT, 'src/menuData.js'), 'utf-8');

// Extract the menuCategories array by evaluating the module
// Safer approach: parse the structure from the existing data
const menuDataModule = await import(`file://${resolve(ROOT, 'src/menuData.js').replace(/\\/g, '/')}`);
const menuCategories = menuDataModule.menuCategories;

const products = [];
const slugCounts = {};

for (const cat of menuCategories) {
  const categorySlug = CATEGORY_MAP[cat.id] || cat.id;

  for (const item of cat.items) {
    let baseSlug = toSlug(item.name);
    if (slugCounts[baseSlug]) {
      slugCounts[baseSlug]++;
      baseSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
    } else {
      slugCounts[baseSlug] = 1;
    }

    const dietary = parseDietary(item.tags || []);
    const price = parsePrice(item.price);
    const tags = extractTags(item, cat.name);

    products.push({
      slug: baseSlug,
      name: item.name,
      category: categorySlug,
      description: item.description || '',
      price,
      priceUnit: undefined,
      dietary,
      tags: tags.length ? tags : undefined,
      imageSlug: undefined,
      inStock: true,
    });
  }
}

// Now supplement with CSV data for items not already covered
const csvContent = readFileSync(resolve(ROOT, 'grodzinski_products.csv'), 'utf-8');
const csvLines = csvContent.trim().split(/\r?\n/);

// CSV category → ProductCategory mapping
const CSV_CATEGORY_MAP = {
  bagels: 'bread-rolls',
  'baguettes/rolls/buns': 'bread-rolls',
  bread: 'bread-rolls',
  'bread items': 'bread-rolls',
  bilka: 'challah-bilkas',
  challah: 'challah-bilkas',
  'challah multigrain': 'challah-bilkas',
  'challah spelt': 'challah-bilkas',
  'special challah': 'challah-bilkas',
  'pretzel challah': 'challah-bilkas',
  'simcha challah': 'challah-bilkas',
  'bubka/chocolate strip': 'babkas',
  cakes: 'cakes',
  'fancy cakes': 'cakes',
  'loaf/bundt cakes': 'loaf-cakes',
  cookies: 'cookies',
  'custom cookie': 'cookies',
  'boxed cookies': 'cookies',
  'bow ties/kichels': 'cookies',
  'chanukah cookies': 'holiday-seasonal',
  'danish/croissant/bun': 'danishes-sweets',
  'muffins/cupcakes': 'danishes-sweets',
  'churros/donuts': 'danishes-sweets',
  'turnover/horseshoe/pretzel': 'danishes-sweets',
  pastries: 'desserts-petits-fours',
  'petit fours & desserts': 'desserts-petits-fours',
  'pies/apple strudel': 'pies',
  'rosh hashanah': 'holiday-seasonal',
  'rosh hashanah baskets': 'gifts-baskets',
  chanukah: 'holiday-seasonal',
  purim: 'holiday-seasonal',
  'mishloach manot': 'gifts-baskets',
  shavuot: 'holiday-seasonal',
  sukkot: 'holiday-seasonal',
  "mother's day": 'holiday-seasonal',
  "father's day": 'holiday-seasonal',
  "valentine's day": 'holiday-seasonal',
  'graduation cookie': 'cookies',
  'tray items': 'gifts-baskets',
  'gluten free': 'cookies',
  'sugar free': 'cookies',
  'rogallach/jam & chocolate twist': 'cookies',
};

// We won't add CSV items that duplicate menuData items (the curated data is better)
// Just log how many CSV items exist vs how many we already have
let csvItemCount = 0;
for (let i = 1; i < csvLines.length; i++) {
  const line = csvLines[i];
  if (!line.trim()) continue;

  // Handle CSV with quoted fields
  const parts = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());

  const [csvCategory, product, priceStr, description] = parts;
  if (!csvCategory || !product) continue;
  if (product.toLowerCase() === 'regular' || product.toLowerCase() === 'custom') continue;
  if (priceStr === 'variable') continue;

  csvItemCount++;
}

console.log(`Generated ${products.length} products from menuData.js`);
console.log(`CSV has ${csvItemCount} additional parseable items (not merged — curated data preferred)`);

// Generate the output TypeScript file
const output = `// AUTO-GENERATED — do not edit manually
// Run: node scripts/generate-products.mjs
// Source: src/menuData.js

import type { Product } from './products';

export const GENERATED_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)
  .replace(/"slug"/g, 'slug')
  .replace(/"name"/g, 'name')
  .replace(/"category"/g, 'category')
  .replace(/"description"/g, 'description')
  .replace(/"price"/g, 'price')
  .replace(/"dietary"/g, 'dietary')
  .replace(/"tags"/g, 'tags')
  .replace(/"inStock"/g, 'inStock')
  .replace(/"imageSlug"/g, 'imageSlug')
  .replace(/"priceUnit"/g, 'priceUnit')};
`;

writeFileSync(resolve(ROOT, 'src/data/products.generated.ts'), output, 'utf-8');
console.log('Wrote src/data/products.generated.ts');
