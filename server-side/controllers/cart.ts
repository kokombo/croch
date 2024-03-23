import { Request, Response } from "express";
import Customer = require("../models/customer");
import Creative = require("../models/creative");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");

const addToCart = async (req: Request, res: Response) => {
  const { productId, count, size } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const newlyAddedProduct = await Product.findById(productId);

    const productOwnerId = newlyAddedProduct.owner; //or creativeId

    await Customer.findByIdAndUpdate(
      customerId,

      {
        $push: {
          [`carts.${productOwnerId}.cartItems`]: {
            info: productId,
            size,
            title: newlyAddedProduct.title,
            thumbNail: newlyAddedProduct.photos[0],
            count: count,
            cummulativePrice: newlyAddedProduct.price * count,
          },
        },

        $set: {
          [`carts.${productOwnerId}.totalPrice`]:
            newlyAddedProduct.price * count,
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

    let vendorCart;
    let totalPrice = 0;

    const carts: Carts = customer.carts;

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === creativeIdFromClient)) {
        vendorCart = cart;

        const vendorCartItems: CartItem[] = vendorCart.cartItems;

        const product = vendorCartItems.find(
          (cartItem) => cartItem.info._id.toString() === productId
        );

        if (product) {
          product.count = count;

          product.cummulativePrice = product.info.price * count;
        }

        for (let i = 0; i < vendorCartItems.length; i++) {
          totalPrice += vendorCartItems[i].cummulativePrice;
        }

        vendorCart.totalPrice = totalPrice;
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
    const product = await Product.findById(productId);

    const productOwnerId = product.owner;

    const customer = await Customer.findByIdAndUpdate(
      customerId,

      {
        $pull: {
          [`carts.${productOwnerId}.cartItems`]: {
            info: productId,
          },
        },
      },

      { new: true }
    );

    const carts: Carts = customer.carts;

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === productOwnerId.toString())) {
        const vendorCartItems: CartItem[] = cart.cartItems;

        if (vendorCartItems.length < 1) {
          carts.delete(productOwnerId);
        }
      }
    }

    await customer.save();

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

    const carts: Carts = customer.carts;

    let result = [];

    for (const [creativeId, cart] of carts.entries()) {
      const creative = await Creative.findById(creativeId);

      result.push({
        creativeId,
        brandName: creative.brandName,
        brandLogo: creative.brandLogo,
      });
    }

    return res.json(result);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCartItems = async (req: Request, res: Response) => {
  const { creativeId: creativeIdFromClient } = req.query;

  const { _id: customerId } = req.user;

  validateId(customerId);

  validateId(creativeIdFromClient as string);

  try {
    const customer = await Customer.findById(customerId).populate({
      path: `carts.${creativeIdFromClient}.cartItems.info`,
      select: "_id price owner",
    });

    const carts: Carts = customer.carts;

    let totalPrice = 0;

    let vendorCart; //vendor here is used as a substitute word for creative.

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === creativeIdFromClient)) {
        vendorCart = cart;

        const vendorCartItems: CartItem[] = vendorCart.cartItems;

        for (let i = 0; i < vendorCartItems.length; i++) {
          totalPrice += vendorCartItems[i].cummulativePrice; //cummulativePrice is price of each item * count
        }

        vendorCart.totalPrice = totalPrice;
      }
    }

    await customer.save();

    return res.json(vendorCart);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const deleteCart = async (req: Request, res: Response) => {
  const { cart: creativeIdFromClient } = req.query;

  const { _id: customerId } = req.user;

  validateId(customerId);

  validateId(creativeIdFromClient as string);

  try {
    const customer = await Customer.findById(customerId);

    if (customer.carts.has(creativeIdFromClient)) {
      customer.carts.delete(creativeIdFromClient);
    }

    await customer.save();

    return res.json({ message: "Cart removed!" });
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
  getCarts,
  deleteCart,
};
