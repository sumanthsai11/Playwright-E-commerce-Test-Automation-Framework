const { BasePage } = require('./BasePage');
const locators = require('../locators/orderHistoryLocators');
const { logger } = require('../utils/logger');

class OrderHistoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.ordersTable = this.locator(locators.ordersTable);
    this.rows = this.locator(locators.rows);
    this.orderIdDetails = this.locator(locators.orderIdDetails);
  }

  async openOrder(orderId) {
    logger.info(`Open order ${orderId}`);
    await this.ordersTable.waitFor();
    const count = await this.rows.count();
    for (let i = 0; i < count; i++) {
      const rowOrderId = await this.rows.nth(i).locator('th').textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rows.nth(i).locator('button').first().click();
        return;
      }
    }
    throw new Error(`Order not found in history: ${orderId}`);
  }

  async getDisplayedOrderId() {
    return this.orderIdDetails.textContent();
  }
}

module.exports = { OrderHistoryPage };
