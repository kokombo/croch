import Admin = require("../models/admin");
import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");
import generateAccessToken = require("../utilities/generateAccessToken");
import generateRefreshToken = require("../utilities/generateRefreshToken");
import {
  adminSignupValidationSchema,
  loginFormValidationSchema,
} from "../validators";
import { ValidationError } from "yup";

const createAdminAccount = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await adminSignupValidationSchema.validate(req.body);

    const adminExists = await User.findOne({ email: email.toLowerCase() });

    if (adminExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Account already exists." });
    }

    const admin = await User.create({
      ...req.body,
      email: email.toLowerCase(),
      role: "admin",
    });

    return res.json(admin);
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

const adminSignIn = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    await loginFormValidationSchema.validate(req.body);

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.role !== "admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform action" });
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

const blockAUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  validateId(userId, res);

  try {
    const user = await User.findById(userId);

    user.accountDisabled = true;

    await user.save();

    return res.json({ message: "Account disabled." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const unblockAUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  validateId(userId, res);

  try {
    const user = await User.findById(userId);

    user.accountDisabled = false;

    await user.save();

    return res.json({ message: "Account enabled." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();

    return res.json(customers);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getAllCreatives = async (req: Request, res: Response) => {
  try {
    const creatives = await Creative.find();

    return res.json(creatives);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCreative = async (req: Request, res: Response) => {
  const creativeId = req.query.creativeId as string;

  validateId(creativeId, res);

  try {
    const creative = await Creative.findById(creativeId);

    if (!creative) {
      return res
        .json(StatusCodes.NOT_FOUND)
        .json({ message: "Creative not found." });
    }

    return res.json(creative);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCustomer = async (req: Request, res: Response) => {
  const customerId = req.query.customerId as string;

  validateId(customerId, res);
  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res
        .json(StatusCodes.NOT_FOUND)
        .json({ message: "Customer not found." });
    }

    return res.json(customer);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const giveSuperCreativeTag = async (req: Request, res: Response) => {
  const { creativeId } = req.body;

  validateId(creativeId, res);

  try {
    const creative = await Creative.findById(creativeId);

    creative.superCreative = true;

    await creative.save();

    return res.json({ message: "Super creative tag given successfully." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = {
  blockAUser,
  unblockAUser,
  getAllCustomers,
  getAllCreatives,
  getAllUsers,
  getCreative,
  getCustomer,
  giveSuperCreativeTag,
  adminSignIn,
  createAdminAccount,
};
