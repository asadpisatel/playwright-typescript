import { test, expect } from '@playwright/test';

test.describe('API + UI: Симбиоз', () => {
  const uniqueId = Date.now();
  const testEmail = `aqa_${uniqueId}@test.com`;
  const testPassword = `SuperSecret_${uniqueId}!`;

  test('Динамическое создание юзера через API и вход через UI', async ({ request, page }) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/register', {
      data: {
        address: {
          city: "Testville",
          country: "US",
          postal_code: "12345",
          state: "TX",
          street: "123 Test St"
        },
        dob: "1990-01-01",
        email: testEmail,
        first_name: "Test",
        last_name: "Automation",
        password: testPassword,
        phone: "1234567890",
      }
    });

    expect(response.status()).toBe(201);

    await page.context().clearCookies(); 

    await page.goto('/auth/login');
    await page.locator('[data-test="email"]').fill(testEmail);
    await page.locator('[data-test="password"]').fill(testPassword);
    await page.locator('[data-test="login-submit"]').click();

    await expect(page).not.toHaveURL(/.*\/auth\/login/);
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
  });
});