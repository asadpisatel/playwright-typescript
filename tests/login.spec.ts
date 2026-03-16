import { test, expect } from '../utils/baseTest';
import { USERS } from '../data/users';

const negativeLoginData = [
  { testName: 'Неверный пароль', email: USERS.mainCustomer.email, password: 'wrong_password', expectedError: 'Invalid email or password' },
  { testName: 'Несуществующий email', email: 'not_exist_404@test.com', password: USERS.mainCustomer.password, expectedError: 'Invalid email or password' },
  { testName: 'Пустой email', email: '', password: USERS.mainCustomer.password, expectedError: 'Email is required' },
];

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Авторизация', () => {

  test('Успешный логин', async ({ page, loginPage, header }) => {
    await loginPage.open();
    await loginPage.login(USERS.mainCustomer.email, USERS.mainCustomer.password);

    await expect(page).not.toHaveURL(/.*\/auth\/login/);
    await header.expectNavMenuVisible();
  });
  
  for (const data of negativeLoginData) {
  test(`Негативный логин: ${data.testName}`, async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login(data.email, data.password);

    const errorMessage = page.locator('[data-test="login-error"], .alert-danger'); 
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(data.expectedError);
  });
}
});