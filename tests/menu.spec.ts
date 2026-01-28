import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { env } from '../config/env';

test.describe('Burger Menu @smoke @regression', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, env.password);
  });

  test('All Items navigates back to products page', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    // navigate away first
    await products.openCart();

    const cart = new CartPage(page);
    await cart.expectLoaded();

    await cart.menu.clickAllItems();

    await products.expectLoaded();
  });

  test('About navigates to SauceLabs site', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    await products.menu.clickAbout();

    await expect(page).toHaveURL(/saucelabs\.com/);
  });

  test('Logout logs user out and returns to login page', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    await products.menu.clickLogout();

    const login = new LoginPage(page);
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(login.loginButton).toBeVisible();
  });

  test('Reset App State clears the cart badge', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    // Add any item via page method (no selectors in test)
    await products.addToCart(Object.values((await import('../data/products')).PRODUCTS)[0]);
    await products.expectCartCount(1);

    await products.menu.clickResetAppState();

    await products.expectCartCount(0);
  });
});
