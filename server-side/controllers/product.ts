import { Request, Response } from "express";
import Product = require("../models/product");
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).populate({
      path: "owner",
      select: "_id, firstName",
    });

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
      select: "_id, firstName",
    });

    return res.json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { getAllProducts, getProduct };
