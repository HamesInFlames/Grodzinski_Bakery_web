import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'screenshots');
mkdirSync(screenshotsDir, { recursive: true });

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://localhost:5173';

const pages = [
  { name: 'home', path: '/' },
  { name: 'menu', path: '/menu' },
  { name: 'gallery', path: '/gallery' },
  { name: 'catering', path: '/catering' },
  { name: 'about', path: '/about' },
  { name: 'visit', path: '/visit' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const page of pages) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const tab = await context.newPage();

      const url = `${BASE_URL}${page.path}`;
      console.log(`Capturing ${page.name} (${vp.name}) -> ${url}`);

      try {
        await tab.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        // Extra wait for animations/images
        await tab.waitForTimeout(2000);
      } catch (e) {
        console.warn(`  Warning loading ${url}: ${e.message}`);
      }

      const filename = `${page.name}-${vp.name}.png`;
      await tab.screenshot({
        path: join(screenshotsDir, filename),
        fullPage: true,
      });
      console.log(`  Saved: ${filename}`);

      await context.close();
    }
  }

  await browser.close();
  console.log('\nAll screenshots captured!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
