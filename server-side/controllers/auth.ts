import User = require("../models/user");
import generateAccessToken = require("../utilities/generateAccessToken");
import generateRefreshToken = require("../utilities/generateRefreshToken");
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt = require("jsonwebtoken");
import { loginFormValidationSchema } from "../validators";
import { ValidationError } from "yup";

const signIn = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    await loginFormValidationSchema.validate(req.body);

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Incorrect email or password." });
    }

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid password. Please check and try again." });
    }

    const refreshToken = generateRefreshToken(user?._id);

    await User.findByIdAndUpdate(
      user?._id,

      { refreshToken },

      {
        new: true,
      }
    );

    res.cookie("crochRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    const accessToken = generateAccessToken(user?._id);

    return res.json({
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

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.crochRefreshToken) {
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

    res.clearCookie("crochRefreshToken", {
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

export = {
  signIn,
  handleRefreshToken,
  logOut,
};
