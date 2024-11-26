const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
const md5 = require("md5");

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register.pug", {
    pageTitle: "Đăng ký tài khoản",
  });
};

module.exports.registerPost = async (req, res) => {
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (exitsEmail) {
    req.flash("error", `Đã tồn tại email ${req.body.email}`);
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  req.flash("success", "Đăng ký thành công!");
  res.redirect("/");
};

module.exports.login = async (req, res) => {
  res.render("client/pages/user/login.pug", {
    pageTitle: "Đăng nhập",
  });
};

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", `Không tồn tại email ${req.body.email}`);
    res.redirect("back");
    return;
  }
  if (md5(password) != user.password) {
    req.flash("error", `Sai mật khẩu`);
    res.redirect("back");
    return;
  }
  if (user.status == "inactive") {
    req.flash("error", `Tài khoản bị khóa`);
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  req.flash("success", "Đăng nhập thành công!");
  res.redirect("/");
};

module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  req.flash("success", "Đăng xuất thành công!");
  res.redirect("/");
};

module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Quên mật khẩu",
  });
};

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const exitsEmail = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!exitsEmail) {
    req.flash("error", `Không tồn tại email ${email}`);
    res.redirect("back");
    return;
  }
  // Việc 1: Tạo OTP và lưu vào collection forgot-password
  const otp = generateHelper.generateRandomNumber(8);
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  // Việc 2: Gửi mã OTP qua email của user
  const subject = "Mã OTP để xác minh lấy lại mật khẩu";
  const html = `Mã OTP xác minh lấy lại mật khẩu của bạn là: <b>${otp}</b>.<br> Thời hạn sử dụng của mã là 3 phút và lưu ý không được để lộ mã OTP`;
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};

module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  if (!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};

// [GET] :/user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password.pug", {
    pageTitle: "Reset password",
  });
};

module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );
  req.flash("success", "Đổi mật khẩu thành công!");
  res.redirect("/");
};

module.exports.infor = async (req, res) => {
  res.render("client/pages/user/infor.pug", {
    pageTitle: "Thông tin tài khoản",
  });
};
