const { test, expect } = require('../../fixtures/baseFixtures');
const { apiBaseUrl } = require('../../config/env.config');
const dashboardLocators = require('../../locators/dashboardLocators');
const orderHistoryLocators = require('../../locators/orderHistoryLocators');

test('@intercept mock empty order history response', async ({ tokenInjectedPage }) => {
  await tokenInjectedPage.route(`${apiBaseUrl}/order/get-orders-for-customer/*`, async (route) => {
    const response = await tokenInjectedPage.request.fetch(route.request());
    await route.fulfill({
      response,
      body: JSON.stringify({ data: [], message: 'No Orders' }),
    });
  });

  await tokenInjectedPage.locator(dashboardLocators.ordersButton).click();
  await tokenInjectedPage.waitForResponse(`${apiBaseUrl}/order/get-orders-for-customer/*`);
  await expect(tokenInjectedPage.locator(orderHistoryLocators.emptyOrdersMessage)).toContainText('No Orders');
});
