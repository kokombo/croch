import express = require("express");
const router = express.Router();
import product = require("../controllers/product");
import authorization = require("../middlewares/authorization");
import imageOptimization = require("../middlewares/imageOptimization");

const { authorizeUser, isCreative, isProductOwner } = authorization;
const { resizePhoto, uploadPhoto } = imageOptimization;

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCreativeProducts,
} = product;

router.get("/getAllProducts", getAllProducts);

router.get("/getProduct", getProduct);

router.post(
  "/createProduct",
  authorizeUser,
  isCreative,
  uploadPhoto.array("product-photos", 10),
  createProduct
);

router.get("/getCreativeProducts", authorizeUser, getCreativeProducts);

router.put(
  "/updateProduct",
  authorizeUser,
  isProductOwner,
  uploadPhoto.array("product-photos", 10),
  updateProduct
);

router.delete("/deleteProduct", authorizeUser, isProductOwner, deleteProduct);

export = router;
