const express = require("express");
const validates = require("../../validates/admin/products.validate");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer = require("multer");
const storageHelpers = require("../../helpers/storage");
const upload = multer({ storage: storageHelpers() });
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi/", controller.changeMulti);
router.delete("/delete-item/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validates.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validates.createPost,
  controller.editPatch
);
router.get("/detail/:id", controller.detail);
module.exports = router;
