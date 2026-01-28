// pages/ProductsPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { routes } from '../config/routes';

export type ProductRef = {
  title: string;
  addToCartTestId: string;
};

export class ProductsPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  private cardByTitle(title: string): Locator {
    return this.items.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: title }),
    });
  }

  private removeButtonFor(product: ProductRef): Locator {
    const removeTestId = product.addToCartTestId.replace(/^add-to-cart-/, 'remove-');
    return this.page.getByTestId(removeTestId);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(routes.inventory);
    await expect(this.title).toHaveText('Products');
    await expect(this.items.first()).toBeVisible();
  }

  async expectNotLoaded() {
    await expect(this.page).not.toHaveURL(routes.inventory);
    await expect(this.items.first()).not.toBeVisible();
  }

  async addToCart(product: ProductRef) {
    const btn = this.page.getByTestId(product.addToCartTestId);
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(this.removeButtonFor(product)).toBeVisible();
  }

  async selectSort(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  async getVisiblePrices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    const nums = texts.map((t) => Number(t.replace('$', '').trim()));
    for (const n of nums) expect(n, 'Price should be a number').not.toBeNaN();
    return nums;
  }

  async expectProductCardHasContent(productTitle: string) {
    const card = this.cardByTitle(productTitle);

    await expect(card).toHaveCount(1);
    await expect(card.getByTestId('inventory-item-name')).toHaveText(productTitle);
    await expect(card.getByTestId('inventory-item-desc')).not.toBeEmpty();
    await expect(card.getByTestId('inventory-item-price')).toHaveText(/^\$\d+\.\d{2}$/);
  }
}
