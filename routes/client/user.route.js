const express = require("express");
const route = express.Router();
const validate = require("../../validates/client/user.validate");
const middleware = require("../../middlewares/client/auth.middleware");
const controller = require("../../controllers/client/user.controller");
route.get("/register", controller.register);
route.post("/register", validate.userRegister, controller.registerPost);
route.get("/login", controller.login);
route.post("/login", validate.loginPost, controller.loginPost);
route.get("/logout", controller.logout);
route.get("/password/forgot", controller.forgotPassword);
route.post(
  "/password/forgot",
  validate.forgotPasswordPost,
  controller.forgotPasswordPost
);
route.get("/password/otp", controller.otpPassword);
route.post("/password/otp", controller.otpPasswordPost);
route.get("/password/reset", controller.resetPassword);
route.post(
  "/password/reset",
  validate.resetPassword,
  controller.resetPasswordPost
);
route.get("/infor", middleware.requireAuth, controller.infor);
module.exports = route;
