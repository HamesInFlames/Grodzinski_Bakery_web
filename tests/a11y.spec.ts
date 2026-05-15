import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/menu', name: 'menu' },
  { path: '/menu/challah-bilkas', name: 'category' },
  { path: '/about', name: 'about' },
  { path: '/visit', name: 'visit' },
];

for (const route of ROUTES) {
  test(`axe a11y: ${route.name} (${route.path})`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: 'networkidle' });
    // Allow lazy fonts + ScrollReveal to settle.
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect.soft(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
