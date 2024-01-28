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
} = creativeController;

router.post(
  "/createProduct",
  authorizeUser,
  isCreative,
  uploadPhoto.array("files", 10),
  createProduct
);

router.get("/getProducts", authorizeUser, getProducts);

router.put(
  "/updateProduct/:id",
  authorizeUser,
  isProductOwner,
  uploadPhoto.array("files", 10),
  updateProduct
);

router.put("/updateYearsOfExperience", updateYearsOfExperience);

router.put("/updateFunFacts", updateFunFacts);

router.put("/updateIsAvailable", updateIsAvailable);

router.put("/updatePersonalDescription", updatePersonalDescription);

router.delete(
  "/deleteProduct/:id",
  authorizeUser,
  isProductOwner,
  deleteProduct
);

export = router;
