const { test, expect } = require('@playwright/test');
const { calendarUrl } = require('../../config/env.config');
const locators = require('../../locators/shopSearchLocators');

test('@ui product search on shop page', async ({ page }) => {
  const [baseUrl] = calendarUrl.split('#');
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  const search = page.getByRole('searchbox', { name: locators.searchBox });
  await expect(search).toBeVisible();
  await search.fill('Cucumber');
  await expect(page.getByText(/Cucumber/i).first()).toBeVisible();
});
