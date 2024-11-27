const express = require("express");
const route = express.Router();
const middleware = require("../../middlewares/client/auth.middleware");
const controller = require("../../controllers/client/chat.controller");
route.get("/", middleware.requireAuth, controller.index);
module.exports = route;
