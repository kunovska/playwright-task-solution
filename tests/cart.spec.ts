import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Header } from '../pages/components/Header';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';

test.describe('Add to cart - all products @regression', () => {
  let login: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let header: Header;

  const productList = Object.values(PRODUCTS);

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    header = new Header(page);

    await login.goto();
    await login.login(USERS.standard.username, env.password);
    await productsPage.expectLoaded();
  });

  test('User can add every product; badge increments; Cart contains all items', async () => {
    for (let i = 0; i < productList.length; i++) {
      const product = productList[i];

      await productsPage.addToCart(product);
      await header.expectCartCount(i + 1);
    }

    await header.openCart();
    await cartPage.expectLoaded();

    for (const product of productList) {
      await cartPage.expectItemPresent(product.title);
    }

    await header.expectCartCount(productList.length);
  });

  test('User can remove a product from cart; Badge decrements; Item disappears', async () => {
    const first = productList[0];
    const second = productList[1];

    await productsPage.addToCart(first);
    await header.expectCartCount(1);

    await productsPage.addToCart(second);
    await header.expectCartCount(2);

    await header.openCart();
    await cartPage.expectLoaded();

    await cartPage.removeProductByAddToCartTestId(first.addToCartTestId);

    await cartPage.expectItemNotPresent(first.title);
    await cartPage.expectItemPresent(second.title);
    await header.expectCartCount(1);
  });
});
