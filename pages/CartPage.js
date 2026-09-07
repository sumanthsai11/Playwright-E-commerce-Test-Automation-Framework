const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const locators = require('../locators/cartLocators');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = this.locator(locators.cartItems).first();
    this.checkoutButton = this.locator(locators.checkoutButton);
  }

  async expectProductVisible(productName) {
    await this.cartItems.waitFor();
    await expect(this.locator(locators.productHeading(productName))).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
