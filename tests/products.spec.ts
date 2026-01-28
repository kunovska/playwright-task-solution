import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';

test.describe('Products page @regression', () => {
  let login: LoginPage;
  let products: ProductsPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    products = new ProductsPage(page);

    await login.goto();
    await login.login(USERS.standard.username, env.password);

    await products.expectLoaded();
  });

  test('Products page loads and shows inventory list with products', async () => {
    for (const product of Object.values(PRODUCTS)) {
      await products.expectProductCardHasContent(product.title);
    }
  });

  test('Sorting low-to-high sorts visible prices correctly', async () => {
    await products.selectSort('lohi');

    const prices = await products.getVisiblePrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
});
