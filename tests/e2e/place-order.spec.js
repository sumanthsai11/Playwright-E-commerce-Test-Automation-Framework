const { test, expect } = require('../../fixtures/baseFixtures');
const { clientEmail, clientPassword } = require('../../config/env.config');
const { readJson } = require('../../utils/dataReader');
const { logger } = require('../../utils/logger');

const dataset = readJson('test-data/place-order.json');

for (const data of dataset) {
  test(`@e2e place order for ${data.productName}`, async ({ poManager }) => {
    if (!clientEmail || !clientPassword) {
      throw new Error('Set CLIENT_EMAIL and CLIENT_PASSWORD in a .env file before running ecommerce tests.');
    }

    logger.info(`E2E checkout for ${data.productName}`);
    await poManager.loginPage.goto();
    await poManager.loginPage.login(clientEmail, clientPassword);
    await poManager.dashboardPage.addProductToCart(data.productName);
    await poManager.dashboardPage.goToCart();
    await poManager.cartPage.expectProductVisible(data.productName);
    await poManager.cartPage.checkout();
    await poManager.checkoutPage.selectCountry(data.countryCode, data.countryName);
    await poManager.checkoutPage.expectEmail(clientEmail);
    const orderId = await poManager.checkoutPage.placeOrder();
    await poManager.dashboardPage.goToOrders();
    await poManager.orderHistoryPage.openOrder(orderId);
    expect(orderId.includes(await poManager.orderHistoryPage.getDisplayedOrderId())).toBeTruthy();
  });
}
