import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { BurgerMenu } from '../pages/components/BurgerMenu';
import { Header } from '../pages/components/Header';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';

test.describe('Burger Menu @smoke @regression', () => {
  let login: LoginPage;
  let products: ProductsPage;
  let cart: CartPage;

  let menu: BurgerMenu;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    products = new ProductsPage(page);
    cart = new CartPage(page);

    menu = new BurgerMenu(page);
    header = new Header(page);

    await login.goto();
    await login.login(USERS.standard.username, env.password);
    await products.expectLoaded();
  });

  test('All Items navigates back to products page', async () => {
    await header.openCart();
    await cart.expectLoaded();

    await menu.clickAllItems();
    await products.expectLoaded();
  });

  test('About navigates to SauceLabs site', async () => {
    await menu.clickAbout();
  });

  test('Logout logs user out and returns to login page', async () => {
    await menu.clickLogout();
    await login.expectLoaded();
  });

  test('Reset App State clears the cart badge', async () => {
    const firstProduct = Object.values(PRODUCTS)[0];

    await products.addToCart(firstProduct);
    await header.expectCartCount(1);

    await menu.clickResetAppState();
    await header.expectCartCount(0);
  });
});
