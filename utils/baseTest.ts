import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Header } from '../pages/header.page';

type MyFixtures = {
  loginPage: LoginPage;
  header: Header;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },
});

export { expect } from '@playwright/test';