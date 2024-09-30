const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const createTreeHelper = require("../../helpers/createTree");
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

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort
  const record = await ProductCategory.find(find).sort(sort);
  const newRecords = createTreeHelper.tree(record);
  console.log(newRecords);

  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    record: newRecords,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  // Code mẫu
  // function createTree(arr, parentId = "") {
  //   const tree = [];
  //   arr.forEach((item) => {
  //     if (item.parent_id === parentId) {
  //       const newItem = item;
  //       const children = createTree(arr, item.id);
  //       if (children.length > 0) {
  //         newItem.children = children;
  //       }
  //       tree.push(newItem);
  //     }
  //   });
  //   return tree;
  // }

  // Tự ngẫm
  // function createTree(arr, parentID = "") {
  //   const tree = [];
  //   arr.forEach((item) => {
  //     if (item.parent_id === parentID) {
  //       const newBranch = item;
  //       const children = createTree(arr, item.id);
  //       if (children.length > 0) {
  //         newBranch.children = children;
  //       }
  //       tree.push(newBranch);
  //     }
  //   });
  //   return tree;
  // }
  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Tạo mới danh mục",
    records: newRecords,
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

// EDIT GET
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const data = await ProductCategory.findOne({
      deleted: false,
      _id: req.params.id,
    });

    const record = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(record);

    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: data.title,
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`/admin/products-category`);
  }
};
// EDIT PATCH
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  try {
    await ProductCategory.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhập danh mục sản phẩm thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhập danh mục sản phẩm thất bại!");
    res.redirect("back");
  }
};
