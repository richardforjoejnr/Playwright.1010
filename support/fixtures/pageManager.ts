import { test as base } from '@playwright/test';
import LoginPage from '../pages/Login.page';
import InterestCalculatorPage from '../pages/InterestCalculator.page';

export const pageInstance = base.extend<{
  loginPage: LoginPage;
  calculatorPage: InterestCalculatorPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  calculatorPage: async ({ page }, use) => {
    await use(new InterestCalculatorPage(page));
  },
});
