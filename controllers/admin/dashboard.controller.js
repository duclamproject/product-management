// [GET] /admin/dashboard
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: await ProductCategory.countDocuments({
        deleted: false,
      }),
      active: await ProductCategory.countDocuments({
        status: "active",
        deleted: false,
      }),
      inactive: await ProductCategory.countDocuments({
        status: "inactive",
        deleted: false,
      }),
    },
    product: {
      total: await Product.countDocuments({
        deleted: false,
      }),
      active: await Product.countDocuments({
        status: "active",
        deleted: false,
      }),
      inactive: await Product.countDocuments({
        status: "inactive",
        deleted: false,
      }),
    },
    account: {
      total: await Account.countDocuments({
        deleted: false,
      }),
      active: await Account.countDocuments({
        status: "active",
        deleted: false,
      }),
      inactive: await Account.countDocuments({
        status: "inactive",
        deleted: false,
      }),
    },
    user: {
      total: await User.countDocuments({
        deleted: false,
      }),
      active: await User.countDocuments({
        status: "active",
        deleted: false,
      }),
      inactive: await User.countDocuments({
        status: "inactive",
        deleted: false,
      }),
    },
  };
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic,
  });
};
