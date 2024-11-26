const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const moment = require("moment");
// .env
require("dotenv").config();
const app = express();
const port = process.env.PORT;
// Mehod Override
app.use(methodOverride("_method"));
// Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// mongoose - database check
const database = require("./config/database");
database.connect();

// public folder
app.use(express.static(`${__dirname}/public`));
// PugJS
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
// Express Flash
app.use(cookieParser("JKJKJKFHJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// Routes
const routeClient = require("./routes/client/index.route");
routeClient(app);
// Route Admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);
// App Local Variables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
// 404 Not Found
app.get("*", (req, res) => {
  res.render("client/pages/error/404.pug", {
    pageTitle: "404 Not Found",
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
