import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");
import Creative = require("../models/creative");
import { Response, Request } from "express";
import validateId = require("../utilities/validateId");
import uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
import fs = require("fs");

const createProduct = async (req: Request, res: Response) => {
  const { title, availability, price, description, gender, tag }: ProductBody =
    req.body;

  const creative = req.user;

  if (
    !title ||
    !availability ||
    !price ||
    !description ||
    !gender ||
    !tag ||
    !req.files
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all necessary listing details." });
  }

  try {
    const uploader = (file: string) =>
      uploadImageToCloudinary(file, "product-images");

    const urls: string[] = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const imageUrl = await uploader(path);

      urls.push(imageUrl);

      fs.unlinkSync(path);
    }

    const product = await Product.create({
      ...req.body,

      price: Number(req.body.price),

      photos: urls.map((url) => {
        return url;
      }),

      owner: creative._id,
    });

    return res.json(product);
  } catch (error) {
    console.log("error", error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const creative = req.user;

  const { title, availability, price, description, gender, tag }: ProductBody =
    req.body;

  if (
    !title ||
    !availability ||
    !price ||
    !description ||
    !gender ||
    !tag ||
    !req.files
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all necessary listing details." });
  }

  validateId(id);

  try {
    const uploader = (file: string) =>
      uploadImageToCloudinary(file, "product-images");

    const urls: string[] = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const imageUrl = await uploader(path);

      urls.push(imageUrl);

      fs.unlinkSync(path);
    }

    await Product.findByIdAndUpdate(
      id,

      {
        ...req.body,

        photos: urls.map((url) => {
          return url;
        }),

        owner: creative._id,
      },

      { new: true }
    );

    return res.json({ message: "Listing updated successfully." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  validateId(id);

  try {
    await Product.findByIdAndDelete(id);

    return res.json({ message: "Job deleted successfully." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getProducts = async (req: Request, res: Response) => {
  const creativeId = req.user._id;

  validateId(creativeId);

  try {
    const products = await Product.find({ owner: creativeId });

    return res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateFunFacts = async (req: Request, res: Response) => {
  const funFacts: string[] = req.body;

  if (!funFacts) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input." });
  }

  const { _id: creativeId } = req.user;

  validateId(creativeId);

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
  const isAvailable: boolean = req.body;

  const { _id: creativeId } = req.user;

  validateId(creativeId);

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
  const personalDescription: string = req.body;

  if (!personalDescription) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input." });
  }

  const { _id: creativeId } = req.user;

  validateId(creativeId);

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
  const yearsOfExperience: number = req.body;

  if (!yearsOfExperience) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input." });
  }

  const { _id: creativeId } = req.user;

  validateId(creativeId);

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

export = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateFunFacts,
  updateIsAvailable,
  updatePersonalDescription,
  updateYearsOfExperience,
};
