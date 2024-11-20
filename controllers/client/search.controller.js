const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/search");
const productHelper = require("../../helpers/products");
// [GET] /search/
module.exports.search = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  const productsSearch = await Product.find(find);
  const productsSearchNew = productHelper.priceNewProducts(productsSearch);
  res.render("client/pages/search/index.pug", {
    pageTitle: "Tìm kiếm sản phẩm",
    productsSearch: productsSearchNew,
    keyword: objectSearch.keyword,
  });
};
