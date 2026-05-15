import { test, expect } from '@playwright/test';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/menu', name: 'menu' },
  { path: '/menu/challah-bilkas', name: 'category' },
  { path: '/holidays', name: 'holidays-hub' },
  { path: '/holidays/rosh-hashanah', name: 'holidays-rosh-hashanah' },
  { path: '/holidays/chanukah', name: 'holidays-chanukah' },
  { path: '/holidays/purim', name: 'holidays-purim' },
  { path: '/holidays/pesach', name: 'holidays-pesach' },
  { path: '/holidays/shavuot', name: 'holidays-shavuot' },
  { path: '/holidays/simchas', name: 'holidays-simchas' },
  { path: '/holidays/valentines', name: 'holidays-valentines' },
  { path: '/holidays/mothers-day', name: 'holidays-mothers-day' },
  { path: '/holidays/fathers-day', name: 'holidays-fathers-day' },
  { path: '/holidays/graduation', name: 'holidays-graduation' },
  { path: '/holidays/sukkot', name: 'holidays-sukkot' },
  { path: '/gallery', name: 'gallery' },
  { path: '/catering', name: 'catering' },
  { path: '/about', name: 'about' },
  { path: '/visit', name: 'visit' },
];

for (const route of ROUTES) {
  test(`smoke: ${route.name} (${route.path})`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

    const response = await page.goto(route.path, { waitUntil: 'networkidle' });
    expect(response?.status(), `${route.path} status`).toBe(200);

    const h1s = await page.locator('h1').count();
    expect.soft(h1s, `${route.path} h1 count`).toBe(1);

    expect.soft(consoleErrors, `${route.path} console errors`).toEqual([]);
  });
}
