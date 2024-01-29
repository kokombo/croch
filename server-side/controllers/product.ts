import { Request, Response } from "express";
import Product = require("../models/product");
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");

const getAllProducts = async (req: Request, res: Response) => {
  const queryObject = { ...req.query };

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
      select: "_id, firstName",
    });

    //An algorithm to display products based on performance or owner's performance.

    const sort = req.query.sort as string;

    if (sort) {
      result = result.sort({ [sort]: "desc" });
    } else {
    }

    const page = Number(req.query.page);

    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    return res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  validateId(id);

  try {
    const product = await Product.findById(id).populate({
      path: "owner",
      select: "_id firstName",
    });

    return res.json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { getAllProducts, getProduct };
