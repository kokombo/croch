import express = require("express");
const router = express.Router();
import product = require("../controllers/product");

const { getAllProducts, getProduct } = product;

router.get("/getAllProducts", getAllProducts);

router.get("/getProduct", getProduct);

export = router;
