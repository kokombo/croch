import { Request, Response } from "express";
import Product = require("../models/product");
import { StatusCodes } from "http-status-codes";
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
    req.files.length < 1
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all necessary listing details." });
  }

  try {
    const urls: string[] = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const imageUrl = await uploadImageToCloudinary(path, "product-images");

      urls.push(imageUrl);

      fs.unlinkSync(path);
    }

    const product = await Product.create({
      ...req.body,

      nationwideDelivery: req.body.nationwideDelivery === "true" ? true : false,

      primaryLocation:
        typeof req.body.primaryLocation !== "undefined"
          ? JSON.parse(req.body.primaryLocation)
          : null,

      otherLocations:
        typeof req.body.otherLocations !== "undefined"
          ? JSON.parse(req.body.otherLocations)
          : null,

      price: parseInt(req.body.price),

      photos: urls.map((url) => {
        return url;
      }),

      owner: creative._id,
    });

    return res.json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const productId = req.query.productId as string;

  const creative = req.user;

  validateId(productId, res);

  const { title, availability, price, description, gender, tag }: ProductBody =
    req.body;

  if (
    !title ||
    !availability ||
    !price ||
    !description ||
    !gender ||
    !tag ||
    req.files.length < 1
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide all necessary listing details." });
  }

  try {
    const urls: string[] = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const imageUrl = await uploadImageToCloudinary(path, "product-images");

      urls.push(imageUrl);

      fs.unlinkSync(path);
    }

    await Product.findByIdAndUpdate(
      productId,

      {
        ...req.body,

        nationwideDelivery:
          req.body.nationwideDelivery === "true" ? true : false,

        primaryLocation:
          typeof req.body.primaryLocation !== "undefined"
            ? JSON.parse(req.body.primaryLocation)
            : null,

        otherLocations:
          typeof req.body.otherLocations !== "undefined"
            ? JSON.parse(req.body.otherLocations)
            : null,

        price: parseInt(req.body.price),

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
  const productId = req.query.productId as string;

  validateId(productId, res);

  try {
    await Product.findByIdAndDelete(productId);

    return res.json({ message: "Job deleted successfully." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCreativeProducts = async (req: Request, res: Response) => {
  const { _id: creativeId } = req.user;

  try {
    let results = Product.find({ owner: creativeId });

    const page = Number(req.query.page);

    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);

    const products = await results;

    return res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const queryObject = { ...req.query };

  //Filtering

  const excludeFields = ["page", "sort", "limit", "fields", "search"];

  excludeFields.forEach((item) => delete queryObject[item]);

  let numericQuery = JSON.stringify(queryObject);

  numericQuery = numericQuery.replace(
    /\b(gte|gt|lte|lt|eq)\b/g,
    (match) => `$${match}`
  );

  try {
    let result = Product.find(JSON.parse(numericQuery)).populate({
      path: "owner",
      select: "_id firstName lastName profileImage",
    });

    //An algorithm to display products based on product performance or creative's overall performance and/or product performance.

    //Sorting

    const sort = req.query.sort as string;

    if (sort) {
      result = result.sort({ [sort]: "desc" });
    }

    //Pagination

    const page = Number(req.query.page);

    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    //Implement search

    const products = await result;

    return res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getProduct = async (req: Request, res: Response) => {
  const productId = req.query.productId as string;

  validateId(productId, res);

  try {
    const product = await Product.findById(productId).populate({
      path: "owner",
      select: "firstName lastName",
    });

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCreativeProducts,
};
