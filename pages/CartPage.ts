import { expect, Locator, Page } from '@playwright/test';
import { routes } from '../config/routes';

export class CartPage {
  readonly title: Locator;
  readonly cartContents: Locator;
  readonly items: Locator;

  readonly continueShopping: Locator;
  readonly checkout: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartContents = page.getByTestId('cart-contents-container');
    this.items = page.getByTestId('inventory-item');

    this.continueShopping = page.getByTestId('continue-shopping');
    this.checkout = page.getByTestId('checkout');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(routes.cart);
    await expect(this.cartContents).toBeVisible();
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectItemPresent(title: string) {
    const row = this.items.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: title }),
    });
    await expect(row).toHaveCount(1);
  }

  async expectItemNotPresent(title: string) {
    const row = this.items.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: title }),
    });
    await expect(row).toHaveCount(0);
  }

  async removeProductByAddToCartTestId(addToCartTestId: string) {
    const removeTestId = addToCartTestId.replace(/^add-to-cart-/, 'remove-');
    await this.page.getByTestId(removeTestId).click();
  }

  async checkoutNow() {
    await this.checkout.click();
  }
}
