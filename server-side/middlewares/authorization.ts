import User = require("../models/user");
import jwt = require("jsonwebtoken");
import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");

const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;

      const user = await User.findById(decodedToken?.id);

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Session expired!. You are not currently logged in.",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized." });
    }
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid authorization." });
  }
};

const isCreative = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (user.role !== "creative") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to perform action." });
  } else {
    next();
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (user.role !== "admin") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to perform action." });
  } else {
    next();
  }
};

const isProductOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id: userId } = req.user;

  const { productId } = req.query;

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No product found." });
  }

  if (!product.owner.equals(userId)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to perform action." });
  } else {
    next();
  }
};

export = { authorizeUser, isCreative, isProductOwner, isAdmin };
