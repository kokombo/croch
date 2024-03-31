import { Request, Response } from "express";
import validateId = require("../utilities/validateId");
import Review = require("../models/review");
import Order = require("../models/order");
import { StatusCodes } from "http-status-codes";

const giveReview = async (req: Request, res: Response) => {
  const { message, rating, to, forOrder } = req.body;

  const { _id: from } = req.user;

  if (!message || !rating || !to || !forOrder) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid reviews data." });
  }

  validateId(to, res);

  validateId(forOrder, res);

  try {
    const order = await Order.findById(forOrder);

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Invalid request." });
    }

    if (order.customerId.toString() !== from) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform action." });
    }

    const newReview = await Review.create({
      from,
      to,
      forOrder,
      message,
      rating,
    });

    return res.json(newReview);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCreativeReviews = async (req: Request, res: Response) => {
  const creativeId = req.query.creativeId as string;

    validateId(creativeId, res);
  try {
    const reviews = await Review.find({ to: creativeId })
      .populate({
        path: "from",
        select: "firstName, lastName, profileImage",
      })
      .populate({ path: "to", select: "brandName" });

    return res.json(reviews);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCustomerPostedReviews = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  try {
    const reviews = await Review.find({ from: customerId });

    return res.json(reviews);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { giveReview, getCreativeReviews, getCustomerPostedReviews };
