import { Request, Response } from "express";
import Customer = require("../models/customer");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import mongoose = require("mongoose");
import Product = require("../models/product");

type CartItem = {
  _id: mongoose.Types.ObjectId;
  count: number;
};

const addToCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate(
      "cart.cartItems._id"
    );

    const cartItems: CartItem[] = customer.cart.cartItems;

    const alreadyInCart = Boolean(
      cartItems.find((cartItem) => cartItem._id.equals(productId))
    );

    if (alreadyInCart) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product already in cart." });
    }

    await Customer.findByIdAndUpdate(
      customerId,

      { $push: { "cart.cartItems": { _id: productId, count: 1 } } },

      { new: true }
    );

    return res.json({ message: "Product added to cart." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateCartItemCount = async (req: Request, res: Response) => {
  const { productId, count } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  try {
    const customer = await Customer.findById(customerId);

    const cartItems: CartItem[] = customer.cart.cartItems;

    const product = cartItems.find((cartItem) =>
      cartItem._id.equals(productId)
    );

    if (product) {
      product.count = count;
    }

    await customer.save();

    return res.json(product);
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
    const customer = await Customer.findById(customerId);

    const cartItems: CartItem[] = customer.cart.cartItems;

    const alreadyInCart = Boolean(
      cartItems.find((cartItem) => cartItem._id.equals(productId))
    );

    if (alreadyInCart) {
      await Customer.findByIdAndUpdate(
        customerId,

        { $pull: { "cart.cartItems": { _id: productId } } },

        { new: true }
      );

      return res.json({ message: "Product removed from cart." });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCartItems = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate({
      path: "cart.cartItems._id",
      select: "title price",
    });
    const cartItems = customer.cart.cartItems;

    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i]._id.price * cartItems[i].count;
    }

    res.json({ cartItems, totalPrice });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const clearCartItems = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export = {
  addToCart,
  removeFromCart,
  getCartItems,
  clearCartItems,
  updateCartItemCount,
};
