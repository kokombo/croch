import express = require("express");
const router = express.Router();
import userController = require("../controllers/user");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;

const {
  signUp,

  updatePassword,
  resetPassword,
  sendForgotPasswordToken,
  verifyEmail,
  sendEmailVerificationToken,
} = userController;

router.post("/signup", signUp);

router.post("/sendForgotPasswordToken", sendForgotPasswordToken);

router.post("/sendEmailVerificationToken", sendEmailVerificationToken);

router.post("/verifyEmail", verifyEmail);

router.patch("/updatePassword", authorizeUser, updatePassword);

router.patch("/resetPassword", resetPassword);

export = router;
