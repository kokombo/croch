import express = require("express");
const router = express.Router();
import authorization = require("../middlewares/authorization");
import reviewController = require("../controllers/review");

const { authorizeUser, isCreative } = authorization;
const { giveReview, getCreativeReviews, getCustomerPostedReviews } =
  reviewController;

router.post("/giveReview", authorizeUser, giveReview);
router.get(
  "/getCreativeReviews",
  authorizeUser,
  isCreative,
  getCreativeReviews
);
router.get(
  "/getCustomerPostedReviews",
  authorizeUser,
  getCustomerPostedReviews
);

export = router;
