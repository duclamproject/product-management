const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  // Filter Status
  const filterStatus = filterStatusHelper(req.query);

  if (req.query.status) {
    find.status = req.query.status;
  }
  // End Filter Status
  // Search
  const objectSearch = {
    keyword: "",
  };
  if (req.query.keyword) {
    objectSearch.keyword = req.query.keyword;
    objectSearch.regex = new RegExp(objectSearch.keyword, "i");
    find.title = objectSearch.regex;
  }
  // End Search

  const record = await ProductCategory.find(find).sort({ position: "desc" });
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    record: record,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Tạo mới danh mục",
  });
};
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  // console.log(ProductCategory);
  if (req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments();
    req.body.position = parseInt(countProducts + 1);
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
