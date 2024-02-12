import express = require("express");
const router = express.Router();
import authorization = require("../middlewares/authorization");
import orderController = require("../controllers/order");

const { authorizeUser } = authorization;
const { getOrder } = orderController;

router.get("/getOrder", authorizeUser, getOrder);

export = router;
