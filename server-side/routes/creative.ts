import express = require("express");
const router = express.Router();
import creativeController = require("../controllers/creative");
import authorization = require("../middlewares/authorization");
import imageOptimization = require("../middlewares/imageOptimization");

const { authorizeUser, isCreative, isProductOwner } = authorization;

const { resizePhoto, uploadPhoto } = imageOptimization;

const { createProduct, updateProduct, deleteProduct, getProducts } =
  creativeController;

router.post("/createProduct", authorizeUser, isCreative, createProduct);
router.get("/getProducts", authorizeUser, getProducts);
router.put(
  "/updateProduct/:id",
  authorizeUser,
  isProductOwner,
  uploadPhoto.array("files", 10),
  updateProduct
);
router.delete(
  "/deleteProduct/:id",
  authorizeUser,
  isProductOwner,
  deleteProduct
);

export = router;
