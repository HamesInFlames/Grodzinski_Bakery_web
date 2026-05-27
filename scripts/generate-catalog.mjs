// scripts/generate-catalog.mjs
// Parse grodzinski_products.csv → generate src/data/products.generated.ts
// Run: node scripts/generate-catalog.mjs

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CSV_PATH = resolve(ROOT, 'grodzinski_products.csv');
const OUTPUT_PATH = resolve(ROOT, 'src/data/products.generated.ts');
const PHOTOS_DIR = resolve(ROOT, 'public/images/products');

// ─── Photo mapping: item slug → image path ──────────────────────────────────
// Maps generated item slugs to the 43 product photos in public/images/products/
const IMG = (name) => `/images/products/${name}.webp`;

const ITEM_PHOTO_MAP = {
  // ── Breads: Bagels ──
  'bagels-regular':                              IMG('plain-bagel'),
  'bagels-multigrain':                           IMG('everything-bagel'),
  'bagels-bagel-sliced':                         IMG('sesame-seed-bagel'),

  // ── Breads: Baguettes/Rolls/Buns ──
  'baguettes-rolls-buns-rolls-onionbuns':        IMG('onion-rolls-6-pack'),

  // ── Cakes ──
  'cakes-brownie-1-4-slab':                      IMG('brownie-squares'),
  'cakes-brownie-1-2-slab':                      IMG('brownie-squares'),
  'cakes-brownie-full-slab':                     IMG('brownie-squares'),
  'cakes-regular':                               IMG('carrot-cake'),

  // ── Fancy Cakes ──
  'fancy-cakes-caramel-brittle-small':           IMG('caramel-crunch-cake'),
  'fancy-cakes-caramel-brittle-1-2size':         IMG('caramel-crunch-cake'),
  'fancy-cakes-caramel-brittle-large':           IMG('caramel-crunch-cake'),
  'fancy-cakes-custom-cake':                     IMG('custom-celebration-cake'),

  // ── Loaf/Bundt Cakes ──
  'loaf-bundt-cakes-loaf-cakes':                 IMG('apple-loaf-cake'),
  'loaf-bundt-cakes-mini-loaf-cake':             IMG('marble-loaf-cake'),

  // ── Cookies ──
  'cookies-baby-cookies':                        IMG('baby-shower-cookies'),
  'cookies-custom-cookies':                      IMG('birthday-cookies'),
  'cookies-regular-iced-cookies':                IMG('halloween-cookies'),
  'cookies-chocolate-chip-oatmeal-raisin':       IMG('chocolate-chip-cookies-dozen'),

  // ── Boxed Cookies ──
  'boxed-cookies-400grms-cookie-mixed':          IMG('assorted-fancy-cookies-box'),
  'boxed-cookies-boxed-cookies':                 IMG('butter-cookies-box'),
  'boxed-cookies-chocolate-chip-cookies':        IMG('chocolate-chip-cookies-dozen'),
  'boxed-cookies-pumpkin-seed-mandel-bread-cookies': IMG('mandel-bread'),

  // ── Rogallach ──
  'rogallach-jam-chocolate-twist-jam-rogallach':               IMG('rogalach-tray-assorted'),
  'rogallach-jam-chocolate-twist-rogallach-choc-cinnamon':     IMG('rogalach-tray-assorted'),
  'rogallach-jam-chocolate-twist-jam-twist':                   IMG('poppy-seed-twist'),

  // ── Pastries: Bubka/Chocolate Strip ──
  'bubka-chocolate-strip-crown-bubka':           IMG('chocolate-crown-babka'),
  'bubka-chocolate-strip-chocolate-loaf-bubka':  IMG('chocolate-loaf-cake'),
  'bubka-chocolate-strip-chocolate-strip-kokosh': IMG('chocolate-ring-babka'),
  'bubka-chocolate-strip-round-choco-cheese-poppy-cinnamon': IMG('chocolate-ring-babka'),
  'bubka-chocolate-strip-mini-bubkah':           IMG('chocolate-crown-babka'),
  'bubka-chocolate-strip-personal-bubkah':       IMG('chocolate-crown-babka'),

  // ── Pastries: Danish/Croissant/Bun ──
  'danish-croissant-bun-cheese-danishcheese-croassaint':             IMG('cheese-danish'),
  'danish-croissant-bun-small-cheese-danish':                        IMG('cheese-danish'),
  'danish-croissant-bun-mini-cheese':                                IMG('cheese-danish'),
  'danish-croissant-bun-cheese-pastry':                              IMG('cheese-danish'),
  'danish-croissant-bun-croissant-danish-blueb-cherry-bun-choco-bufalo': IMG('chocolate-croissant'),
  'danish-croissant-bun-small-croissant-mini-danishes':              IMG('croissant-plain'),
  'danish-croissant-bun-danish-medium-size':                         IMG('apple-danish'),

  // ── Pastries: Petit Fours ──
  'petit-fours-desserts-regular':                IMG('opera-petit-fours'),
  'petit-fours-desserts-assorted-petit-fours-from': IMG('opera-petit-fours'),

  // ── Pastries: Pies ──
  'pies-apple-strudel-crumble-fruit-pies':        IMG('blueberry-pie'),
  'pies-apple-strudel-small-pie':                IMG('cherry-pie'),
  'pies-apple-strudel-full-slab-pie':            IMG('blueberry-pie'),
  'pies-apple-strudel-lemon-meringue-pie':       IMG('cherry-pie'),
  'pies-apple-strudel-apple-strudel':            IMG('mini-pastry-assortment'),

  // ── Shabbat: Challah ──
  'challah-large':                               IMG('plain-challah-large'),
  'challah-small':                               IMG('plain-challah-large'),
  'challah-holiday-challah':                     IMG('plain-challah-large'),
  'challah-frozen-challah-large':                IMG('plain-challah-large'),
  'special-challah-regular':                     IMG('sesame-challah'),
  'special-challah-large-challah':               IMG('sesame-challah'),

  // ── Rosh Hashanah ──
  'rosh-hashanah-large-round-challah':           IMG('rosh-hashanah-round-challah'),
  'rosh-hashanah-small-round-challah':           IMG('rosh-hashanah-round-challah'),
  'rosh-hashanah-crown-challah':                 IMG('rosh-hashanah-round-challah'),
  'rosh-hashanah-pack-of-2-apple-cookie':        IMG('apple-cookies-rosh-hashanah'),
  'rosh-hashanah-apple-loaf':                    IMG('apple-loaf-cake'),
  'rosh-hashanah-honey-loaf-l':                  IMG('marble-loaf-cake'),
  'rosh-hashanah-honey-loaf-s':                  IMG('marble-loaf-cake'),

  // ── Hanukkah (Chanukah) ──
  'chanukah-cookies-cookie-box':                 IMG('chanukah-cookies-platter'),
  'chanukah-cookies-rectang-gift-box':           IMG('chanukah-cookies-platter'),
  'chanukah-cookies-square-gift-box':            IMG('chanukah-cookies-platter'),
  'chanukah-cookies-small-menorah-dreidel-cookie': IMG('chanukah-sugar-cookies-dozen'),
  'chanukah-cookies-large-dreidel-menorah-cookie': IMG('chanukah-sugar-cookies-dozen'),
  'chanukah-cookies-dreidel-menorah-cookie-pack': IMG('chanukah-sugar-cookies-dozen'),
  'chanukah-cookies-chocolatesprinkle-menorah-dreidel':    IMG('chanukah-sugar-cookies-dozen'),

  // ── Purim ──
  'purim-hamentashen':                           IMG('hamantaschen-assorted'),
  'purim-hamantosh':                             IMG('hamantaschen-dozen'),
  'purim-fancy-hamentashen':                     IMG('hamantaschen-assorted'),
  'purim-yeast-hamantaschen':                    IMG('hamantaschen-dozen'),
  'purim-individually-packed-hamentashen':        IMG('hamantaschen-dozen'),
  'mishloach-manot-assorted-x6':                 IMG('hamantaschen-assorted'),
  'mishloach-manot-pack-assorted-x4':            IMG('hamantaschen-assorted'),
  'sugar-free-sf-hamentashen':                   IMG('hamantaschen-dozen'),
  'sugar-free-sf-hamentashen-x6':                IMG('hamantaschen-dozen'),

  // ── Celebrations ──
  'valentines-day-2-hearts-cookie':              IMG('valentines-day-cookies'),
  'valentines-day-heart-written-cookie':          IMG('valentines-day-cookies'),
  'valentines-day-heart-written-with-ribbon':     IMG('valentines-day-cookies'),
  'valentines-day-heart-strawberry-jam-filled':   IMG('valentines-day-cookies'),
  'valentines-day-cookie-cup':                   IMG('valentines-day-cookies'),
  'mothers-day-cupcake-bouquet':                 IMG('mothers-day-cookie-bouquet'),
  'mothers-day-printed-picture':                 IMG('mothers-day-cookie-bouquet'),
  'mothers-day-square-heart-written':            IMG('mothers-day-cookie-bouquet'),
  'mothers-day-7-choco-chip-cookie':             IMG('mothers-day-cookie-bouquet'),
  'fathers-day-heart-square-written-cookie':     IMG('fathers-day-cookies'),
  'fathers-day-heart-cookie':                    IMG('fathers-day-cookies'),
  'fathers-day-regular':                         IMG('fathers-day-cookies'),
};

// ─── Category fallback images ────────────────────────────────────────────────
// Used when a category has no per-item photo; keyed by "groupSlug::categorySlug"
const CATEGORY_FALLBACK_MAP = {
  'breads::bagels':                              IMG('plain-bagel'),
  'breads::baguettes-rolls-buns':                IMG('onion-rolls-6-pack'),
  'cakes::cakes':                                IMG('carrot-cake'),
  'cakes::fancy-cakes':                          IMG('caramel-crunch-cake'),
  'cakes::loaf-bundt-cakes':                     IMG('apple-loaf-cake'),
  'cookies::cookies':                            IMG('chocolate-chip-cookies-dozen'),
  'cookies::boxed-cookies':                      IMG('assorted-fancy-cookies-box'),
  'cookies::rogallach-jam-chocolate-twist':        IMG('rogalach-tray-assorted'),
  'pastries::bubka-chocolate-strip':             IMG('chocolate-crown-babka'),
  'pastries::danish-croissant-bun':              IMG('cheese-danish'),
  'pastries::churros-donuts':                    IMG('cinnamon-bun'),
  'pastries::petit-fours-desserts':               IMG('opera-petit-fours'),
  'pastries::pies-apple-strudel':                IMG('blueberry-pie'),
  'pastries::pastries':                          IMG('mini-pastry-assortment'),
  'shabbat::challah':                            IMG('plain-challah-large'),
  'shabbat::special-challah':                    IMG('sesame-challah'),
  'rosh-hashanah::rosh-hashanah':                IMG('rosh-hashanah-round-challah'),
  'hanukkah::chanukah-cookies':                  IMG('chanukah-cookies-platter'),
  'hanukkah::sufganiyot-latkes':                  IMG('cinnamon-bun'),
  'purim::purim':                                IMG('hamantaschen-assorted'),
  'purim::mishloach-manot':                      IMG('hamantaschen-assorted'),
  'celebrations::valentines-day':                IMG('valentines-day-cookies'),
  'celebrations::mothers-day':                   IMG('mothers-day-cookie-bouquet'),
  'celebrations::fathers-day':                   IMG('fathers-day-cookies'),
};

// ─── RFC 4180 CSV parser ─────────────────────────────────────────────────────
function parseCSV(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  while (i < len) {
    const row = [];
    while (i < len) {
      let value = '';
      if (text[i] === '"') {
        i++;
        while (i < len) {
          if (text[i] === '"') {
            if (i + 1 < len && text[i + 1] === '"') {
              value += '"';
              i += 2;
            } else {
              i++;
              break;
            }
          } else {
            value += text[i];
            i++;
          }
        }
      } else {
        while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
          value += text[i];
          i++;
        }
      }
      row.push(value);
      if (i < len && text[i] === ',') {
        i++;
      } else {
        break;
      }
    }
    if (i < len && text[i] === '\r') i++;
    if (i < len && text[i] === '\n') i++;
    rows.push(row);
  }
  return rows;
}

// ─── Slug generation ─────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[&]/g, '')
    .replace(/['"()]/g, '')
    .replace(/[/\\]/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── Group merge/rename mapping ──────────────────────────────────────────────
const GROUP_MERGE = {
  'Chanukah': 'hanukkah',
  'Chanukah Cookies': 'hanukkah',
  'Sufganiyot & Latkes': 'hanukkah',
  'Mishloach Manot': 'purim',
  "Valentine's Day": 'celebrations',
  "Mother's Day": 'celebrations',
  "Father's Day": 'celebrations',
  'Graduation cookie': 'celebrations',
};

const GROUP_NAMES = {
  hanukkah: 'Hanukkah',
  celebrations: 'Celebrations',
};

// Groups to exclude entirely
const EXCLUDED_GROUPS = new Set(['Catering', 'Rosh Hashanah Baskets']);

// Categories to exclude entirely
const EXCLUDED_CATEGORIES = new Set(['Gluten Free']);

// Section mapping
function mapSection(csvSection) {
  if (csvSection === 'Regular Menu') return 'regular';
  if (csvSection === 'Friday') return 'friday';
  if (csvSection === 'Holidays') return 'holidays';
  return 'regular';
}

// Group ordering
const GROUP_ORDER = {
  // Regular menu
  breads: 1,
  cakes: 2,
  cookies: 3,
  pastries: 4,
  'sandwiches-savouries': 5,
  // Friday
  shabbat: 1,
  // Holidays
  'rosh-hashanah': 1,
  sukkot: 2,
  'yom-kippur': 3,
  'simchat-torah': 4,
  hanukkah: 5,
  purim: 6,
  shavuot: 7,
  celebrations: 8,
};

// ─── Main ────────────────────────────────────────────────────────────────────
const csvText = readFileSync(CSV_PATH, 'utf-8');
const rows = parseCSV(csvText);

// Skip header row
const header = rows[0];
const dataRows = rows.slice(1);

const groupsMap = new Map();
const categoriesMap = new Map();
const items = [];
const slugCounter = new Map();

for (const row of dataRows) {
  const [section, group, category, item, price, unit, taxable, description, squareToken] = row.map(
    (s) => (s ?? '').trim(),
  );

  // Skip blank separator rows
  if (!section && !group && !category && !item) continue;

  // Skip excluded groups
  if (EXCLUDED_GROUPS.has(group)) continue;

  // Skip excluded categories
  if (EXCLUDED_CATEGORIES.has(category)) continue;

  const csvSection = mapSection(section);

  // Determine the target group slug
  let targetGroupSlug;
  let targetGroupName;
  if (GROUP_MERGE[group]) {
    targetGroupSlug = GROUP_MERGE[group];
    targetGroupName = GROUP_NAMES[targetGroupSlug] || group;
  } else if (section === 'Friday') {
    targetGroupSlug = 'shabbat';
    targetGroupName = 'Shabbat';
  } else {
    targetGroupSlug = slugify(group);
    targetGroupName = group;
  }

  // Determine section for the group
  let groupSection = csvSection;
  if (targetGroupSlug === 'hanukkah' || targetGroupSlug === 'purim' ||
      targetGroupSlug === 'celebrations' || targetGroupSlug === 'shavuot' ||
      targetGroupSlug === 'sukkot' || targetGroupSlug === 'rosh-hashanah') {
    groupSection = 'holidays';
  }
  if (targetGroupSlug === 'shabbat') {
    groupSection = 'friday';
  }

  // Register group
  if (!groupsMap.has(targetGroupSlug)) {
    groupsMap.set(targetGroupSlug, {
      slug: targetGroupSlug,
      name: targetGroupName,
      section: groupSection,
      order: GROUP_ORDER[targetGroupSlug] ?? 99,
    });
  }

  // Category slug — prefix with group to ensure uniqueness
  const catSlug = slugify(category);
  const catKey = `${targetGroupSlug}::${catSlug}`;
  if (!categoriesMap.has(catKey)) {
    categoriesMap.set(catKey, {
      slug: catSlug,
      name: category,
      groupSlug: targetGroupSlug,
      order: categoriesMap.size + 1,
    });
  }

  // Item slug — prefix with category to avoid collisions
  let baseSlug = `${catSlug}-${slugify(item)}`;
  if (slugCounter.has(baseSlug)) {
    const count = slugCounter.get(baseSlug) + 1;
    slugCounter.set(baseSlug, count);
    baseSlug = `${baseSlug}-${count}`;
  } else {
    slugCounter.set(baseSlug, 1);
  }

  // Parse price
  let parsedPrice = null;
  if (price && price !== 'variable' && price !== '') {
    const num = parseFloat(price);
    if (!isNaN(num)) parsedPrice = num;
  }

  // Photo matching: by item slug map first, then by filename on disk
  let imagePath = ITEM_PHOTO_MAP[baseSlug] ?? undefined;
  if (!imagePath) {
    const diskPath = resolve(PHOTOS_DIR, `${baseSlug}.webp`);
    if (existsSync(diskPath)) {
      imagePath = `/images/products/${baseSlug}.webp`;
    }
  }

  const hasPhoto = !!imagePath;

  const menuItem = {
    slug: baseSlug,
    name: item,
    categorySlug: catSlug,
    groupSlug: targetGroupSlug,
    section: groupSection,
    price: parsedPrice,
    taxable: taxable === 'Y',
    squareToken: squareToken,
    hasPhoto,
  };

  if (unit) menuItem.priceUnit = unit.replace(/^\//, '');
  if (description) menuItem.description = description;
  if (imagePath) menuItem.image = imagePath;

  items.push(menuItem);
}

// Add empty placeholder groups for holidays with no CSV items
const placeholderHolidays = [
  { slug: 'yom-kippur', name: 'Yom Kippur', section: 'holidays', order: 3 },
  { slug: 'simchat-torah', name: 'Simchat Torah', section: 'holidays', order: 4 },
];
for (const ph of placeholderHolidays) {
  if (!groupsMap.has(ph.slug)) {
    groupsMap.set(ph.slug, ph);
  }
}

// Recalculate category orders per group
const catsByGroup = new Map();
for (const cat of categoriesMap.values()) {
  if (!catsByGroup.has(cat.groupSlug)) catsByGroup.set(cat.groupSlug, []);
  catsByGroup.get(cat.groupSlug).push(cat);
}
for (const cats of catsByGroup.values()) {
  cats.forEach((cat, i) => { cat.order = i + 1; });
}

// Sort groups by section then order
const groups = [...groupsMap.values()].sort((a, b) => {
  const sectionOrder = { regular: 0, friday: 1, holidays: 2 };
  const sa = sectionOrder[a.section] ?? 9;
  const sb = sectionOrder[b.section] ?? 9;
  if (sa !== sb) return sa - sb;
  return a.order - b.order;
});

const categories = [...categoriesMap.values()];

// ─── Generate TypeScript output ──────────────────────────────────────────────
function jsonVal(v) {
  if (v === undefined) return undefined;
  return JSON.stringify(v);
}

let output = `// Auto-generated from grodzinski_products.csv by scripts/generate-catalog.mjs
// Do NOT edit manually — re-run: node scripts/generate-catalog.mjs

import type { MenuGroup, MenuCategory, MenuItem } from './products';

export const GENERATED_GROUPS: MenuGroup[] = [\n`;

for (const g of groups) {
  output += `  { slug: ${jsonVal(g.slug)}, name: ${jsonVal(g.name)}, section: ${jsonVal(g.section)}, order: ${g.order} },\n`;
}
output += `];\n\n`;

output += `export const GENERATED_CATEGORIES: MenuCategory[] = [\n`;
for (const c of categories) {
  const fallbackKey = `${c.groupSlug}::${c.slug}`;
  const fallback = CATEGORY_FALLBACK_MAP[fallbackKey];
  const fallbackPart = fallback ? `, fallbackImage: ${jsonVal(fallback)}` : '';
  output += `  { slug: ${jsonVal(c.slug)}, name: ${jsonVal(c.name)}, groupSlug: ${jsonVal(c.groupSlug)}, order: ${c.order}${fallbackPart} },\n`;
}
output += `];\n\n`;

output += `export const GENERATED_ITEMS: MenuItem[] = [\n`;
for (const item of items) {
  const parts = [
    `slug: ${jsonVal(item.slug)}`,
    `name: ${jsonVal(item.name)}`,
    `categorySlug: ${jsonVal(item.categorySlug)}`,
    `groupSlug: ${jsonVal(item.groupSlug)}`,
    `section: ${jsonVal(item.section)}`,
    `price: ${item.price === null ? 'null' : item.price}`,
  ];
  if (item.priceUnit) parts.push(`priceUnit: ${jsonVal(item.priceUnit)}`);
  parts.push(`taxable: ${item.taxable}`);
  if (item.description) parts.push(`description: ${jsonVal(item.description)}`);
  parts.push(`squareToken: ${jsonVal(item.squareToken)}`);
  if (item.image) parts.push(`image: ${jsonVal(item.image)}`);
  parts.push(`hasPhoto: ${item.hasPhoto}`);

  output += `  { ${parts.join(', ')} },\n`;
}
output += `];\n`;

writeFileSync(OUTPUT_PATH, output, 'utf-8');

// ─── Summary ─────────────────────────────────────────────────────────────────
const photoCount = items.filter((i) => i.hasPhoto).length;
console.log(`✓ Generated ${OUTPUT_PATH}`);
console.log(`  Groups:     ${groups.length}`);
console.log(`  Categories: ${categories.length}`);
console.log(`  Items:      ${items.length}`);
console.log(`  Photos:     ${photoCount} / ${items.length} (${((photoCount / items.length) * 100).toFixed(1)}%)`);
console.log(`  Sections:   regular=${groups.filter(g => g.section === 'regular').length}, friday=${groups.filter(g => g.section === 'friday').length}, holidays=${groups.filter(g => g.section === 'holidays').length}`);
