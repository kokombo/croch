import { Request, Response } from "express";
import Order = require("../models/order");
import Customer = require("../models/customer");
import { StatusCodes } from "http-status-codes";
import validateId = require("../utilities/validateId");

const placeAnOrder = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  const { creativeId: creativeIdFromClient } = req.body;

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate({
      path: `carts.${creativeIdFromClient}.cartItems.info`,
      select: "owner",
    });

    const carts: Carts = customer.carts;

    let order;

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === creativeIdFromClient)) {
        const cartItems = cart.cartItems;

        order = await Order.create({
          items: cartItems,
          customerId,
          creativeId: cartItems[0].info.owner,
          status: "pending",
          totalPrice: cart.totalPrice,
        });

        carts.delete(creativeIdFromClient);
      }
    }

    await customer.save();

    return res
      .status(StatusCodes.OK)
      .json({ order, message: "Order successfully placed." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const cancelAnOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const { _id: customerId } = req.user;

  const order = await Order.findById(orderId);

  if (!order) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No order found!" });
  }

  if (customerId.toString() !== order.customerId.toString()) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You cannot perform action." });
  }

  order.status = "cancelled";

  await order.save();

  return res.json({ message: "Order cancelled." });
};

const confirmAnOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const { _id: customerId } = req.user;

  const order = await Order.findById(orderId);

  if (!order) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No order found!" });
  }

  if (customerId.toString() !== order.customerId.toString()) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You cannot perform action." });
  }

  order.status = "fulfilled";

  await order.save();

  return res.json({ message: "You have confirmed this order as complete." });
};

const getCustomerOrders = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  const status = req.query.status as string;

  try {
    const orders = await Order.find({ customerId, status });

    return res.json(orders);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

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

export = {
  getOrder,
  placeAnOrder,
  cancelAnOrder,
  getCustomerOrders,
  confirmAnOrder,
};
