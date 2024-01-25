import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");
import { Response, Request } from "express";
import validateId = require("../utilities/validateId");

const createProduct = async (req: Request, res: Response) => {
  const { title, availability, price, description, gender, tag, photos } =
    req.body;

  const user = req.user;

  if (user.role !== "creative") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to create a listing." });
  }

  if (
    !title ||
    !availability ||
    !price ||
    !description ||
    !gender ||
    !tag ||
    !photos
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all necessary listing details." });
  }

  try {
    const product = await Product.create({ ...req.body, owner: user._id });

    return res.json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  validateId(id);

  try {
    await Product.findByIdAndUpdate(id, { ...req.body }, { new: true });

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

  try {
    const products = await Product.find({ owner: creativeId });

    return res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { createProduct, updateProduct, deleteProduct, getProducts };
