// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  // Bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Keyword
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination
  // Công thức phân trang (Skip)= (CurrentPage - 1) * LimtIems;

  const countProducts = await Product.countDocuments(find);
  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );
  // End Pagination

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

module.exports.changeStatus = async (req, res) => {
  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhập trạng thái sản phẩm thành công!");
  res.redirect("back");
};

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { status: "active" } },
        { multi: true }
      );
      req.flash(
        "success",
        `Cập nhập trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { status: "inactive" } },
        { multi: true }
      );
      req.flash(
        "success",
        `Cập nhập trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};

module.exports.deleteItem = async (req, res) => {
  const idDel = req.params.id;
  await Product.updateOne(
    { _id: idDel },
    { deleted: true, deletedAt: new Date() }
  );
  res.redirect("back");
};

module.exports.create = (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

module.exports.createPost = async (req, res) => {
  console.log(req.file);
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = parseInt(countProducts + 1);
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

module.exports.edit = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const product = await Product.findOne(find);
  // console.log(product);

  res.render(`admin/pages/products/edit`, {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
  });
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = parseInt(countProducts + 1);
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }
  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Chỉnh sửa sản phẩm thành công!");
  } catch (error) {
    req.flash("error", "Chỉnh sửa sản phẩm thất bại!");
  }
  res.redirect(`back`);
};

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
  };
  const product = await Product.findOne(find);
  console.log(product);

  res.render("admin/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};
