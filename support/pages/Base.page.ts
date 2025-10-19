import { type Page, expect } from '@playwright/test';

class BasePage {
  protected page: Page;
  protected hash: string;

  public constructor(page: Page, hash: string) {
    this.page = page;
    this.hash = hash;
  }

  /*
  #############
  # Actions - Common Actions on the page
  #############
  */

  async visit() {
    await this.page.goto(this.hash);
  }

  /*
  #############
  # Assertions - Common Assertions on the page
  #############
  */

  async shouldBeLoaded() {
    await expect(this.page).toHaveURL(new RegExp(this.hash));
    await this.assertPageUrl(this.hash);
    await this.page.waitForURL(this.hash, {
      waitUntil: 'networkidle',
      timeout: 10000
    });
  }

  async assertPageUrl(expectedHash: string) {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(expectedHash);
  }

}

export default BasePage;
