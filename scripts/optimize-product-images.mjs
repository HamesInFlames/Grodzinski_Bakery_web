// Convert public/images/products/*.png → *.webp at quality 85, max-width 1200px.
// Deletes originals, then updates products.generated.ts to reference .webp paths.

import sharp from 'sharp';
import { readdirSync, unlinkSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const PRODUCTS_DIR = join(REPO_ROOT, 'public/images/products');
const DATA_FILE = join(REPO_ROOT, 'src/data/products.generated.ts');

const pngs = readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.png'));
let totalIn = 0;
let totalOut = 0;

for (const file of pngs) {
  const src = join(PRODUCTS_DIR, file);
  const dst = src.replace(/\.png$/, '.webp');
  const inSize = statSync(src).size;
  totalIn += inSize;

  await sharp(src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toFile(dst);

  const outSize = statSync(dst).size;
  totalOut += outSize;

  unlinkSync(src);
}

const fmt = bytes => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
console.log(`Converted ${pngs.length} files: ${fmt(totalIn)} → ${fmt(totalOut)} (${((1 - totalOut / totalIn) * 100).toFixed(1)}% smaller)`);

// Update products.generated.ts paths
let data = readFileSync(DATA_FILE, 'utf8');
const before = data.match(/\.png"/g)?.length ?? 0;
data = data.replaceAll('/images/products/', '/images/products/').replaceAll(/("\/images\/products\/[^"]+)\.png"/g, '$1.webp"');
const after = data.match(/\.webp"/g)?.length ?? 0;
writeFileSync(DATA_FILE, data);
console.log(`Patched ${after} image paths from .png to .webp (was ${before} .png entries)`);
