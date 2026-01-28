import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';
import { env } from '../config/env';
import { routes } from '../config/routes';
import { messages } from '../data/messages';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Authentication @regression', () => {
  let login: LoginPage;
  let products: ProductsPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    products = new ProductsPage(page);

    await login.goto();
    await login.expectLoaded();
  });

  test('Login with valid credentials', async ({ page }) => {
    await login.login(USERS.standard.username, env.password);

    await expect(page).toHaveURL(routes.inventory);
    await products.expectLoaded();
  });

  test('Unable to login with invalid credentials', async ({ page }) => {
    await login.login('invalid_user', 'invalid_password');

    await login.expectLoginErrorContains(messages.auth.invalidCredentials);
    await expect(page).toHaveURL(env.baseUrl);
    await products.expectNotLoaded();
  });

  test('Locked out user cannot login', async ({ page }) => {
    await login.login(USERS.lockedOut.username, env.password);

    await login.expectLoginErrorContains(messages.auth.lockedOut);
    await expect(page).toHaveURL(env.baseUrl);
    await products.expectNotLoaded();
  });

  test('Unable to access inventory page without logging in by direct URL', async ({ page }) => {
    await page.goto(routes.inventory);

    await expect(page).toHaveURL(env.baseUrl);
    await login.expectLoginErrorContains(messages.auth.notLoggedIn(routes.inventory));
    await expect(page).toHaveURL(env.baseUrl);
    await products.expectNotLoaded();
  });
});
