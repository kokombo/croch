import express = require("express");
const router = express.Router();
import customerController = require("../controllers/customer");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;
const { addAndRemoveWishlist, getWishlists, getCreativeAllProducts } =
  customerController;

router.get("/getWishlists", authorizeUser, getWishlists);

router.get("/getCreativeAllProducts", getCreativeAllProducts);

router.put("/addAndRemoveWishlist", authorizeUser, addAndRemoveWishlist);

export = router;
