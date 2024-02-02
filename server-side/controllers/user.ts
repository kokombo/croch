import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import generateAccessToken = require("../utilities/generateAccessToken");
import generateRefreshToken = require("../utilities/generateRefreshToken");
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt = require("jsonwebtoken");
import validateId = require("../utilities/validateId");
import sendEmail = require("../utilities/sendEmail");

type JwtCallback = (
  error: Error | null,
  decoded: jwt.JwtPayload | undefined
) => void;

const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all necessary credentials." });
  }

  const refinedEmail = email.toLowerCase();

  try {
    const userExists = await User.findOne({ refinedEmail });

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

    return res.json(user).status(StatusCodes.OK);
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
      maxAge: 60 * 60 * 60 * 1000,
    });

    const accessToken = generateAccessToken(user?._id);

    return res.status(StatusCodes.OK).json({
      id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      accessToken,
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

      { clockTolerance: 5 * 60, complete: true }, //5 minutes

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

  const { password } = req.body;

  validateId(_id);

  try {
    const user = await User.findById(_id);

    if (user) {
      user.password = password;
    }

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
      from: "",
      to: email,
      subject: "Reset Your Password",
      text: "",
      html: "",
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
  const token = req.query.token;

  const { password } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
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

const verifyEmailAddress = async (req: Request, res: Response) => {
  const token = req.query.token;

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid  verification link. Link must have expired.",
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
  try {
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
  verifyEmailAddress,
};
