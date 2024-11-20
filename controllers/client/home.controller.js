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
  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);

  // Hiển thị ra sản phẩm mới nhất
  const productsNew = await Products.find({
    deleted: false,
    status: "active",
    // featured: { $ne: "1" },
  })
    .limit(8)
    .sort({ position: "desc" });
  const newProductsNew = productsHelper.priceNewProducts(productsNew);
  // End: Hiển thị ra sản phẩm mới nhất
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew,
  });
};
