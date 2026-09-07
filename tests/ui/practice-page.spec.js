const { test, expect } = require('@playwright/test');
const { practicePageUrl } = require('../../config/env.config');
const locators = require('../../locators/practicePageLocators');

test('@ui hide show hover confirm dialog and iframe', async ({ page }) => {
  await page.goto(practicePageUrl);
  await expect(page.locator(locators.displayedText)).toBeVisible();
  await page.locator(locators.hideTextbox).click();
  await expect(page.locator(locators.displayedText)).toBeHidden();

  page.on('dialog', (dialog) => dialog.accept());
  await page.locator(locators.confirmButton).click();
  await page.locator(locators.mouseHover).hover();

  const frame = page.frameLocator(locators.coursesIframe);
  await frame.locator(locators.lifetimeAccessLink).click();
  const heading = await frame.locator(locators.heading).textContent();
  expect(heading).toBeTruthy();
});
