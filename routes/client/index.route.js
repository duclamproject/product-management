const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const middleware = require("../../middlewares/client/category.middleware");
module.exports = (app) => {
  app.use(middleware.category);
  app.use("/", homeRoutes);
  app.use("/products/", productRoutes);
  app.use("/products/products/", productRoutes);
  app.use("/search", searchRoutes);
};
