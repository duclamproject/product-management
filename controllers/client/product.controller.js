const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");
// [GET] /products
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
    slug: req.params.slugProduct,
    status: "active",
  };
  const product = await Product.findOne(find);
  if (product.product_category_id) {
    const category = await ProductCategory.findOne({
      _id: product.product_category_id,
      status: "active",
      deleted: false,
    });
    product.category = category;
  }
  product.priceNew = productsHelper.priceNewProduct(product);
  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};

module.exports.category = async (req, res) => {
  const categoryRecord = await ProductCategory.findOne({
    slug: req.params.slugCategory,
  });

  const listSubCategory = await productsCategoryHelper.getSubCategory(
    categoryRecord.id
  );
  const listSubCategoryId = listSubCategory.map((item) => {
    return item.id;
  });
  // console.log(listSubCategoryId);

  let products = await Product.find({
    product_category_id: {
      $in: [categoryRecord.id, ...listSubCategoryId],
    },
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
    pageTitle: categoryRecord.title,
    products: newProducts,
  });
};
