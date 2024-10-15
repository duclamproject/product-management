const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./roles.route");
const accountRouters = require("./accounts.route");
const authRouters = require("./auth.route");
const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes
  );
  app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);
  app.use(
    PATH_ADMIN + "/products-category",
    authMiddleware.requireAuth,
    productCategoryRoutes
  );
  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRouters);
  app.use(PATH_ADMIN + "/auth", authRouters);
};
