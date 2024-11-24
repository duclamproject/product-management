const express = require("express");
const route = express.Router();
const validate = require("../../validates/client/user.validate");
const controller = require("../../controllers/client/user.controller");
route.get("/register", controller.register);
route.post("/register", validate.userRegister, controller.registerPost);
module.exports = route;
