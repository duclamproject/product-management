const express = require("express");
const router = express.Router();
const middleware = require("../../middlewares/client/auth.middleware");

const controller = require("../../controllers/client/users.controller");

router.get("/not-friend", middleware.requireAuth, controller.notFriend);
router.get("/request", middleware.requireAuth, controller.request);
router.get("/accept", middleware.requireAuth, controller.accept);
router.get("/friends", middleware.requireAuth, controller.friends);
module.exports = router;
