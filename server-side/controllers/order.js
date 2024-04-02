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
const Order = require("../models/order");
const Customer = require("../models/customer");
const http_status_codes_1 = require("http-status-codes");
const validateId = require("../utilities/validateId");
const placeAnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: customerId } = req.user;
    const { creativeId: creativeIdFromClient } = req.body;
    validateId(creativeIdFromClient, res);
    validateId(customerId, res);
    try {
        const customer = yield Customer.findById(customerId).populate({
            path: `carts.${creativeIdFromClient}.cartItems.info`,
            select: "owner",
        });
        const carts = customer.carts;
        let order;
        for (const [creativeId, cart] of carts.entries()) {
            if (Boolean(creativeId === creativeIdFromClient)) {
                const cartItems = cart.cartItems;
                order = yield Order.create({
                    items: cartItems,
                    customerId,
                    creativeId: cartItems[0].info.owner,
                    status: "pending",
                    totalPrice: cart.totalPrice,
                });
                carts.delete(creativeIdFromClient);
            }
        }
        yield customer.save();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ order, message: "Order successfully placed." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const cancelAnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    const { _id: customerId } = req.user;
    validateId(orderId, res);
    try {
        const order = yield Order.findById(orderId);
        if (!order) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "No order found!" });
        }
        if (customerId.toString() !== order.customerId.toString()) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "You cannot perform action." });
        }
        order.status = "cancelled";
        yield order.save();
        return res.json({ message: "Order cancelled." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const confirmAnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    const { _id: customerId } = req.user;
    validateId(orderId, res);
    try {
        const order = yield Order.findById(orderId);
        if (!order) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "No order found!" });
        }
        if (customerId.toString() !== order.customerId.toString()) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "You cannot perform action." });
        }
        order.status = "fulfilled";
        yield order.save();
        return res.json({ message: "You have confirmed this order as complete." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCustomerOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: customerId } = req.user;
    const status = req.query.status;
    try {
        const orders = yield Order.find({ customerId, status });
        return res.json(orders);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.query.orderId;
    validateId(orderId, res);
    try {
        const order = yield Order.findById(orderId);
        if (!order) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Order not found." });
        }
        return res.json(order);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    getOrder,
    placeAnOrder,
    cancelAnOrder,
    getCustomerOrders,
    confirmAnOrder,
};
