import { test } from '../../support/fixtures';
import { expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


test.describe('Interest Calculator - Basic Calculation Tests', () => {

  test('Calculate interest with principal 1500, 1% rate, Yearly duration @smoke @regression', async ({ calculatorPage }) => {
    // Arrange
    const principal = 1500;
    const rate = '1%';
    const rateNumeric = 1;
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const expectedTotal = calculatorPage.calculateExpectedTotal(principal, rateNumeric, duration);

    await calculatorPage.shouldShowCorrectInterest(15.00);
    await calculatorPage.shouldShowCorrectTotal(1515.00);

    console.log(`\x1b[2m\tExpected Interest: ${expectedInterest}, Expected Total: ${expectedTotal}\x1b[0m`);
  });

  test('Calculate interest with Daily duration @smoke @regression', async ({ calculatorPage }) => {
    // Arrange
    const principal = 10000;
    const rate = '5%';
    const rateNumeric = 5;
    const duration = 'Daily';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const expectedTotal = calculatorPage.calculateExpectedTotal(principal, rateNumeric, duration);

    await calculatorPage.shouldShowCorrectInterest(expectedInterest);
    await calculatorPage.shouldShowCorrectTotal(expectedTotal);

    console.log(`\x1b[2m\tDaily - Expected Interest: ${expectedInterest}, Expected Total: ${expectedTotal}\x1b[0m`);
  });

  test('Calculate interest with Monthly duration', async ({ calculatorPage }) => {
    // Arrange
    const principal = 5000;
    const rate = '10%';
    const rateNumeric = 10;
    const duration = 'Monthly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const expectedTotal = calculatorPage.calculateExpectedTotal(principal, rateNumeric, duration);

    await calculatorPage.shouldShowCorrectInterest(expectedInterest);
    await calculatorPage.shouldShowCorrectTotal(expectedTotal);

    console.log(`\x1b[2m\tMonthly - Expected Interest: ${expectedInterest}, Expected Total: ${expectedTotal}\x1b[0m`);
  });

});

test.describe('Interest Calculator - Different Interest Rates', () => {

  test('Calculate with 15% interest rate (maximum)', async ({ calculatorPage }) => {
    // Arrange
    const principal = 8000;
    const rate = '15%';
    const rateNumeric = 15;
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const expectedTotal = calculatorPage.calculateExpectedTotal(principal, rateNumeric, duration);

    await calculatorPage.shouldShowCorrectInterest(expectedInterest);
    await calculatorPage.shouldShowCorrectTotal(expectedTotal);
  });

  test('Calculate with 7% interest rate', async ({ calculatorPage }) => {
    // Arrange
    const principal = 3000;
    const rate = '7%';
    const rateNumeric = 7;
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const expectedTotal = calculatorPage.calculateExpectedTotal(principal, rateNumeric, duration);

    await calculatorPage.shouldShowCorrectInterest(expectedInterest);
    await calculatorPage.shouldShowCorrectTotal(expectedTotal);
  });

});

test.describe('Interest Calculator - Decimal Rounding Tests', () => {

  test('Result should be rounded to 2 decimal places', async ({ calculatorPage }) => {
    // Arrange
    const principal = 1000;
    const rate = '3%';
    const rateNumeric = 3;
    const duration = 'Daily';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const interestText = await calculatorPage.interestAmountResult.textContent();
    const interestValue = interestText?.replace('Interest Amount:', '').trim();
    const decimalPart = interestValue?.split('.')[1];

    expect(decimalPart?.length).toBeLessThanOrEqual(2);
    await calculatorPage.shouldShowCorrectInterest(expectedInterest);
  });

});

test.describe('Interest Calculator - Field Validation Tests', () => {

  test('Should not calculate with consent checkbox un-checked', async ({ calculatorPage }) => {
    // Arrange
    const principal = 1000;
    const rate = '5%';
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);

    // Assert
     await calculatorPage.shouldRequireConsent();
    await calculatorPage.shouldShowAlertWhenCalculateClicked('Please accept the mandatory consent.');
    await calculatorPage.shouldHaveEmptyResults();
  });

  test('Should display no results before calculation', async ({ calculatorPage }) => {
    // Arrange
    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Assert
    await calculatorPage.shouldHaveEmptyResults();
  });

  test('Should have Daily option selected by default', async ({ calculatorPage }) => {
    // Arrange
    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Assert
    await calculatorPage.shouldHaveSelectedDuration('Daily');
  });

});

test.describe('Interest Calculator - Error Message Tests', () => {

  test('Should show alert when Calculating without selecting interest rate', async ({ calculatorPage }) => {
    // Arrange
    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(1000);
    await calculatorPage.selectDuration('Yearly');


    // Assert
    await calculatorPage.shouldShowAlertWhenCalculateClicked('Please fill in all fields.');
  });

  test('Should show alert when Mandatory fields are not selected', async ({ calculatorPage }) => {
    // Arrange
    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.acceptConsent();

    // Assert
    await calculatorPage.shouldShowAlertWhenCalculateClicked('Please fill in all fields.');
  });

});

test.describe('Interest Calculator - Boundary Value Tests', () => {

  test('Calculate with minimum principal amount (0)', async ({ calculatorPage }) => {
    // Arrange
    const principal = 0;
    const rate = '5%';
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    await calculatorPage.shouldShowCorrectInterest(0.00);
    await calculatorPage.shouldShowCorrectTotal(0.00);
  });

  test('Calculate with maximum principal amount (15000)', async ({ calculatorPage }) => {
    // Arrange
    const principal = 15000;
    const rate = '10%';
    const rateNumeric = 10;
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    const expectedInterest = calculatorPage.calculateExpectedInterest(principal, rateNumeric, duration);
    const expectedTotal = calculatorPage.calculateExpectedTotal(principal, rateNumeric, duration);

    await calculatorPage.shouldShowCorrectInterest(expectedInterest);
    await calculatorPage.shouldShowCorrectTotal(expectedTotal);
  });

  test('Calculate with 1% interest rate (minimum)', async ({ calculatorPage }) => {
    // Arrange
    const principal = 10000;
    const rate = '1%';
    const duration = 'Yearly';

    await calculatorPage.visit();
    await calculatorPage.shouldBeLoaded();

    // Act
    await calculatorPage.setPrincipalAmount(principal);
    await calculatorPage.selectInterestRate(rate);
    await calculatorPage.selectDuration(duration);
    await calculatorPage.acceptConsent();
    await calculatorPage.clickCalculate();

    // Assert
    await calculatorPage.shouldShowCorrectInterest(100.00);
    await calculatorPage.shouldShowCorrectTotal(10100.00);
  });

});
