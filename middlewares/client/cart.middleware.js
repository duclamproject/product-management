const Cart = require("../../models/cart.model");
module.exports.cart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    // Khi chưa đăng nhập
    const cart = new Cart();
    await cart.save();
    console.log(cart);
    const expiresTime = 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresTime),
      httpOnly: true,
    });
  } else {
    // Khi đã đăng nhập
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    cart.totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    res.locals.miniCart = cart;
  }
  next();
};
