import { expect, Locator, Page } from '@playwright/test';
import { routes } from '../config/routes';

export class CheckoutCompletePage {
  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly backHome: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.completeHeader = page.getByTestId('complete-header');
    this.backHome = page.getByTestId('back-to-products');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(routes.checkoutComplete);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toBeVisible();
  }

  async backToProducts() {
    await this.backHome.click();
  }
}
