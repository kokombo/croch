import express = require("express");
const router = express.Router();
import creativeController = require("../controllers/creative");
import authorization = require("../middlewares/authorization");
import imageOptimization = require("../middlewares/imageOptimization");

const { authorizeUser, isCreative, isProductOwner } = authorization;

const { resizePhoto, uploadPhoto } = imageOptimization;

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateYearsOfExperience,
  updateFunFacts,
  updateIsAvailable,
  updatePersonalDescription,
  getOrders,
} = creativeController;

router.post(
  "/createProduct",
  authorizeUser,
  isCreative,
  uploadPhoto.array("files", 10),
  createProduct
);

router.get("/getProducts", authorizeUser, getProducts);

router.get("/getOrders", authorizeUser, isCreative, getOrders);

router.put(
  "/updateProduct/:id",
  authorizeUser,
  isProductOwner,
  uploadPhoto.array("files", 10),
  updateProduct
);

router.put(
  "/updateYearsOfExperience",
  authorizeUser,
  isCreative,
  updateYearsOfExperience
);

router.put("/updateFunFacts", authorizeUser, isCreative, updateFunFacts);

router.put("/updateIsAvailable", authorizeUser, isCreative, updateIsAvailable);

router.put(
  "/updatePersonalDescription",
  authorizeUser,
  isCreative,
  updatePersonalDescription
);

router.delete(
  "/deleteProduct/:id",
  authorizeUser,
  isProductOwner,
  deleteProduct
);

export = router;
