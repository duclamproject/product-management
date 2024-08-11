const express = require("express");
// .env
require("dotenv").config();
const app = express();
const port = process.env.PORT;
// mongoose - database check
const database = require("./config/database");
database.connect();

// public folder
app.use(express.static("public"));
// pug
app.set("views", "./views");
app.set("view engine", "pug");
// Routes
const route = require("./routes/client/index.route");
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
