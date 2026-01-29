import { expect, Locator, Page } from '@playwright/test';

export class BurgerMenu {
  readonly openButton: Locator;
  readonly closeButton: Locator;

  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly reset: Locator;

  constructor(private readonly page: Page) {
    this.openButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.locator('#react-burger-cross-btn');

    this.allItems = page.getByTestId('inventory-sidebar-link');
    this.about = page.getByTestId('about-sidebar-link');
    this.logout = page.getByTestId('logout-sidebar-link');
    this.reset = page.getByTestId('reset-sidebar-link');
  }

  async openMenu() {
    await this.openButton.click();
    await expect(this.allItems).toBeVisible();
  }

  async clickAllItems() {
    await this.openMenu();
    await this.allItems.click();
  }

  async clickAbout(): Promise<Page> {
    await this.openMenu();
    await Promise.all([this.about.click()]);
    return this.page;
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
