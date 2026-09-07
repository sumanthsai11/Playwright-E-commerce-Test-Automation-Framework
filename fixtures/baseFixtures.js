const base = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { ApiUtils } = require('../utils/apiUtils');
const { clientUrl, clientEmail, clientPassword } = require('../config/env.config');
const { logger } = require('../utils/logger');

exports.test = base.test.extend({
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },

  apiUtils: async ({ request }, use) => {
    await use(new ApiUtils(request));
  },

  loggedInPage: async ({ browser }, use) => {
    logger.info('Creating logged-in browser context');
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    await poManager.loginPage.goto();
    await poManager.loginPage.login(clientEmail, clientPassword);
    await use(page);
    await context.close();
  },

  apiCreatedOrder: async ({ request }, use) => {
    const apiUtils = new ApiUtils(request);
    const order = await apiUtils.createOrder();
    await use(order);
  },

  tokenInjectedPage: async ({ browser, apiCreatedOrder }, use) => {
    logger.info('Opening page with injected auth token');
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript((token) => {
      window.localStorage.setItem('token', token);
    }, apiCreatedOrder.token);
    await page.goto(clientUrl);
    await use(page);
    await context.close();
  },
});

exports.expect = base.expect;
