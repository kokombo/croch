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
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const http_status_codes_1 = require("http-status-codes");
const Product = require("../models/product");
const authorizeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = yield User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id);
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: "Session expired!. You are not currently logged in.",
                });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "You are not authorized." });
        }
    }
    else {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Invalid authorization." });
    }
});
const isCreative = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: creativeId } = req.user;
    const user = yield User.findById(creativeId);
    if (user.role !== "creative") {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "You are not authorized to perform action." });
    }
    else {
        next();
    }
});
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const user = yield User.findOne({ email });
    if (user.role !== "admin") {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "You are not authorized to perform action." });
    }
    else {
        next();
    }
});
const isProductOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const { productId } = req.query;
    const product = yield Product.findById(productId);
    if (!product) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ message: "No product found." });
    }
    if (!product.owner.equals(userId)) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "You are not authorized to perform action." });
    }
    else {
        next();
    }
});
module.exports = { authorizeUser, isCreative, isProductOwner, isAdmin };
