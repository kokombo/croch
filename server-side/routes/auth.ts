import express = require("express");
const router = express.Router();
import userController = require("../controllers/user");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;

const {
  signUp,
  signIn,
  handleRefreshToken,
  updatePassword,
  resetPassword,
  sendForgotPasswordToken,
  logOut,
  verifyEmailAddress,
  sendEmailVerificationToken,
} = userController;

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/sendForgotPasswordToken", sendForgotPasswordToken);
router.post("/sendEmailVerificationToken", sendEmailVerificationToken);
router.post("/verifyEmailAddress", authorizeUser, verifyEmailAddress);
router.get("/refreshToken", handleRefreshToken);
router.get("/logOut", logOut);
router.patch("/resetPassword", resetPassword);
router.patch("/updatePassword", authorizeUser, updatePassword);

export = router;
