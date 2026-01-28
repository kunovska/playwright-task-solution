import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';

test.describe('Checkout @smoke @regression', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, env.password);
  });

  test('Happy path: add item -> checkout -> overview -> finish', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    const backpack = PRODUCTS.backpack ?? Object.values(PRODUCTS)[0];

    await products.addToCart(backpack);
    await products.expectCartCount(1);
    await products.openCart();

    const cart = new CartPage(page);
    await cart.expectLoaded();
    await cart.checkoutNow();

    const info = new CheckoutInformationPage(page);
    await info.expectLoaded();
    await info.fill({ firstName: 'John', lastName: 'Doe', postalCode: '1000' });
    await info.continueNext();

    const overview = new CheckoutOverviewPage(page);
    await overview.expectLoaded();
    await overview.expectItemPresent(backpack.title);
    await overview.expectTotalsPresent();
    await overview.finishCheckout();

    const complete = new CheckoutCompletePage(page);
    await complete.expectLoaded();
  });

  test('Validation: missing postal code shows error', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectLoaded();

    const backpack = PRODUCTS.backpack ?? Object.values(PRODUCTS)[0];

    await products.addToCart(backpack);
    await products.openCart();

    const cart = new CartPage(page);
    await cart.checkoutNow();

    const info = new CheckoutInformationPage(page);
    await info.expectLoaded();
    await info.fill({ firstName: 'John', lastName: 'Doe', postalCode: '' });
    await info.continueNext();

    await info.expectErrorContains('Postal Code is required');
    await expect(page.getByTestId('title')).toHaveText('Checkout: Your Information');
  });
});
