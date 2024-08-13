const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  app.use(systemConfig.prefixAdmin + "/dashboard", dashboardRoutes);
};
