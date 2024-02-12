import { Request, Response } from "express";
import Order = require("../models/order");
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");

const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.query;

  validateId(orderId as string);

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found." });
    }

    return res.json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { getOrder };
