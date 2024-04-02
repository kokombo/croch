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
const validateId = require("../utilities/validateId");
const Review = require("../models/review");
const Order = require("../models/order");
const http_status_codes_1 = require("http-status-codes");
const giveReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, rating, to, forOrder } = req.body;
    const { _id: from } = req.user;
    if (!message || !rating || !to || !forOrder) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid reviews data." });
    }
    validateId(to, res);
    validateId(forOrder, res);
    try {
        const order = yield Order.findById(forOrder);
        if (!order) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Invalid request." });
        }
        if (order.customerId.toString() !== from) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "You are not authorized to perform action." });
        }
        const newReview = yield Review.create({
            from,
            to,
            forOrder,
            message,
            rating,
        });
        return res.json(newReview);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCreativeReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creativeId = req.query.creativeId;
    validateId(creativeId, res);
    try {
        const reviews = yield Review.find({ to: creativeId })
            .populate({
            path: "from",
            select: "firstName, lastName, profileImage",
        })
            .populate({ path: "to", select: "brandName" });
        return res.json(reviews);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCustomerPostedReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: customerId } = req.user;
    try {
        const reviews = yield Review.find({ from: customerId });
        return res.json(reviews);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = { giveReview, getCreativeReviews, getCustomerPostedReviews };
