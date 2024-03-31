import express = require("express");
const router = express.Router();
import tagController = require("../controllers/tag");
import authorization = require("../middlewares/authorization");
import imageOptimization = require("../middlewares/imageOptimization");

const { uploadPhoto } = imageOptimization;
const { authorizeUser, isAdmin } = authorization;
const { addNewTag, getAllTags, updateTag } = tagController;

router.post(
  "/addNewTag",
  authorizeUser,
  isAdmin,
  uploadPhoto.array("tag-icon", 1),
  addNewTag
);

router.get("/getAllTags", getAllTags);

router.put(
  "/updateTag",
  authorizeUser,
  isAdmin,
  uploadPhoto.array("tag-icon", 1),
  updateTag
);

export = router;
