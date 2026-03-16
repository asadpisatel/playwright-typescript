import { test, expect } from '@playwright/test';

test.describe('Smoke тесты', () => {
  test('Главная страница имеет правильный заголовок', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/);
  });
});