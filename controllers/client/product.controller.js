// [GET] /products

const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });
  const newProduct = products.map((item) => {
    item.priceNew = (
      item.price *
      ((100 - item.discountPercentage) / 100)
    ).toFixed(2);
    return item;
  });
  console.log(products);

  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: newProduct,
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
