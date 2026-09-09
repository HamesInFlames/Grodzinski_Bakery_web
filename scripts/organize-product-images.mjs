// One-off: move public/images/products/*.webp into menu/ and holiday/ sub-folders
// per scripts/product-image-folders.mjs.
//
//   node scripts/organize-product-images.mjs          # dry run (default)
//   node scripts/organize-product-images.mjs --apply   # actually move files

import { readdirSync, mkdirSync, renameSync, existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PRODUCT_IMAGE_FOLDERS } from './product-image-folders.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = resolve(__dirname, '..', 'public', 'images', 'products');
const apply = process.argv.includes('--apply');

const onDisk = readdirSync(PRODUCTS_DIR).filter(
  (f) => statSync(resolve(PRODUCTS_DIR, f)).isFile() && f.endsWith('.webp'),
);

const moves = [];
const unmapped = [];
for (const file of onDisk) {
  const base = file.replace(/\.webp$/, '');
  const folder = PRODUCT_IMAGE_FOLDERS[base];
  if (!folder) {
    unmapped.push(file);
    continue;
  }
  moves.push({ file, folder });
}

const missing = Object.keys(PRODUCT_IMAGE_FOLDERS).filter(
  (base) => !onDisk.includes(`${base}.webp`),
);

console.log(`Files on disk:   ${onDisk.length}`);
console.log(`Mapped to move:  ${moves.length}`);
console.log(`Unmapped (skip): ${unmapped.length}`);
console.log(`In map, no file: ${missing.length}`);

if (unmapped.length) {
  console.log('\n⚠ Files on disk with no folder mapping:');
  unmapped.forEach((f) => console.log(`   ${f}`));
}
if (missing.length) {
  console.log('\n⚠ Map entries with no matching file on disk:');
  missing.forEach((f) => console.log(`   ${f}.webp`));
}

if (!apply) {
  console.log('\nDry run — re-run with --apply to move the files.');
  process.exit(unmapped.length || missing.length ? 1 : 0);
}

for (const { file, folder } of moves) {
  const destDir = resolve(PRODUCTS_DIR, folder);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
  renameSync(resolve(PRODUCTS_DIR, file), resolve(destDir, file));
}
console.log(`\n✓ Moved ${moves.length} files into sub-folders.`);
