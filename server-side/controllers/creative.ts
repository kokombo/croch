import { StatusCodes } from "http-status-codes";
import Creative = require("../models/creative");
import Order = require("../models/order");
import Product = require("../models/product");
import type { Response, Request } from "express";
import validateId = require("../utilities/validateId");
import uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
import { creativeAccountSetupValidationSchema } from "../validators";
import { ValidationError } from "yup";

const setupAccount = async (req: Request, res: Response) => {
  const { brandName, personalDescription, yearsOfExperience, funFacts } =
    req.body;

  const files = req.files;

  const { _id: creativeId } = req.user;

  try {
    await creativeAccountSetupValidationSchema.validate(req.body);

    const creative = await Creative.findById(creativeId);

    creative.brandName = brandName;
    creative.personalDescription = personalDescription;
    creative.yearsOfExperience = Number.parseInt(yearsOfExperience);
    creative.funFacts = funFacts;

    const file = files[0];

    if (!file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Upload a valid brand logo" });
    }

    const { path } = file;

    const imageUrl = await uploadImageToCloudinary(path, "brand-logos");

    creative.brandLogo = imageUrl;

    await creative.save();

    return res.json(creative);
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

const updateFunFacts = async (req: Request, res: Response) => {
  const { funFacts } = req.body;

  const { _id: creativeId } = req.user;

  try {
    const creative = await Creative.findById(creativeId);

    if (creative) {
      creative.funFacts = funFacts;
    }

    await creative.save();

    return res.json(creative.funFacts);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateIsAvailable = async (req: Request, res: Response) => {
  const { isAvailable } = req.body;

  const { _id: creativeId } = req.user;

  try {
    const creative = await Creative.findById(creativeId);

    if (creative) {
      creative.isAvailable = isAvailable;
    }

    await creative.save();

    return res.json(creative.isAvailable);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updatePersonalDescription = async (req: Request, res: Response) => {
  const { personalDescription } = req.body;

  const { _id: creativeId } = req.user;

  try {
    const creative = await Creative.findById(creativeId);

    if (creative) {
      creative.personalDescription = personalDescription;
    }

    await creative.save();

    return res.json(creative.personalDescription);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateYearsOfExperience = async (req: Request, res: Response) => {
  const { yearsOfExperience } = req.body;

  const { _id: creativeId } = req.user;

  try {
    const creative = await Creative.findById(creativeId);

    if (creative) {
      creative.yearsOfExperience = yearsOfExperience;
    }

    await creative.save();

    return res.json(creative.yearsOfExperience);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const setBrandName = async (req: Request, res: Response) => {
  const { brandName } = req.body;

  const { _id: creativeId } = req.user;

  if (!brandName) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Brand name cannot be empty." });
  }

  try {
    const creative = await Creative.findById(creativeId);

    if (creative) {
      creative.brandName = brandName;
    }

    await creative.save();

    return res.json(creative.brandName);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const setBrandLogo = async (req: Request, res: Response) => {
  const files = req.files;

  const { _id: creativeId } = req.user;

  try {
    const creative = await Creative.findById(creativeId);

    const file = files[0];

    if (!file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid input." });
    }

    const { path } = file;

    const imageUrl = await uploadImageToCloudinary(path, "brand-logos");

    creative.brandLogo = imageUrl;

    await creative.save();

    return res.json(creative.brandLogo);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getOrders = async (req: Request, res: Response) => {
  const { _id: creativeId } = req.user;

  const status = req.query.status as string;

  try {
    const orders = await Order.find({ creativeId, status });

    return res.json(orders);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCreativeById = async (req: Request, res: Response) => {
  const creativeId = req.query.creativeId as string;

  validateId(creativeId, res);

  try {
    const creative = await Creative.findById(creativeId);

    if (!creative) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Creative not found" });
    }

    const creativeProducts: Product[] = await Product.find({
      owner: creativeId,
    });

    const ratingsArray = creativeProducts.map((product) => product.rating);

    let cummulativeRating = 0;

    for (let i = 0; i < ratingsArray.length; i++) {
      cummulativeRating += ratingsArray[i];
    }

    const averageRating = cummulativeRating / ratingsArray.length;

    creative.rating = averageRating.toFixed(1);

    await creative.save();

    return res.json(creative);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const accountSetupDone = async (req: Request, res: Response) => {
  const { _id: creativeId } = req.user;

  const creative = await Creative.findById(creativeId);

  creative.accountSetupDone = true;

  await creative.save();

  return res.json({ message: "success" });
};

export = {
  updateFunFacts,
  updateIsAvailable,
  updatePersonalDescription,
  updateYearsOfExperience,
  getOrders,
  setBrandName,
  setBrandLogo,
  getCreativeById,
  setupAccount,
  accountSetupDone,
};
