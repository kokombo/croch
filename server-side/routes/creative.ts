import express = require("express");
const router = express.Router();
import creativeController = require("../controllers/creative");
import authorization = require("../middlewares/authorization");
import imageOptimization = require("../middlewares/imageOptimization");

const { authorizeUser, isCreative, isProductOwner } = authorization;
const { resizePhoto, uploadPhoto } = imageOptimization;

const {
  updateYearsOfExperience,
  updateFunFacts,
  updateIsAvailable,
  updatePersonalDescription,
  getOrders,
  setBrandName,
  setBrandLogo,
  getCreativeById,
  setupAccount,
  accountSetupDone,
} = creativeController;

router.get("/getCreativeById", getCreativeById);

router.get("/getOrders", authorizeUser, isCreative, getOrders);

router.patch(
  "/setupAccount",
  authorizeUser,
  isCreative,
  uploadPhoto.array("logo", 1),
  setupAccount
);

router.patch("/accountSetupDone", authorizeUser, isCreative, accountSetupDone);

router.patch(
  "/updateYearsOfExperience",
  authorizeUser,
  isCreative,
  updateYearsOfExperience
);

router.patch("/updateFunFacts", authorizeUser, isCreative, updateFunFacts);

router.patch(
  "/updateIsAvailable",
  authorizeUser,
  isCreative,
  updateIsAvailable
);

router.patch(
  "/updatePersonalDescription",
  authorizeUser,
  isCreative,
  updatePersonalDescription
);

router.patch("/setBrandName", authorizeUser, isCreative, setBrandName);

router.patch(
  "/setBrandLogo",
  authorizeUser,
  isCreative,
  uploadPhoto.array("logo", 1),
  setBrandLogo
);

export = router;
