const { apiBaseUrl, clientEmail, clientPassword, productId } = require('../config/env.config');
const { logger } = require('./logger');
const { defaultCountry } = require('./constants');

class ApiUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async getToken(email = clientEmail, password = clientPassword) {
    logger.info('Requesting auth token');
    const response = await this.apiContext.post(`${apiBaseUrl}/auth/login`, {
      data: { userEmail: email, userPassword: password },
    });
    if (!response.ok()) {
      logger.error(`Login API failed: ${response.status()}`);
      throw new Error(`Login API failed: ${response.status()} ${await response.text()}`);
    }
    const body = await response.json();
    return body.token;
  }

  async createOrder({ country = defaultCountry, productOrderedId = productId } = {}) {
    const token = await this.getToken();
    logger.info(`Creating order for product ${productOrderedId}`);
    const response = await this.apiContext.post(`${apiBaseUrl}/order/create-order`, {
      data: { orders: [{ country, productOrderedId }] },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok()) {
      logger.error(`Create order API failed: ${response.status()}`);
      throw new Error(`Create order API failed: ${response.status()} ${await response.text()}`);
    }
    const body = await response.json();
    logger.info(`Order created: ${body.orders[0]}`);
    return { token, orderId: body.orders[0] };
  }
}

module.exports = { ApiUtils };
