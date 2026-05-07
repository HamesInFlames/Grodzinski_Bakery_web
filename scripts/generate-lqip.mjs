/**
 * Generate LQIP (Low Quality Image Placeholders) for product images.
 * Run: node scripts/generate-lqip.mjs
 * Output: src/data/lqip.generated.ts
 *
 * Prerequisites: Product images must exist at public/images/products/{slug}.jpg
 */

import { readdir } from 'fs/promises';
import { writeFileSync, existsSync } from 'fs';
import { resolve, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PRODUCTS_DIR = resolve(ROOT, 'public/images/products');
const OUTPUT = resolve(ROOT, 'src/data/lqip.generated.ts');

async function main() {
  if (!existsSync(PRODUCTS_DIR)) {
    console.log('No product images directory found. Generating empty LQIP map.');
    writeOutput({});
    return;
  }

  const files = await readdir(PRODUCTS_DIR);
  const imageFiles = files.filter((f) =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()),
  );

  if (imageFiles.length === 0) {
    console.log('No product images found. Generating empty LQIP map.');
    writeOutput({});
    return;
  }

  const sharp = (await import('sharp')).default;
  const map = {};

  for (const file of imageFiles) {
    const slug = basename(file, extname(file));
    const filePath = resolve(PRODUCTS_DIR, file);

    try {
      const blur = await sharp(filePath)
        .resize(16)
        .blur()
        .jpeg({ quality: 30 })
        .toBuffer();
      map[slug] = `data:image/jpeg;base64,${blur.toString('base64')}`;
      console.log(`  ✓ ${slug}`);
    } catch (err) {
      console.warn(`  ✗ ${slug}: ${err.message}`);
    }
  }

  writeOutput(map);
  console.log(`\nGenerated ${Object.keys(map).length} LQIP placeholders.`);
}

function writeOutput(map) {
  const output = `// AUTO-GENERATED — LQIP blur placeholders
// Run: node scripts/generate-lqip.mjs
// Populated when product images are assigned to slugs

export const LQIP_MAP: Record<string, string> = ${JSON.stringify(map, null, 2)};
`;
  writeFileSync(OUTPUT, output, 'utf-8');
  console.log('Wrote src/data/lqip.generated.ts');
}

main().catch(console.error);
