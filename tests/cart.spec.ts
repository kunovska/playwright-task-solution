import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';

test.describe('Add to cart - all products @regression', () => {
  test('User can add every product; badge increments; cart contains all items', async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, env.password);

    const productsPage = new ProductsPage(page);
    await productsPage.expectLoaded();

    const productList = Object.values(PRODUCTS);

    // Add each product and assert cart badge increments each time
    for (let i = 0; i < productList.length; i++) {
      const product = productList[i];

      await productsPage.addToCart(product);
      await productsPage.expectRemoveVisible(product); // strong UI feedback
      await productsPage.expectCartCount(i + 1);
    }

    await productsPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.expectLoaded();

    for (const product of productList) {
      await cartPage.expectItemPresent(product.title);
    }

    // Final sanity: badge still equals all items
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText(String(productList.length));
  });
});
