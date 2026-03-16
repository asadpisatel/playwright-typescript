import { test as setup, expect } from '@playwright/test';
import { USERS } from '../data/users';

const authFile = 'playwright/.auth/user.json';

setup('Глобальная авторизация', async ({ page }) => {
  await page.goto('/auth/login');
  await page.locator('[data-test="email"]').fill(USERS.mainCustomer.email);
  await page.locator('[data-test="password"]').fill(USERS.mainCustomer.password);
  await page.locator('[data-test="login-submit"]').click();

  await expect(page).not.toHaveURL(/.*\/auth\/login/);
  await page.context().storageState({ path: authFile });
});