"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Customer = require("../models/customer");
const Creative = require("../models/creative");
const validateId = require("../utilities/validateId");
const http_status_codes_1 = require("http-status-codes");
const Product = require("../models/product");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, count, size } = req.body;
    const { _id: customerId } = req.user;
    validateId(productId, res);
    try {
        const newlyAddedProduct = yield Product.findById(productId);
        const productOwnerId = newlyAddedProduct.owner; //or creativeId
        yield Customer.findByIdAndUpdate(customerId, {
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
                [`carts.${productOwnerId}.totalPrice`]: newlyAddedProduct.price * count,
            },
        }, { new: true, upsert: true, setDefaultsOnInsert: true });
        return res.json({ message: "Product added to cart." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updateCartItemCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, count, creativeId: creativeIdFromClient } = req.body;
    const { _id: customerId } = req.user;
    validateId(productId, res);
    validateId(creativeIdFromClient, res);
    try {
        const customer = yield Customer.findById(customerId).populate({
            path: `carts.${creativeIdFromClient}.cartItems.info`,
            select: "price",
        });
        let vendorCart;
        let totalPrice = 0;
        const carts = customer.carts;
        for (const [creativeId, cart] of carts.entries()) {
            if (Boolean(creativeId === creativeIdFromClient)) {
                vendorCart = cart;
                const vendorCartItems = vendorCart.cartItems;
                const product = vendorCartItems.find((cartItem) => cartItem.info._id.toString() === productId);
                if (product) {
                    product.count = count;
                    product.cummulativePrice = product.info.price * count;
                }
                for (let i = 0; i < vendorCartItems.length; i++) {
                    totalPrice += vendorCartItems[i].cummulativePrice; //cummulativePrice is price of each item * count
                }
                vendorCart.totalPrice = totalPrice;
            }
        }
        yield customer.save();
        return res.json({ message: "Count updated." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const { _id: customerId } = req.user;
    validateId(productId, res);
    try {
        const product = yield Product.findById(productId);
        const productOwnerId = product.owner;
        const customer = yield Customer.findByIdAndUpdate(customerId, {
            $pull: {
                [`carts.${productOwnerId}.cartItems`]: {
                    info: productId,
                },
            },
        }, { new: true });
        //Delete the cart if there are no more items in it.
        const carts = customer.carts;
        for (const [creativeId, cart] of carts.entries()) {
            if (Boolean(creativeId === productOwnerId.toString())) {
                const vendorCartItems = cart.cartItems;
                if (vendorCartItems.length < 1) {
                    carts.delete(productOwnerId);
                }
            }
        }
        yield customer.save();
        return res.json({ message: "Product removed from cart." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: customerId } = req.user;
    try {
        const customer = yield Customer.findById(customerId);
        const carts = customer.carts;
        let result = [];
        for (const [creativeId, cart] of carts.entries()) {
            const creative = yield Creative.findById(creativeId);
            result.push({
                creativeId,
                brandName: creative.brandName,
                brandLogo: creative.brandLogo,
            });
        }
        return res.json(result);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { creativeId: creativeIdFromClient } = req.query;
    const { _id: customerId } = req.user;
    validateId(creativeIdFromClient, res);
    try {
        const customer = yield Customer.findById(customerId).populate({
            path: `carts.${creativeIdFromClient}.cartItems.info`,
            select: "_id price owner",
        });
        const carts = customer.carts;
        let totalPrice = 0;
        let vendorCart;
        for (const [creativeId, cart] of carts.entries()) {
            if (Boolean(creativeId === creativeIdFromClient)) {
                vendorCart = cart;
                const vendorCartItems = vendorCart.cartItems;
                for (let i = 0; i < vendorCartItems.length; i++) {
                    totalPrice += vendorCartItems[i].cummulativePrice; //cummulativePrice is price of each item * count
                }
                vendorCart.totalPrice = totalPrice;
            }
        }
        yield customer.save();
        return res.json(vendorCart);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cart: creativeIdFromClient } = req.query;
    const { _id: customerId } = req.user;
    validateId(creativeIdFromClient, res);
    try {
        const customer = yield Customer.findById(customerId);
        if (customer.carts.has(creativeIdFromClient)) {
            customer.carts.delete(creativeIdFromClient);
        }
        yield customer.save();
        return res.json({ message: "Cart removed!" });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    addToCart,
    removeFromCart,
    getCartItems,
    updateCartItemCount,
    getCarts,
    deleteCart,
};
