import { test as setup } from '../support/fixtures';
import * as dotenv from 'dotenv';

dotenv.config();

setup('login, and save session state', async ({ loginPage }) => {
  await loginPage.visit();
  await loginPage.shouldBeLoaded();

  await loginPage.loginWithTestAccount();
  console.log(`\x1b[2m\tSign in processed\x1b[0m`);

  await loginPage.saveStorageState();
});
