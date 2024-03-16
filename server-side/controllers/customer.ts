import { Request, Response } from "express";
import Customer = require("../models/customer");
import Creative = require("../models/creative");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");
import Order = require("../models/order");

const addToCart = async (req: Request, res: Response) => {
  const { productId, count } = req.body;

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
            title: newlyAddedProduct.title,
            thumbNail: newlyAddedProduct.photos[0],
            count: count,
            cummulativePrice: newlyAddedProduct.price * count,
          },
        },

        $set: {
          [`carts.${creativeId}.totalPrice`]: newlyAddedProduct.price * count,
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

    const carts: Carts = customer.carts;

    for (const [creativeId, cart] of carts.entries()) {
      if (Boolean(creativeId === creativeIdFromClient)) {
        const vendorCart: CartItem[] = cart.cartItems;

        const product = vendorCart.find(
          (cartItem) => cartItem.info._id.toString() === productId
        );

        if (product) {
          product.count = count;

          product.cummulativePrice = product.info.price * count;
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

const addAndRemoveWishlist = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate("wishLists");

    const wishlists: Product[] = customer.wishLists;

    const alreadyInWishlists = Boolean(
      wishlists.find(
        (wishList) => wishList._id.toString() === productId.toString()
      )
    );

    if (alreadyInWishlists) {
      await Customer.findByIdAndUpdate(customerId, {
        $pull: { wishLists: productId },
      });

      return res.json({ message: "Product removed from wishlist." });
    } else {
      await Customer.findByIdAndUpdate(customerId, {
        $push: { wishLists: productId },
      });

      return res.json({ message: "Product added to wishlist." });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getWishlists = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  try {
    const customer = await Customer.findById(customerId).populate({
      path: "wishLists",
      select: "_id owner photos title availability price",
    });

    const wishlists = customer.wishLists;

    return res.json(wishlists);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCreativeAllProducts = async (req: Request, res: Response) => {
  const { creativeId } = req.query;

  validateId(creativeId as string);

  try {
    const products = await Product.find({ owner: creativeId });

    return res.json(products);
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
  addAndRemoveWishlist,
  getWishlists,
  getCreativeAllProducts,
};
