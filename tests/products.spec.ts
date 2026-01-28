import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';

test.describe('Products page @regression', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, env.password);
  });

  test('Products page loads and shows inventory list', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    // Representative "shape" check (not brittle full catalog check)
    const first = Object.values(PRODUCTS)[0];
    await products.expectProductCardHasContent(first.title);
  });

  test('Sorting low-to-high sorts visible prices correctly', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    await products.selectSort('lohi');

    const prices = await products.getVisiblePrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
});
