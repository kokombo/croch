import express = require("express");
const router = express.Router();
import userController = require("../controllers/user");

const { signIn, signUp } = userController;

router.post("/signin", signIn);
router.post("/signup", signUp);

export = router;
