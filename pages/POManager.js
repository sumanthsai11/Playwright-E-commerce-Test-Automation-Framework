const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.orderHistoryPage = new OrderHistoryPage(page);
  }
}

module.exports = { POManager };
