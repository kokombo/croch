import express = require("express");
const router = express.Router();
import creativeController = require("../controllers/creative");
import authorization = require("../middlewares/authorization");

const { authorizeUser, isCreative, isProductOwner } = authorization;

const { createProduct, updateProduct, deleteProduct, getProducts } =
  creativeController;

router.post("/createProduct", authorizeUser, isCreative, createProduct);
router.get("/getProducts", authorizeUser, getProducts);
router.patch(
  "/updateProduct/:id",
  authorizeUser,
  isProductOwner,
  updateProduct
);
router.delete(
  "/deleteProduct/:id",
  authorizeUser,
  isProductOwner,
  deleteProduct
);

export = router;
