import { test } from '../../support/fixtures';
import * as dotenv from 'dotenv';
dotenv.config();

const authFile = '.auth/user.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {

  test('Login with test user and save session state @smoke', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.loginWithTestAccount();

    // Assert
    await loginPage.shouldBeLoggedIn();
    await loginPage.saveStorageState();
    console.log(`\x1b[2m\tSession state saved to ${authFile} for standard_user\x1b[0m`);
    await loginPage.logout();
  });

  test('Login with invalid password should show error message', async ({ loginPage }) => {
    // Arrange
    const validEmail = process.env.EMAIL || 'test@example.com';
    const invalidPassword = 'InvalidPassword123!';
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act
    await loginPage.login(validEmail, invalidPassword);

    // Assert
    await loginPage.shouldShowLoginErrorMessage('Invalid login attempt.');
  });

  test('Login without entering any details should show validation errors', async ({ loginPage }) => {
    // Arrange
    await loginPage.visit();
    await loginPage.shouldBeLoaded();

    // Act 
    await loginPage.loginInButton.click();

    // Assert
    await loginPage.shouldShowValidationErrors();
    await loginPage.shouldStillBeOnLoginPage();
  });

});
