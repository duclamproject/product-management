module.exports.userRegister = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Tên không được để trống!");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống!");
    res.redirect("back");
    return;
  }
  next();
};

module.exports.loginPost = async (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống!");
    res.redirect("back");
    return;
  }
  next();
};
