const { BasePage } = require('./BasePage');
const { clientUrl } = require('../config/env.config');
const locators = require('../locators/loginLocators');
const { logger } = require('../utils/logger');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = this.locator(locators.emailInput);
    this.passwordInput = this.locator(locators.passwordInput);
    this.signInButton = this.locator(locators.signInButton);
  }

  async goto() {
    await super.goto(clientUrl);
  }

  async login(email, password) {
    logger.info('Submitting ecommerce login form');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.locator('.card-body b').first().waitFor();
  }
}

module.exports = { LoginPage };
