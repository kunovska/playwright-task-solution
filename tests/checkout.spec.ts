import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { Header } from '../pages/components/Header';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { PRODUCTS } from '../data/products';
import { messages } from '../data/messages';

test.describe('Checkout @smoke @regression', () => {
  let login: LoginPage;
  let products: ProductsPage;
  let cart: CartPage;
  let header: Header;
  let info: CheckoutInformationPage;
  let overview: CheckoutOverviewPage;
  let complete: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    products = new ProductsPage(page);
    cart = new CartPage(page);
    header = new Header(page);
    info = new CheckoutInformationPage(page);
    overview = new CheckoutOverviewPage(page);
    complete = new CheckoutCompletePage(page);

    await login.goto();
    await login.login(USERS.standard.username, env.password);
    await products.expectLoaded();
  });

  test('Happy path: add item -> checkout -> overview -> finish', async () => {
    const backpack = PRODUCTS.backpack ?? Object.values(PRODUCTS)[0];

    await products.addToCart(backpack);
    await header.expectCartCount(1);
    await header.openCart();

    await cart.expectLoaded();
    await cart.checkoutNow();

    await info.expectLoaded();
    await info.fill({ firstName: 'John', lastName: 'Doe', postalCode: '1000' });
    await info.continueNext();

    await overview.expectLoaded();
    await overview.expectItemPresent(backpack.title);
    await overview.expectTotalsPresent();
    await overview.finishCheckout();

    await complete.expectLoaded();
  });

  test('Validation: missing postal code shows error', async () => {
    const backpack = PRODUCTS.backpack ?? Object.values(PRODUCTS)[0];

    await products.addToCart(backpack);
    await header.openCart();

    await cart.expectLoaded();
    await cart.checkoutNow();

    await info.expectLoaded();
    await info.fill({ firstName: 'John', lastName: 'Doe', postalCode: '' });
    await info.continueNext();

    await info.expectErrorContains(messages.checkout.postalCodeRequired);
    await info.expectLoaded(); 
  });
});
