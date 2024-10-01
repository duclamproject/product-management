const Role = require("../../models/roles.model.js");
const systemConfig = require("../../config/system.js");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo mới nhóm quyền",
  });
};
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = await new Role(req.body);
  await record.save();
  req.flash("success", "Tạo mới nhóm quyền thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
