const systemConfig = require("../../config/system");
const Accounts = require("../../models/account.model");
const Role = require("../../models/roles.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Accounts.findOne({
      token: req.cookies.token,
      deleted: false,
    }).select("-password");
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      const role = await Role.findOne({
        _id: user.role_id,
        deleted: false,
      }).select("title permissions");

      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
