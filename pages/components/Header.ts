import { expect, Locator, Page } from '@playwright/test';

export class Header {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    const badgeNodes = await this.cartBadge.count();

    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }

    if (badgeNodes === 0) {
      await expect(this.cartBadge).toHaveCount(1);
    }

    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
