import { test, expect } from '@playwright/test';

test('saucedemo loads', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page.locator('.login_logo')).toBeVisible();
});
