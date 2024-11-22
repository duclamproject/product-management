const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/products");
// [GET] :/checkout
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({
    _id: req.cookies.cartId,
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfor = await Product.findOne({
        _id: productId,
      });
      productInfor.priceNew = productHelper.priceNewProduct(productInfor);
      item.productInfor = productInfor;
      item.totalPrice = item.productInfor.priceNew * item.quantity;
    }
  }
  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  res.render("client/pages/checkout/index.pug", {
    pageTitle: "Đặt hàng",
    cartDetail: cart,
  });
};
