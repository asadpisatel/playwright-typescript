import {test, expect} from '@playwright/test';

test.describe('Корзина', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Проверка добавления товара в корзину', async ({ page }) => {
    await page.locator('[data-test="product-name"]').first().click();
    await page.locator('[data-test="add-to-cart"]').click();

    await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
    await expect(page.locator('.toast-success')).toContainText(' Product added to shopping cart. ')

    await page.locator('[data-test="nav-cart"]').click();

    await expect(page).toHaveURL(/.*\/checkout/);
    
    await expect(page.locator('table tbody tr').filter({ hasText: 'Combination Pliers' })).toBeVisible();
  });
})