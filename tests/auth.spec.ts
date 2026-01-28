import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';
import { env } from '../config/env';

test.describe('Authentication @regression', () => {
  test('Verify user is able to login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USERS.standard.username, env.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
    await expect(page.getByTestId('inventory-list')).toBeVisible();
  });

  test('Verify user is not able to login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('invalid_user', 'invalid_password');

    await login.expectLoginErrorContains('Username and password do not match');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test('Locked out user cannot login (edge case)', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USERS.lockedOut.username, env.password);

    await login.expectLoginErrorContains('locked out');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
