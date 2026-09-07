const { test, expect } = require('../../fixtures/baseFixtures');
const { apiBaseUrl } = require('../../config/env.config');
const { unauthorizedOrderId } = require('../../utils/constants');
const dashboardLocators = require('../../locators/dashboardLocators');
const orderHistoryLocators = require('../../locators/orderHistoryLocators');

test('@intercept block access to another user order details', async ({ loggedInPage }) => {
  await loggedInPage.locator(dashboardLocators.ordersButton).click();
  await loggedInPage.route(`${apiBaseUrl}/order/get-orders-details?id=*`, (route) =>
    route.continue({
      url: `${apiBaseUrl}/order/get-orders-details?id=${unauthorizedOrderId}`,
    })
  );
  await loggedInPage.locator(orderHistoryLocators.viewButton).first().click();
  await expect(loggedInPage.locator(orderHistoryLocators.unauthorizedMessage).last()).toHaveText(
    'You are not authorize to view this order'
  );
});
