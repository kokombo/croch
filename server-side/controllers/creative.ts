import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");
import { Response, Request } from "express";
import validateId = require("../utilities/validateId");
import uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
import fs = require("fs");

const createProduct = async (req: Request, res: Response) => {
  const { title, availability, price, description, gender, tag }: ProductBody =
    req.body;

  const user = req.user;

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

      photos: urls.map((url) => {
        return url;
      }),

      owner: user._id,
    });

    return res.json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, availability, price, description, gender, tag }: ProductBody =
    req.body;
  console.log("files", req.files, { ...req.body });

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

        owner: req.user._id,
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
