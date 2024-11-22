const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // user_id: String,
    cart_id: String,
    userInfor: {
      fullname: String,
      phone: String,
      address: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
