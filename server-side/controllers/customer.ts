import { Request, Response } from "express";
import Customer = require("../models/customer");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import mongoose = require("mongoose");
import Product = require("../models/product");
import Creative = require("../models/creative");
import Order = require("../models/order");

type CartItem = {
  info: {
    _id: mongoose.Types.ObjectId;
    title: string;
    price: number;
    owner: mongoose.Types.ObjectId;
  };

  count: number;

  price: number; //info.price * count
};

type Cart = {
  cartItems: CartItem[];
  totalPrice: number;
  _id: string;
};

type CItem = Map<string, Cart>;

const addToCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const newlyAddedProduct = await Product.findById(productId);

    const creativeId = newlyAddedProduct.owner;

    await Customer.findByIdAndUpdate(
      customerId,

      {
        $push: {
          [`carts.${creativeId}.cartItems`]: {
            info: productId,
            count: 1,
            price: newlyAddedProduct.price,
          },
        },

        $set: {
          [`carts.${creativeId}.totalPrice`]: newlyAddedProduct.price,
        },
      },

      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({ message: "Product added to cart." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateCartItemCount = async (req: Request, res: Response) => {
  const { productId, count, creativeId: creativeIdFromClient } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(creativeIdFromClient);

  try {
    const customer = await Customer.findById(customerId).populate({
      path: `carts.${creativeIdFromClient}.cartItems.info`,
      select: "price",
    });

    const carts: CItem = customer.carts;

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === creativeIdFromClient)) {
        const vendorCart: CartItem[] = cart.cartItems;

        const product = vendorCart.find(
          (cartItem) => cartItem.info._id.toString() === productId
        );

        if (product) {
          product.count = count;

          product.price = product.info.price * count;
        }
      }
    }

    await customer.save();

    return res.json({ message: "Count updated." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const newlyAddedProduct = await Product.findById(productId);

    const creativeId = newlyAddedProduct.owner;

    await Customer.findByIdAndUpdate(
      customerId,

      {
        $pull: {
          [`carts.${creativeId}.cartItems`]: {
            info: productId,
          },
        },
      },

      { new: true }
    );

    return res.json({ message: "Product removed from cart." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCarts = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId);

    const carts: CItem = customer.carts;

    let Ids: string[] = [];

    for (const [creativeId, cart] of carts.entries()) {
      Ids.push(creativeId);
    }

    return res.json(Ids);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCartItems = async (req: Request, res: Response) => {
  const { creativeId: creativeIdFromClient } = req.body;

  const { _id: customerId } = req.user;

  validateId(customerId);

  validateId(creativeIdFromClient);

  try {
    const customer = await Customer.findById(customerId);

    const carts: CItem = customer.carts;

    let totalPrice = 0;

    let vendorCart; //vendor here is used as substitute for creative.

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === creativeIdFromClient)) {
        vendorCart = cart;

        const vendorCartItems: CartItem[] = vendorCart.cartItems;

        for (let i = 0; i < vendorCartItems.length; i++) {
          totalPrice += vendorCartItems[i].price;
        }

        vendorCart.totalPrice = totalPrice;
      }
    }

    await customer.save();

    res.json(vendorCart);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const deleteCart = async (req: Request, res: Response) => {
  const { creativeId: creativeIdFromClient } = req.body;

  const { _id: customerId } = req.user;

  validateId(customerId);

  validateId(creativeIdFromClient);

  try {
    const customer = await Customer.findById(customerId);

    customer.carts.delete(creativeIdFromClient);

    await customer.save();

    return res.json({ message: "Cart removed!" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const placeAnOrder = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  const { creativeId: creativeIdFromClient } = req.body;

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate({
      path: `carts.${creativeIdFromClient}.cartItems.info`,
      select: "owner",
    });

    const carts: CItem = customer.carts;

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
      }
    }

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

  if (customerId.toString() !== order.customerId.toString()) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You cannot perform action." });
  }

  order.status = "fulfilled";

  await order.save();

  return res.json({ message: "You have confirmed this order as complete." });
};

const getOrders = async (req: Request, res: Response) => {
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

export = {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCartItemCount,
  placeAnOrder,
  cancelAnOrder,
  getOrders,
  confirmAnOrder,
  getCarts,
  deleteCart,
};
