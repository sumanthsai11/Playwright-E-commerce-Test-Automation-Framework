const { test, expect } = require('../../fixtures/baseFixtures');
const { POManager } = require('../../pages/POManager');

test('@e2e @api verify API-created order in order history', async ({ tokenInjectedPage, apiCreatedOrder }) => {
  const poManager = new POManager(tokenInjectedPage);
  await poManager.dashboardPage.goToOrders();
  await poManager.orderHistoryPage.openOrder(apiCreatedOrder.orderId);
  const displayedId = await poManager.orderHistoryPage.getDisplayedOrderId();
  expect(apiCreatedOrder.orderId.includes(displayedId)).toBeTruthy();
});
