// pages/CheckoutInformationPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { BurgerMenu } from './components/BurgerMenu';

export type CheckoutInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutInformationPage {
  readonly title: Locator;
  readonly container: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;

  readonly continue: Locator;
  readonly cancel: Locator;

  readonly error: Locator;

  readonly menu: BurgerMenu;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title'); // "Checkout: Your Information"
    this.container = page.getByTestId('checkout-info-container');

    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');

    this.continue = page.getByTestId('continue');
    this.cancel = page.getByTestId('cancel');

    this.error = page.locator('[data-test="error"]');

    this.menu = new BurgerMenu(page);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.container).toBeVisible();
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async fill(info: CheckoutInfo) {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
  }

  async continueNext() {
    await this.continue.click();
  }

  async cancelToCart() {
    await this.cancel.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toContainText(text);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }
}
