// pages/ProductsPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { BurgerMenu } from './components/BurgerMenu';

export type ProductRef = {
  title: string;
  addToCartTestId: string; // e.g. 'add-to-cart-sauce-labs-backpack'
};

export class ProductsPage {
  readonly header: Locator;
  readonly title: Locator;

  readonly inventoryContainer: Locator;
  readonly inventoryList: Locator;
  readonly items: Locator;

  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  readonly sortSelect: Locator;
  readonly activeSortOption: Locator;

  readonly menu: BurgerMenu;

  constructor(private readonly page: Page) {
    this.header = page.getByTestId('header-container');
    this.title = page.getByTestId('title'); // "Products"

    this.inventoryContainer = page.getByTestId('inventory-container');
    this.inventoryList = page.getByTestId('inventory-list');
    this.items = page.getByTestId('inventory-item');

    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');

    this.sortSelect = page.getByTestId('product-sort-container');
    this.activeSortOption = page.getByTestId('active-option');

    this.menu = new BurgerMenu(page);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.header).toBeVisible();
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryList).toBeVisible();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    const badgeCount = await this.cartBadge.count();
    if (count === 0) {
      // If the badge isn't present in the DOM, that's equivalent to zero.
      if (badgeCount === 0) return;
      // If present, ensure it's not visible or empty
      try {
        await expect(this.cartBadge).not.toBeVisible();
      } catch {
        // fallback: ensure it doesn't contain a positive number
        await expect(this.cartBadge).not.toHaveText(/\d+/);
      }
    } else {
      // Ensure badge is visible and has expected number
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async addToCart(product: ProductRef) {
    await this.page.getByTestId(product.addToCartTestId).click();
  }

  async removeFromCart(product: ProductRef) {
    const removeTestId = product.addToCartTestId.replace(/^add-to-cart-/, 'remove-');
    await this.page.getByTestId(removeTestId).click();
  }

  async expectRemoveVisible(product: ProductRef) {
    const removeTestId = product.addToCartTestId.replace(/^add-to-cart-/, 'remove-');
    await expect(this.page.getByTestId(removeTestId)).toBeVisible();
  }

  async selectSort(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(value);
  }

  async getVisiblePrices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    return texts.map((t) => Number(t.replace('$', '').trim()));
  }

  async expectProductCardHasContent(productTitle: string) {
    // Scope to one item by title text, then validate children via testIds
    const card = this.items.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: productTitle }),
    });

    await expect(card).toHaveCount(1);
    await expect(card.getByTestId('inventory-item-name')).toHaveText(productTitle);
    await expect(card.getByTestId('inventory-item-desc')).not.toHaveText('');
    await expect(card.getByTestId('inventory-item-price')).toHaveText(/^\$\d+\.\d{2}$/);
  }
}
