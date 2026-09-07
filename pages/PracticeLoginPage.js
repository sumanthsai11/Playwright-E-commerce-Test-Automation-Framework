const { BasePage } = require('./BasePage');
const { practiceLoginUrl } = require('../config/env.config');
const locators = require('../locators/practiceLoginLocators');

class PracticeLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = this.locator(locators.usernameInput);
    this.passwordInput = this.locator(locators.passwordInput);
    this.userTypeRadio = this.locator(locators.userTypeRadio);
    this.okayButton = this.locator(locators.okayButton);
    this.roleDropdown = this.locator(locators.roleDropdown);
    this.termsCheckbox = this.locator(locators.termsCheckbox);
    this.signInButton = this.locator(locators.signInButton);
    this.errorMessage = this.locator(locators.errorMessage);
    this.documentLink = this.locator(locators.documentLink);
    this.cardTitles = this.locator(locators.cardTitles);
  }

  async goto() {
    await super.goto(practiceLoginUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { PracticeLoginPage };
