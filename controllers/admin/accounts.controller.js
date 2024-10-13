const md5 = require("md5");
const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  const roles = await Role.find(find);
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã được sử dụng!`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const newRecord = new Account(req.body);
    await newRecord.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET] EDITH
module.exports.edit = async (req, res) => {
  const find = {
    _id: req.params.id,
    deleted: false,
  };
  try {
    const data = await Account.findOne(find);
    const roles = await Role.find({
      deleted: false,
    });
    res.render("admin/pages/accounts/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
// [PATCH] EDITH
module.exports.editPatch = async (req, res) => {
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  const emailExist = await Account.findOne({
    _id: { $ne: req.params.id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã được sử dụng!`);
  } else {
    await Account.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    req.flash("success", "Cập nhập tài khoản thành công!");
  }
  res.redirect(`back`);
};
