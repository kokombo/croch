import Admin = require("../models/admin");
import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");

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
  const { creativeId } = req.body;

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
  const { customerId } = req.body;

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
};
