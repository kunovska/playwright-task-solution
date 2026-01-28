// pages/CheckoutCompletePage.ts
import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly backHome: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title'); // "Checkout: Complete!"
    this.completeHeader = page.getByTestId('complete-header');
    this.backHome = page.getByTestId('back-to-products');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toBeVisible();
  }

  async backToProducts() {
    await this.backHome.click();
  }
}
