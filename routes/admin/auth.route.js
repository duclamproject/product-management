const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller");
const validates = require("../../validates/admin/auth.valiadte");
router.get("/login", controller.login);
router.post("/login", validates.loginPost, controller.loginPost);
module.exports = router;
