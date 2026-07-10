import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutInfo } from '../test-data/checkout';

test('completes full purchase flow with two items', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addToCart('sauce-labs-backpack');
  await inventory.addToCart('sauce-labs-bike-light');
  await expect(inventory.cartBadge).toHaveText('2');

  await inventory.goToCart();
  await cart.checkout();

  await checkout.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);

  await expect(checkout.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  await expect(checkout.totalLabel).toHaveText('Total: $43.18');

  await checkout.finish();
  await expect(checkout.confirmationHeader).toHaveText('Thank you for your order!');
});