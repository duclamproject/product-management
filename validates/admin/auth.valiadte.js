module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng không để trống email!`);
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", `Vui lòng không để trống mật khẩu!`);
    res.redirect("back");
    return;
  }
  next();
};
