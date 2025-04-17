const express = require("express");
const route = express.Router();
const authMiddleware = require("../../middlewares/client/auth.middleware");
const chatMiddleware = require("../../middlewares/client/chat.middleware");
const controller = require("../../controllers/client/chat.controller");
route.get(
  "/:roomChatId",
  chatMiddleware.isAccess,
  authMiddleware.requireAuth,
  controller.index
);
module.exports = route;
