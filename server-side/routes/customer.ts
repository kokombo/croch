import express = require("express");
const router = express.Router();
import customerController = require("../controllers/customer");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;
const {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCartItemCount,
  clearCartItems,
} = customerController;

router.get("/getCartItems", authorizeUser, getCartItems);
router.put("/addToCart", authorizeUser, addToCart);
router.put("/removeFromCart", authorizeUser, removeFromCart);
router.put("/updateCartItemCount", authorizeUser, updateCartItemCount);
router.put("/clearCartItems", authorizeUser, clearCartItems);

export = router;
