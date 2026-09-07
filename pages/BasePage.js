const { logger } = require('../utils/logger');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    logger.debug(`Navigate to configured URL`);
    await this.page.goto(url);
  }

  locator(selector) {
    return this.page.locator(selector);
  }
}

module.exports = { BasePage };
