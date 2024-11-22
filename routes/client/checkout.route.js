const express = require("express");
const controller = require("../../controllers/client/checkout.controller");
const route = express.Router();
route.get("/", controller.index);
route.post("/order", controller.order);
module.exports = route;
