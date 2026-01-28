// pages/CartPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { BurgerMenu } from './components/BurgerMenu';

export class CartPage {
  readonly title: Locator;
  readonly cartContents: Locator;
  readonly cartList: Locator;

  readonly items: Locator;

  readonly continueShopping: Locator;
  readonly checkout: Locator;

  readonly menu: BurgerMenu;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title'); // "Your Cart"
    this.cartContents = page.getByTestId('cart-contents-container');
    this.cartList = page.getByTestId('cart-list');

    // Cart page uses data-test="inventory-item" on cart rows as well
    this.items = page.getByTestId('inventory-item');

    this.continueShopping = page.getByTestId('continue-shopping');
    this.checkout = page.getByTestId('checkout');

    this.menu = new BurgerMenu(page);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.cartContents).toBeVisible();
    await expect(this.title).toHaveText('Your Cart');
  }

  async checkoutNow() {
    await this.checkout.click();
  }

  async continueShoppingNow() {
    await this.continueShopping.click();
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

  async removeByTestId(removeTestId: string) {
    await this.page.getByTestId(removeTestId).click();
  }
}
