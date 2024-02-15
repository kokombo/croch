import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import Product = require("../models/product");
import generateAccessToken = require("../utilities/generateAccessToken");
import generateRefreshToken = require("../utilities/generateRefreshToken");
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt = require("jsonwebtoken");
import validateId = require("../utilities/validateId");
import sendEmail = require("../utilities/sendEmail");
import crypto = require("crypto");

const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all necessary credentials." });
  }

  const refinedEmail = email.toLowerCase();

  try {
    const userExists = await User.findOne({ email: refinedEmail });

    if (userExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists." });
    }

    const user = await User.create({ ...req.body, email: refinedEmail });

    if (role === "customer") {
      await Customer.create({ _id: user._id });
    }

    if (role === "creative") {
      await Creative.create({ _id: user._id });
    }

    return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide your login credentials." });
  }

  const refinedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: refinedEmail });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist." });
    }

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Incorrect password." });
    }

    const refreshToken = generateRefreshToken(user?._id);

    await User.findByIdAndUpdate(
      user?._id,

      { refreshToken },

      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const accessToken = generateAccessToken(user?._id);

    return res.status(StatusCodes.OK).json({
      id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      accessToken,
      accountDisabled: user?.accountDisabled,
      emailVerified: user?.emailVerified,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "No refreshToken found." });
  }

  const refreshToken = cookies.refreshToken;

  try {
    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res
        .json(StatusCodes.NOT_FOUND)
        .json({ message: "User with this refreshToken not found." });
    }

    jwt.verify(
      refreshToken,

      process.env.JWT_SECRET as string,

      { complete: true },

      (error: Error | null, decoded: jwt.JwtPayload | undefined) => {
        if (error || decoded?.id !== user._id) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "There is an issue with the refreshToken." });
        } else {
          const accessToken = generateAccessToken(user._id);

          user.accessToken = accessToken;
        }
      }
    );

    await user.save();

    return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const { _id } = req.user;

  const { oldPassword, newPassword } = req.body;

  validateId(_id);

  try {
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

const logOut = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Cookies not found." });
  }

  const refreshToken = cookies.refreshToken;

  try {
    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You cannot perform action." });
    }

    await User.findOneAndUpdate(
      refreshToken,

      { accessToken: "", refreshToken: "" },

      { new: true }
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return res.json({ message: "You have logged out successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const deleteMyAccount = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;

  validateId(userId);

  try {
    const user = await User.findById(userId);

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
  signIn,
  handleRefreshToken,
  updatePassword,
  resetPassword,
  sendForgotPasswordToken,
  logOut,
  verifyEmail,
  sendEmailVerificationToken,
  deleteMyAccount,
};
