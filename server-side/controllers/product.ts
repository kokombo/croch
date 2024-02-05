import { Request, Response } from "express";
import Product = require("../models/product");
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");

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
      select: "_id firstName",
    });

    //An algorithm to display products based on product performance or creative's overall performance.

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
  const { productId } = req.query;

  validateId(productId as string);

  try {
    const product = await Product.findById(productId).populate({
      path: "owner",
      select: "_id firstName",
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

export = { getAllProducts, getProduct };
