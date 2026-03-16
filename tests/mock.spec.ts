import { test, expect } from '@playwright/test';

test.describe('Мокинг и перехват трафика', () => {

  test('Имитация 500 ошибки при загрузке каталога', async ({ page }) => {
    await page.route('**/products*', async (route) => {
      
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Бэкенд в огне! Internal Server Error' })
      });
      
    });

    await page.goto('/');

    await expect(page.locator('[data-test="product-name"]')).toHaveCount(0);
  });

});