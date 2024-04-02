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
const Creative = require("../models/creative");
const Customer = require("../models/customer");
const http_status_codes_1 = require("http-status-codes");
const validateId = require("../utilities/validateId");
const generateAccessToken = require("../utilities/generateAccessToken");
const generateRefreshToken = require("../utilities/generateRefreshToken");
const createAdminAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Please provide all necessary credentials." });
    }
    const refinedEmail = email.toLowerCase();
    try {
        const adminExists = yield User.findOne({ email: refinedEmail });
        if (adminExists) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Account already exists." });
        }
        const admin = yield User.create(Object.assign(Object.assign({}, req.body), { email: refinedEmail, role: "admin" }));
        return res.json(admin);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const adminSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!email || !password) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Provide your login credentials." });
    }
    const refinedEmail = email.toLowerCase();
    try {
        const user = yield User.findOne({ email: refinedEmail });
        if (!user || user.role !== "admin") {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "You are not authorized to perform action" });
        }
        const passwordIsCorrect = yield user.checkPassword(password);
        if (!passwordIsCorrect) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Incorrect password." });
        }
        const refreshToken = generateRefreshToken(user === null || user === void 0 ? void 0 : user._id);
        yield User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { refreshToken }, {
            new: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 60 * 1000,
        });
        const accessToken = generateAccessToken(user === null || user === void 0 ? void 0 : user._id);
        return res.json({
            id: user === null || user === void 0 ? void 0 : user._id,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
            accessToken,
        });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const blockAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    validateId(userId, res);
    try {
        const user = yield User.findById(userId);
        user.accountDisabled = true;
        yield user.save();
        return res.json({ message: "Account disabled." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const unblockAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    validateId(userId, res);
    try {
        const user = yield User.findById(userId);
        user.accountDisabled = false;
        yield user.save();
        return res.json({ message: "Account enabled." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        return res.json(users);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield Customer.find();
        return res.json(customers);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getAllCreatives = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatives = yield Creative.find();
        return res.json(creatives);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCreative = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creativeId = req.query.creativeId;
    validateId(creativeId, res);
    try {
        const creative = yield Creative.findById(creativeId);
        if (!creative) {
            return res
                .json(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Creative not found." });
        }
        return res.json(creative);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.query.customerId;
    validateId(customerId, res);
    try {
        const customer = yield Customer.findById(customerId);
        if (!customer) {
            return res
                .json(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Customer not found." });
        }
        return res.json(customer);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const giveSuperCreativeTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { creativeId } = req.body;
    validateId(creativeId, res);
    try {
        const creative = yield Creative.findById(creativeId);
        creative.superCreative = true;
        yield creative.save();
        return res.json({ message: "Super creative tag given successfully." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    blockAUser,
    unblockAUser,
    getAllCustomers,
    getAllCreatives,
    getAllUsers,
    getCreative,
    getCustomer,
    giveSuperCreativeTag,
    adminSignIn,
    createAdminAccount,
};
