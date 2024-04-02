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
const validateId = require("../utilities/validateId");
const http_status_codes_1 = require("http-status-codes");
const Product = require("../models/product");
const addAndRemoveWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const { _id: customerId } = req.user;
    validateId(productId, res);
    try {
        const customer = yield Customer.findById(customerId).populate("wishLists");
        const wishlists = customer.wishLists;
        const alreadyInWishlists = Boolean(wishlists.find((wishList) => wishList._id.toString() === productId.toString()));
        if (alreadyInWishlists) {
            yield Customer.findByIdAndUpdate(customerId, {
                $pull: { wishLists: productId },
            });
            return res.json({ message: "Product removed from wishlist." });
        }
        else {
            yield Customer.findByIdAndUpdate(customerId, {
                $push: { wishLists: productId },
            });
            return res.json({ message: "Product added to wishlist." });
        }
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getWishlists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: customerId } = req.user;
    try {
        const customer = yield Customer.findById(customerId).populate({
            path: "wishLists",
            populate: {
                path: "owner",
                select: "_id firstName lastName profileImage",
            },
        });
        const wishlists = customer.wishLists;
        return res.json(wishlists);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCreativeAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creativeId = req.query.creativeId;
    validateId(creativeId, res);
    try {
        const products = yield Product.find({ owner: creativeId });
        return res.json(products);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    addAndRemoveWishlist,
    getWishlists,
    getCreativeAllProducts,
};
