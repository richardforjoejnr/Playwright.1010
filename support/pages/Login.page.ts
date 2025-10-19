import { type Page, expect } from '@playwright/test';
import BasePage from './Base.page';
import * as dotenv from 'dotenv';

dotenv.config();

const authFile = '.auth/user.json';

class LoginPage extends BasePage {
  constructor(page: Page) {
    const hash = '/Account/Login';
    super(page, hash);
  }

  /*
  #############
  # Locators - Ten10 Login Page Elements
  #############
  */

  get userEmailField() {
    return this.page.locator('#UserName');
  }

  get userPasswordField() {
    return this.page.locator('#Password');
  }

  get loginInButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  get loginErrorMessage() {
    return this.page.getByRole('alert');
  }

  get userNameValidationError() {
    return this.page.locator('#UserName-error');
  }

  get passwordValidationError() {
    return this.page.locator('#Password-error');
  }

  get pageHeading() {
    return this.page.getByRole('heading', { name: /please enter your login/i });
  }

  get navbarBrand() {
    return this.page.locator('.navbar-brand');
  }

  get logoutButton() {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  /*
  #############
  # Actions - User Interactions
  #############
  */

  async visit() {
    await super.visit();
  }

  async login(name: string, password: string) {
    await this.userEmailField.fill(name);
    await this.userPasswordField.fill(password);
    await this.loginInButton.click();
  }

  async loginWithTestAccount() {
    const username = process.env.EMAIL;
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error('Email/Username or password is missing in environment variables.');
    }
    await this.login(username, password);
  }

  async logout() {
    // Ten10 uses a logout button inside #logout-container
    if (await this.logoutButton.isVisible()) {
      await this.logoutButton.click();
    }
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
    await expect(this.userEmailField).toBeVisible();
    await expect(this.userPasswordField).toBeVisible();
    await expect(this.loginInButton).toBeVisible();
  }

  async shouldShowLoginErrorMessage(expectedMessage: string) {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toContainText(expectedMessage);
  }

  async shouldShowValidationErrors() {
    await expect(this.userNameValidationError).toBeVisible();
    await expect(this.userNameValidationError).toContainText('The UserName field is required.');
    await expect(this.passwordValidationError).toBeVisible();
    await expect(this.passwordValidationError).toContainText('The Password field is required.');
  }

  async shouldStillBeOnLoginPage() {
    await expect(this.page).toHaveURL(/.*Login.*/);
    await expect(this.loginInButton).toBeVisible();
  }

  async shouldBeLoggedIn() {
    await expect(this.page).not.toHaveURL(/.*Login.*/);
    await expect(this.loginInButton).not.toBeVisible();
    await expect(this.navbarBrand).toContainText('Ten10TechTest');
  }

  async saveStorageState() {
    await this.page.context().storageState({ path: authFile });
  }
}

export default LoginPage;
