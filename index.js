const express = require("express");
const methodOverride = require("method-override");
// .env
require("dotenv").config();
const app = express();
const port = process.env.PORT;
// Mehod Override
app.use(methodOverride("_method"));
// mongoose - database check
const database = require("./config/database");
database.connect();

// public folder
app.use(express.static("public"));
// PugJS
app.set("views", "./views");
app.set("view engine", "pug");
// Routes
const route = require("./routes/client/index.route");
route(app);
// Route Admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);
// App Local Variables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
