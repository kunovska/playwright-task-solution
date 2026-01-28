import { expect, Locator, Page } from '@playwright/test';
import { BurgerMenu } from './components/BurgerMenu';

export class CheckoutOverviewPage {
  readonly title: Locator;
  readonly container: Locator;

  readonly cartList: Locator;
  readonly items: Locator;

  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;

  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly finish: Locator;
  readonly cancel: Locator;

  readonly menu: BurgerMenu;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title'); // "Checkout: Overview"
    this.container = page.getByTestId('checkout-summary-container');

    this.cartList = page.getByTestId('cart-list');
    this.items = page.getByTestId('inventory-item');

    this.paymentInfoValue = page.getByTestId('payment-info-value');
    this.shippingInfoValue = page.getByTestId('shipping-info-value');

    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');

    this.finish = page.getByTestId('finish');
    this.cancel = page.getByTestId('cancel');

    this.menu = new BurgerMenu(page);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.container).toBeVisible();
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async expectItemPresent(title: string) {
    const row = this.items.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: title }),
    });
    await expect(row).toHaveCount(1);
  }

  async expectTotalsPresent() {
    await expect(this.subtotal).toContainText('Item total:');
    await expect(this.tax).toContainText('Tax:');
    await expect(this.total).toContainText('Total:');
  }

  async finishCheckout() {
    await this.finish.click();
  }

  async cancelToProducts() {
    await this.cancel.click();
  }
}
