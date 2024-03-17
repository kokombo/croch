import express = require("express");
const router = express.Router();
import authorization = require("../middlewares/authorization");
import orderController = require("../controllers/order");

const { authorizeUser } = authorization;
const {
  getOrder,
  placeAnOrder,
  cancelAnOrder,
  confirmAnOrder,
  getCustomerOrders,
} = orderController;

router.get("/getOrder", authorizeUser, getOrder);

router.get("/getCustomerOrders", authorizeUser, getCustomerOrders);

router.post("/placeAnOrder", authorizeUser, placeAnOrder);

router.patch("/cancelAnOrder", authorizeUser, cancelAnOrder);

router.patch("/confirmAnOrder", authorizeUser, confirmAnOrder);

export = router;
