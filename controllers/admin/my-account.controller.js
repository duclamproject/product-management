const md5 = require("md5");
const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
// [GET] admin/my-account/
module.exports.index = async (req, res) => {
  const find = {
    _id: res.locals.user.id,
    deleted: false,
  };
  const record = await Account.findOne(find);
  const record_role = await Role.findOne({
    _id: record.role_id,
    deleted: false,
  });
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "Thông tin tài khoản",
    record: record,
    record_role: record_role,
  });
};

// [GET] admin/my-account/edit
module.exports.edit = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });
  const data = await Account.findOne({
    _id: res.locals.user.id,
    deleted: false,
  });
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Chỉnh sửa tài khoản",
    data: data,
    roles: roles,
  });
};

// [PATCH] admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  const emailExist = await Account.findOne({
    _id: { $ne: res.locals.user.id },
    email: req.body.email,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã được sử dụng`);
  } else {
    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật thông tin tài khoản thành công!");
  }
  res.redirect("back");
};
