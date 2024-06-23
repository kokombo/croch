import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import Product = require("../models/product");
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import validateId = require("../utilities/validateId");
import sendEmail = require("../utilities/sendEmail");
import crypto = require("crypto");
import {
  signupFormValidationSchema,
  updatePasswordValidationSchema,
} from "../validators";
import { ValidationError } from "yup";

const signUp = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  try {
    await signupFormValidationSchema.validate(req.body);

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User with this email already exists. Please sign in.",
      });
    }

    const user = await User.create({ ...req.body, email: email.toLowerCase() });

    if (role === "customer") {
      await Customer.create({ _id: user._id });
    } else if (role === "creative") {
      await Creative.create({ _id: user._id });
    }

    return res.json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.errors[0] });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const { _id } = req.user;

  const { oldPassword, newPassword } = req.body;

  try {
    updatePasswordValidationSchema.validate(req.body);

    const user = await User.findById(_id);

    const passwordIsCorrect = await user.checkPassword(oldPassword);

    if (!passwordIsCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message:
          "Incorrect old password. You cannot change your password at this time.",
      });
    }

    if (!newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid new password",
      });
    }

    user.password = newPassword;

    await user.save();

    return res.json({ message: "Password updated." });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.errors[0] });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const sendForgotPasswordToken = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User with this email not found." });
    }

    const token = await user.generatePasswordResetToken();

    const data: Email = {
      from: "Croch",
      to: email,
      subject: "Reset Your Password",
      text: "Follow this link to reset your password.",
      html: `Follow this link to reset your password <a href = "${process.env.BASE_URL}/auth/reset-password?token=${token}">Click Here To Verify</a>.`,
    };

    await sendEmail(data);

    return res.json({ message: "Password reset sent to your email." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const { password } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpries: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid password reset link. Link must have expired.",
      });
    }

    user.password = password;

    await user.save();

    return res.json({
      message: "Password changed successfully. You can continue to login.",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const sendEmailVerificationToken = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User with this email not found." });
    }

    const token = await user.generateEmailVerificationToken();

    const data: Email = {
      from: "Croch",
      to: email,
      subject: "Verify Your Email Address",
      text: "Verify Your Email Addresss",
      html: `Follow this link to verify your email address <a href = "${process.env.BASE_URL}/auth/verifyEmail?token=${token}">Click Here To Verify</a>.`,
    };

    await sendEmail(data);

    return res.json({ message: "Email verification link sent successfully." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid email verification link. Link must have expired.",
      });
    }

    user.emailVerified = true;

    await user.save();

    return res.json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const deleteMyAccount = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;

  const { password } = req.body;

  validateId(userId, res);

  try {
    const user = await User.findById(userId);

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid password. You cannot perform action." });
    }

    if (user.role === "customer") {
      await Customer.findByIdAndDelete(userId);
    } else {
      await Creative.findByIdAndDelete(userId);

      await Product.findOneAndDelete({ owner: userId });
    }

    await User.findByIdAndDelete(userId);

    return res.json({ messaage: "Account deleted." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = {
  signUp,
  updatePassword,
  resetPassword,
  sendForgotPasswordToken,
  verifyEmail,
  sendEmailVerificationToken,
  deleteMyAccount,
};
