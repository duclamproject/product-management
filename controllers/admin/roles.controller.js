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
  const record = await new Role(req.body);
  await record.save();
  req.flash("success", "Tạo mới nhóm quyền thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
  };
  const data = await Role.findOne(find);
  res.render("admin/pages/roles/edit", {
    pageTitle: "Sửa nhóm quyền",
    data: data,
  });
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({ _id: id }, req.body);
  req.flash("success", "Cập nhập nhóm quyền thành công");
  res.redirect("back");
};

// premissions
module.exports.premissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const record = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    record: record,
  });
};
// Permission Patch
module.exports.premissionsPatch = async (req, res) => {
  try {
    const permission = JSON.parse(req.body.permission);
    for (const element of permission) {
      await Role.updateOne(
        { _id: element.id },
        { permissions: element.permission }
      );
    }
    req.flash("success", "Cập nhập phân quyền thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhập phân quyền thất bại!");
    res.redirect("back");
  }
};
