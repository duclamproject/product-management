// [GET] /
const Products = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    featured: "1",
    status: "active",
  };
  const productsFeatured = await Products.find(find)
    .sort({ price: "desc" })
    .limit(8);
  const newProducts = productsHelper.priceNewProducts(productsFeatured);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts,
  });
};
