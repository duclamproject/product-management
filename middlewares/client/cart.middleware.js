const Cart = require("../../models/cart.model");
module.exports.cart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    // Khi chưa đăng nhập
    const cart = new Cart();
    await cart.save();
    console.log(cart);
    const expiresTime = 31536000;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresTime),
    });
  } else {
    // Khi đã đăng nhập
  }
  next();
};
