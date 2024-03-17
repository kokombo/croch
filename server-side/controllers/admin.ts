import Admin = require("../models/admin");
import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");
import generateAccessToken = require("../utilities/generateAccessToken");
import generateRefreshToken = require("../utilities/generateRefreshToken");

const createAdminAccount = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all necessary credentials." });
  }

  const refinedEmail = email.toLowerCase();

  try {
    const adminExists = await User.findOne({ email: refinedEmail });

    if (adminExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Account already exists." });
    }

    const admin = await User.create({
      ...req.body,
      email: refinedEmail,
      role: "admin",
    });

    return res.json(admin);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const adminSignIn = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide your login credentials." });
  }

  const refinedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: refinedEmail });

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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const blockAUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  validateId(userId);

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

  validateId(userId);

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
  const { creativeId } = req.query;

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
  const { customerId } = req.query;

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
