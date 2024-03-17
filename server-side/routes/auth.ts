import express = require("express");
const router = express.Router();
import authController = require("../controllers/auth");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;

const { signIn, handleRefreshToken, logOut } = authController;

router.post("/signin", signIn);

router.post("/refreshToken", handleRefreshToken);

router.get("/logOut", authorizeUser, logOut);

export = router;
