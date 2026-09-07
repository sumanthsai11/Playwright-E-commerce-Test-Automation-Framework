const { test, expect } = require('../../fixtures/baseFixtures');
const { defaultCountry } = require('../../utils/constants');

test('@api create order via ecommerce API', async ({ apiUtils }) => {
  const order = await apiUtils.createOrder({ country: defaultCountry });
  expect(order.token).toBeTruthy();
  expect(order.orderId).toBeTruthy();
});
