import { Request, Response } from "express";
import Customer = require("../models/customer");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import mongoose = require("mongoose");
import Product = require("../models/product");
import Order = require("../models/order");

type CartItem = {
  info: {
    _id: mongoose.Types.ObjectId;
    title: string;
    price: number;
    owner: mongoose.Types.ObjectId;
  };
  count: number;

  price: number;
};

//A user can only add products from one vendor at a time to ensure seperate orders tracking with each vendor.
//Find the product in the database through it's ID and check for the owner which references a user.
//Get the current customer's cart and check for the owner ID of the product/item in the cart (if there is any).
//If the owner ID of the products in the cart does not match the owner ID of the new product added, the new product will override the items in the cart.
//

const addToCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate(
      "cart.cartItems.info"
    );

    const cartItems: CartItem[] = customer.cart.cartItems;

    const alreadyInCart = Boolean(
      cartItems.find((cartItem) => cartItem.info._id.equals(productId))
    );

    if (alreadyInCart) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product already in cart." });
    }

    const newlyAddedProduct = await Product.findById(productId);

    const newlyAddedProductOwnerId = newlyAddedProduct.owner;

    if (cartItems.length > 0) {
      const ownerIdOfItemsAlreadyInCart = cartItems.map(
        (cartItem) => cartItem.info.owner
      )[0];

      if (!ownerIdOfItemsAlreadyInCart.equals(newlyAddedProductOwnerId)) {
        customer.cart.cartItems = [];
      }

      await customer.save();
    }

    await Customer.findByIdAndUpdate(
      customerId,

      {
        $push: {
          "cart.cartItems": {
            info: productId,
            count: 1,
            price: newlyAddedProduct.price,
          },
        },
      },

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
      cartItem.info._id.equals(productId)
    );

    if (product) {
      product.count = count;

      product.price = product.info.price * count;
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
    await Customer.findByIdAndUpdate(
      customerId,

      { $pull: { "cart.cartItems": { info: productId } } },

      { new: true }
    );

    return res.json({ message: "Product removed from cart." });
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
      path: "cart.cartItems.info",
      select: "title price owner",
    });

    const cartItems = customer.cart.cartItems;

    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].info.price * cartItems[i].count;

      //   totalPrice += cartItems[i].price
    }

    res.json({ cartItems, totalPrice });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const clearCartItems = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate(
      "cart.cartItems.info"
    );

    customer.cart.cartItems = [];

    await customer.save();

    return res.json({ message: "Cart cleared" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const placeAnOrder = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate(
      "cart.cartItems.info"
    );

    const cartItems: CartItem[] = customer.cart.cartItems;

    const order = await Order.create({
      items: cartItems,
      customerId,
      creativeId: cartItems[0].info.owner,
      status: "pending",
      totalPrice: customer.cart.totalPrice,
    });

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

  if (customerId !== order.customerId) {
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

  if (customerId !== order.customerId) {
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
  clearCartItems,
  updateCartItemCount,
  placeAnOrder,
  cancelAnOrder,
  getOrders,
  confirmAnOrder,
};
