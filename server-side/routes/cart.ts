import express = require("express");
const router = express.Router();
import cartController = require("../controllers/cart");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;
const {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCartItemCount,
  deleteCart,
  getCarts,
} = cartController;

router.get("/getCartItems", authorizeUser, getCartItems);

router.get("/getCarts", authorizeUser, getCarts);

router.put("/addToCart", authorizeUser, addToCart);

router.put("/removeFromCart", authorizeUser, removeFromCart);

router.put("/updateCartItemCount", authorizeUser, updateCartItemCount);

router.delete("/deleteCart", authorizeUser, deleteCart);

export = router;
