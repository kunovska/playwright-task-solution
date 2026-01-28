// pages/components/BurgerMenu.ts
import { expect, Locator, Page } from '@playwright/test';

export class BurgerMenu {
  readonly open: Locator;
  readonly close: Locator;
  readonly panel: Locator;

  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly reset: Locator;

  constructor(private readonly page: Page) {
    this.open = page.getByTestId('open-menu'); // image has data-test="open-menu"
    this.close = page.getByTestId('close-menu'); // image has data-test="close-menu"
    this.panel = page.locator('.bm-item-list');

    this.allItems = page.getByTestId('inventory-sidebar-link');
    this.about = page.getByTestId('about-sidebar-link');
    this.logout = page.getByTestId('logout-sidebar-link');
    this.reset = page.getByTestId('reset-sidebar-link');
  }

  async openMenu() {
    await this.open.click();
    await expect(this.panel).toBeVisible();
  }

  async closeMenu() {
    await this.close.click();
    await expect(this.panel).toBeHidden();
  }

  async clickAllItems() {
    await this.openMenu();
    await this.allItems.click();
  }

  async clickAbout() {
    await this.openMenu();
    await this.about.click();
  }

  async clickLogout() {
    await this.openMenu();
    await this.logout.click();
  }

  async clickResetAppState() {
    await this.openMenu();
    await this.reset.click();
  }
}
