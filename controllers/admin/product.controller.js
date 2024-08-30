// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
module.exports.index = async (req, res) => {
  // Bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Keyword
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");
    // Tìm kiếm chung chungf
    find.title = regex;
  }
  const products = await Product.find(find);
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
