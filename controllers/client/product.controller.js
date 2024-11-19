// [GET] /products
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });
  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: newProducts,
  });
};

module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    slug: req.params.slug,
    status: "active",
  };
  const product = await Product.findOne(find);
  console.log(product);

  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};
