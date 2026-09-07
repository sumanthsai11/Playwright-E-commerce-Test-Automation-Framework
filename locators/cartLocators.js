module.exports = {
  cartItems: 'div li',
  checkoutButton: 'text=Checkout',
  productHeading: (productName) => `h3:has-text("${productName}")`,
};
