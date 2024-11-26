const express = require("express");
const controller = require("../../controllers/admin/setting.controller");
const route = express.Router();
// Upload img
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// End Upload img
route.get("/general", controller.general);
route.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
);
module.exports = route;
