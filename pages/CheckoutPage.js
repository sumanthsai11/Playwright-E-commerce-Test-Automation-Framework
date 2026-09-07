const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const locators = require('../locators/checkoutLocators');
const { logger } = require('../utils/logger');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.countryInput = this.locator(locators.countryInput);
    this.countryResults = this.locator(locators.countryResults);
    this.loggedInEmail = this.locator(locators.loggedInEmail).first();
    this.placeOrderButton = this.locator(locators.placeOrderButton);
    this.confirmationText = this.locator(locators.confirmationText);
    this.orderIdLabel = this.locator(locators.orderIdLabel);
  }

  async selectCountry(countryCode, countryName) {
    await this.countryInput.pressSequentially(countryCode);
    await this.countryResults.waitFor({ state: 'visible' });
    await this.countryResults.locator('button', { hasText: countryName }).first().click();
  }

  async expectEmail(email) {
    await expect(this.loggedInEmail).toHaveText(email);
  }

  async placeOrder() {
    logger.info('Placing order');
    await this.placeOrderButton.click();
    await expect(this.confirmationText).toHaveText(locators.thankYouMessage);
    return this.orderIdLabel.textContent();
  }
}

module.exports = { CheckoutPage };
