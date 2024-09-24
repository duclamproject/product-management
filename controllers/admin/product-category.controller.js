const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  // Filter Status
  const filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];
  if (req.query.status) {
    const index = filterStatus.findIndex((item) => {
      return item.status == req.query.status;
    });
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => {
      return item.status == "";
    });
    filterStatus[index].class = "active";
  }

  if (req.query.status) {
    find.status = req.query.status;
  }
  // End Filter Status

  const record = await ProductCategory.find(find).sort({ position: "desc" });
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    record: record,
    filterStatus: filterStatus,
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
