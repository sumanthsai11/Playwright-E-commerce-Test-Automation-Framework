const { BasePage } = require('./BasePage');
const locators = require('../locators/dashboardLocators');
const { logger } = require('../utils/logger');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.products = this.locator(locators.products);
    this.productTitles = this.locator(locators.productTitles);
    this.cartLink = this.locator(locators.cartLink);
    this.ordersButton = this.locator(locators.ordersButton);
  }

  async addProductToCart(productName) {
    logger.info(`Add product to cart: ${productName}`);
    await this.productTitles.first().waitFor();
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const title = await this.products.nth(i).locator('b').textContent();
      if (title === productName) {
        await this.products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
        return;
      }
    }
    throw new Error(`Product not found on dashboard: ${productName}`);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToOrders() {
    await this.ordersButton.click();
  }
}

module.exports = { DashboardPage };
