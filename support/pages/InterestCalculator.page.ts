import { type Page, expect } from '@playwright/test';
import BasePage from './Base.page';
import * as dotenv from 'dotenv';

dotenv.config();

class InterestCalculatorPage extends BasePage {
  constructor(page: Page) {
    const hash = '/';
    super(page, hash);
  }

  /*
  #############
  # Locators - Interest Calculator Page Elements
  #############
  */

  get bodyLocator() {
    return this.page.locator('body');
  }

  get navbarBrand() {
    return this.page.locator('.navbar-brand');
  }

  get pageHeading() {
    return this.page.getByRole('heading', { name: 'Interest Calculator' });
  }

  get principalAmountSlider() {
    return this.page.locator('#customRange1');
  }

  get interestRateDropdownButton() {
    return this.page.locator('#dropdownMenuButton');
  }

  interestRateOption(rate: string) {
    return this.page.getByLabel(rate, { exact: true });
  }

  get durationList() {
    return this.page.locator('#durationList');
  }

  durationOption(duration: 'Daily' | 'Monthly' | 'Yearly') {
    return this.page.locator(`#durationList a[data-value="${duration}"]`);
  }

  get consentCheckbox() {
    return this.page.locator('#gridCheck1');
  }

  get consentLabel() {
    return this.page.locator('label[for="gridCheck1"]');
  }

  get calculateButton() {
    return this.page.getByRole('button', { name: 'Calculate' });
  }

  get interestAmountResult() {
    return this.page.locator('#interestAmount');
  }

  get totalAmountResult() {
    return this.page.locator('#totalAmount');
  }

  /*
  #############
  # Actions - User Interactions
  #############
  */

  async visit() {
    await super.visit();
  }

  /**
   * Set the principal amount using the slider
   * @param amount The principal amount (0-15000)
   */
  async setPrincipalAmount(amount: number) {
    if (amount < 0 || amount > 15000) {
      throw new Error('Principal amount must be between 0 and 15000');
    }
    await this.principalAmountSlider.fill(amount.toString());
  }

  /**
   * Select an interest rate from the dropdown
   * @param rate The interest rate percentage (e.g., "5%")
   */
  async selectInterestRate(rate: string) {
  await this.interestRateDropdownButton.click();
  await this.interestRateOption(rate).check();
  // Used to close the dropdown
  await this.bodyLocator.click({ position: { x: 0, y: 0 } });
  }

  /**
   * Select duration option
   * @param duration "Daily", "Monthly", or "Yearly"
   */
  async selectDuration(duration: 'Daily' | 'Monthly' | 'Yearly') {
    await this.durationOption(duration).click();
  }

  async acceptConsent() {
    await this.consentCheckbox.check();
  }

  async clickCalculate() {
    await this.calculateButton.click();
  }

  /**
   * Complete full interest calculation flow
   * @param principal Principal amount (0-15000)
   * @param rate Interest rate as string (e.g., "5%")
   * @param duration "Daily", "Monthly", or "Yearly"
   */
  async calculateInterest(principal: number, rate: string, duration: 'Daily' | 'Monthly' | 'Yearly') {
    await this.setPrincipalAmount(principal);
    await this.selectInterestRate(rate);
    await this.selectDuration(duration);
    await this.acceptConsent();
    await this.clickCalculate();
  }

  /**
   * Calculate expected interest based on the formula
   * @param principal Principal amount
   * @param rate Interest rate (numeric value, e.g., 5 for 5%)
   * @param duration "Daily", "Monthly", or "Yearly"
   * @returns Expected interest rounded to 2 decimal places
   */
  calculateExpectedInterest(principal: number, rate: number, duration: 'Daily' | 'Monthly' | 'Yearly'): number {
    let interest: number;

    if (duration === 'Yearly') {
      interest = (principal * rate) / 100;
    } else if (duration === 'Monthly') {
      interest = (principal * rate) / (100 * 12);
    } else if (duration === 'Daily') {
      interest = (principal * rate) / (100 * 365);
    } else {
      throw new Error(`Invalid duration: ${duration}`);
    }
    return Math.round(interest * 100) / 100;
  }

  calculateExpectedTotal(principal: number, rate: number, duration: 'Daily' | 'Monthly' | 'Yearly'): number {
    const interest = this.calculateExpectedInterest(principal, rate, duration);
    return Math.round((principal + interest) * 100) / 100;
  }

  /*
  #############
  # Assertions - Verification Methods
  #############
  */

  async shouldBeLoaded() {
    await super.shouldBeLoaded();
    await expect(this.navbarBrand).toContainText('Ten10TechTest');
    await expect(this.pageHeading).toBeVisible();
    await expect(this.principalAmountSlider).toBeVisible();
    await expect(this.interestRateDropdownButton).toBeVisible();
    await expect(this.durationList).toBeVisible();
    await expect(this.consentCheckbox).toBeVisible();
    await expect(this.calculateButton).toBeVisible();
  }

  async shouldShowCorrectInterest(expectedInterest: number) {
    await expect(this.interestAmountResult).toBeVisible();
    await expect(this.interestAmountResult).toContainText('Interest Amount:');

    const resultText = await this.interestAmountResult.textContent();
    const actualInterest = parseFloat(resultText?.replace('Interest Amount:', '').trim() || '0');

    expect(actualInterest).toBe(expectedInterest);
  }

  async shouldShowCorrectTotal(expectedTotal: number) {
    await expect(this.totalAmountResult).toBeVisible();
    await expect(this.totalAmountResult).toContainText('Total Amount with Interest:');

    const resultText = await this.totalAmountResult.textContent();
    const actualTotal = parseFloat(resultText?.replace('Total Amount with Interest:', '').trim() || '0');

    expect(actualTotal).toBe(expectedTotal);
  }


  async shouldRequireConsent() {
    await expect(this.consentCheckbox).toHaveAttribute('required', '');
  }

  async shouldHaveSelectedDuration(duration: 'Daily' | 'Monthly' | 'Yearly') {
    await expect(this.durationOption(duration)).toHaveClass(/active/);
  }

  async shouldHaveEmptyResults() {
    const interestText = await this.interestAmountResult.textContent();
    const totalText = await this.totalAmountResult.textContent();

    expect(interestText?.trim()).toBe('');
    expect(totalText?.trim()).toBe('');
  }

  async shouldShowAlertWhenCalculateClicked(expectedMessage: string) {
    let alertText = '';

    this.page.on('dialog', async (dialog) => {
      alertText = dialog.message();
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });

    await this.calculateButton.click();
    await this.page.waitForTimeout(500);

    expect(alertText).toBe(expectedMessage);
  }
}

export default InterestCalculatorPage;
