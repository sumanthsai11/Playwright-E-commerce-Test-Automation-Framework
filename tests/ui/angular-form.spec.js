const { test, expect } = require('@playwright/test');
const { angularFormUrl } = require('../../config/env.config');
const locators = require('../../locators/angularFormLocators');

test('@ui angular form locators and shop filter', async ({ page }) => {
  await page.goto(angularFormUrl);
  await page.getByLabel(locators.iceCreamCheckbox).click();
  await page.getByLabel(locators.employedRadio).check();
  await page.getByLabel(locators.gender).selectOption('Female');
  await page.getByPlaceholder(locators.passwordPlaceholder).fill('abc123');
  await page.getByRole('button', { name: locators.submit }).click();
  await expect(page.getByText(locators.successMessage)).toBeVisible();

  await page.getByRole('link', { name: locators.shopLink }).click();
  await page.locator(locators.productCard).filter({ hasText: locators.featuredProduct }).getByRole('button').click();
});
