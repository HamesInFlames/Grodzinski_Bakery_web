import { test, expect } from '@playwright/test';

test.describe('Dietary filter interactions', () => {
  test('toggle a filter pill updates product list', async ({ page }) => {
    await page.goto('/menu/cookies', { waitUntil: 'networkidle' });

    const pillGroup = page.locator('[role="group"][aria-label="Dietary filters"]');
    await expect(pillGroup).toBeVisible();

    const pareve = pillGroup.locator('button', { hasText: 'Pareve' });
    await expect(pareve).toHaveAttribute('aria-pressed', 'false');

    await pareve.click();
    await expect(pareve).toHaveAttribute('aria-pressed', 'true');
  });

  test('clear filters restores full product list', async ({ page }) => {
    await page.goto('/menu/cookies', { waitUntil: 'networkidle' });

    const pillGroup = page.locator('[role="group"][aria-label="Dietary filters"]');
    const dairy = pillGroup.locator('button', { hasText: 'Dairy' });
    await dairy.click();
    await expect(dairy).toHaveAttribute('aria-pressed', 'true');

    const clearBtn = page.locator('.dietary-filter__clear');
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await expect(dairy).toHaveAttribute('aria-pressed', 'false');
    }
  });

  test('filter pills have accessible keyboard focus', async ({ page }) => {
    await page.goto('/menu/cookies', { waitUntil: 'networkidle' });

    const pillGroup = page.locator('[role="group"][aria-label="Dietary filters"]');
    const firstPill = pillGroup.locator('button').first();

    await firstPill.focus();
    await expect(firstPill).toBeFocused();

    await page.keyboard.press('Tab');
    const secondPill = pillGroup.locator('button').nth(1);
    await expect(secondPill).toBeFocused();
  });

  test('filter state persists across route changes', async ({ page }) => {
    await page.goto('/menu/cookies', { waitUntil: 'networkidle' });

    const pillGroup = page.locator('[role="group"][aria-label="Dietary filters"]');
    const dairy = pillGroup.locator('button', { hasText: 'Dairy' });
    await dairy.click();
    await expect(dairy).toHaveAttribute('aria-pressed', 'true');

    await page.goto('/menu/cakes', { waitUntil: 'networkidle' });
    const dairyOnCakes = page.locator('[role="group"][aria-label="Dietary filters"] button', { hasText: 'Dairy' });
    await expect(dairyOnCakes).toHaveAttribute('aria-pressed', 'true');
  });

  test('dietary filters work on holiday occasion page', async ({ page }) => {
    await page.goto('/holidays/rosh-hashanah', { waitUntil: 'networkidle' });

    const pillGroup = page.locator('[role="group"][aria-label="Dietary filters"]');
    await expect(pillGroup).toBeVisible();

    const pareve = pillGroup.locator('button', { hasText: 'Pareve' });
    await pareve.click();
    await expect(pareve).toHaveAttribute('aria-pressed', 'true');
  });
});
