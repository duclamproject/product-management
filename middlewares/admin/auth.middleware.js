const systemConfig = require("../../config/system");
const Accounts = require("../../models/account.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Accounts.findOne({
      token: req.cookies.token,
    });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      next();
    }
  }
};
