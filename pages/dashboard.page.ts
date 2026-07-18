import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1');
    this.productCards = page.locator('.inventory-item');
  }

  async navigate() {
    await this.page.goto('https://demo.playwright.dev/api-mocking');
  }

  async verifyHeader(expectedText: string) {
    await expect(this.header).toHaveText(expectedText);
  }
}