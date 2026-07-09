import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('logs in successfully with standard_user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('rejects login with wrong username and password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('wrong_user', 'wrong_pass');
    await expect(login.error).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('shows error when both fields are empty', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    await expect(login.error).toHaveText('Epic sadface: Username is required');
  });

  test('shows error when password is missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', '');
    await expect(login.error).toHaveText('Epic sadface: Password is required');
  });

  test('logs out and returns to login page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('.login_logo')).toBeVisible();
  });
});