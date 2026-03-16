import { test, expect } from "@playwright/test";

test.describe("Каталог товаров", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('Сортировка @QMETRY-777', async ({ page }) => {
    await page.locator('[data-test="sort"]').selectOption('name,desc')

    await expect(page.locator('[data-test="product-name"]').first()).toHaveText('Wood Saw');
  })

  test('Фильтрация', async ({ page }) => {
    await page.getByLabel('Pliers').check();

    await expect(page.locator('[data-test="product-name"]').first()).toHaveText('Combination Pliers');
  })
})