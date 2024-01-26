import { Request, Response } from "express";
import Customer from "../models/customer";
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import mongoose = require("mongoose");

type CartItem = {
  _id: mongoose.Types.ObjectId;
  count: number;
};

const addToCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id } = req.user;

  validateId(productId);

  validateId(_id);

  try {
    const customer = await Customer.findById(_id).populate(
      "cart.cartItems._id"
    );

    const alreadyInCart = customer.cart.cartItems.find((cartItem: CartItem) =>
      cartItem._id.equals(productId)
    );

    if (alreadyInCart) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product already in cart." });
    }

    await Customer.findByIdAndUpdate(
      _id,

      { $push: { "cart.cartItems": { _id: productId } } },

      { new: true }
    );

    return res.json({ message: "Product added to cart." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id } = req.user;

  validateId(productId);

  validateId(_id);

  try {
    const customer = await Customer.findById(_id);

    const alreadyInCart = customer.cart.cartItems.find((cartItem: CartItem) =>
      cartItem._id.equals(productId)
    );

    if (alreadyInCart) {
      await Customer.findByIdAndUpdate(
        _id,

        { $pull: { "cart.cartItems": { cartItemId: productId } } },

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
  const { _id } = req.user;

  validateId(_id);

  try {
    const customer = await Customer.findById(_id).populate(
      "cart.cartItems._id"
    );

    const cartItems = customer.cart.cartItems;

    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i]._id.price;

      console.log("totalPrice", totalPrice);
    }

    // * cartItems[i].count;

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

export = { addToCart, removeFromCart, getCartItems, clearCartItems };
