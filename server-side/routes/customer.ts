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
  deleteCart,
  placeAnOrder,
  cancelAnOrder,
  confirmAnOrder,
  getOrders,
  getCarts,
} = customerController;

router.get("/getCartItems", authorizeUser, getCartItems);
router.get("/getOrders", authorizeUser, getOrders);
router.get("/getCarts", authorizeUser, getCarts);
router.post("/placeAnOrder", authorizeUser, placeAnOrder);
router.put("/addToCart", authorizeUser, addToCart);
router.put("/removeFromCart", authorizeUser, removeFromCart);
router.put("/updateCartItemCount", authorizeUser, updateCartItemCount);
router.patch("/cancelAnOrder", authorizeUser, cancelAnOrder);
router.patch("/confirmAnOrder", authorizeUser, confirmAnOrder);
router.delete("/deleteCart", authorizeUser, deleteCart);

export = router;
