import { Page, Locator, expect } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.locator('[data-test="nav-menu"]');
  }

  expectNavMenuVisible() {
    return expect(this.navMenu).toBeVisible();
  }
}