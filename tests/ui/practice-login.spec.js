const { test, expect } = require('@playwright/test');
const { PracticeLoginPage } = require('../../pages/PracticeLoginPage');
const { practiceUsername, practicePassword } = require('../../config/env.config');
const { readJson } = require('../../utils/dataReader');
const locators = require('../../locators/practiceLoginLocators');

const users = readJson('test-data/users.json');

test.describe('Practice login page', () => {
  test('@ui invalid then valid login', async ({ page }) => {
    const loginPage = new PracticeLoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errorMessage).toContainText('Incorrect');
    await loginPage.login(practiceUsername, practicePassword);
    await expect(page).toHaveURL(/shop/);
  });

  test('@ui dropdown radio checkbox and blinking link', async ({ page }) => {
    const loginPage = new PracticeLoginPage(page);
    await loginPage.goto();
    await loginPage.roleDropdown.selectOption('consult');
    await loginPage.userTypeRadio.last().click();
    await loginPage.okayButton.click();
    await expect(loginPage.userTypeRadio.last()).toBeChecked();
    await loginPage.termsCheckbox.check();
    await expect(loginPage.termsCheckbox).toBeChecked();
    await loginPage.termsCheckbox.uncheck();
    expect(await loginPage.termsCheckbox.isChecked()).toBeFalsy();
    await expect(loginPage.documentLink).toHaveAttribute('class', 'blinkingText');
  });

  test('@ui child window domain extraction', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new PracticeLoginPage(page);
    await loginPage.goto();

    const [childPage] = await Promise.all([
      context.waitForEvent('page'),
      loginPage.documentLink.click(),
    ]);

    const text = await childPage.locator(locators.childWindowHint).textContent();
    const domain = text.split('@')[1].split(' ')[0];
    await loginPage.usernameInput.fill(domain);
    expect(await loginPage.usernameInput.inputValue()).toBe(domain);
    await context.close();
  });
});
