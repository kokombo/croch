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
const generateAccessToken = require("../utilities/generateAccessToken");
const generateRefreshToken = require("../utilities/generateRefreshToken");
const http_status_codes_1 = require("http-status-codes");
const jwt = require("jsonwebtoken");
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!email || !password) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Provide your login credentials." });
    }
    const refinedEmail = email.toLowerCase();
    try {
        const user = yield User.findOne({ email: refinedEmail });
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Incorrect email or password." });
        }
        const passwordIsCorrect = yield user.checkPassword(password);
        if (!passwordIsCorrect) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid password. Please check and try again." });
        }
        const refreshToken = generateRefreshToken(user === null || user === void 0 ? void 0 : user._id);
        yield User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { refreshToken }, {
            new: true,
        });
        res.cookie("crochRefreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const accessToken = generateAccessToken(user === null || user === void 0 ? void 0 : user._id);
        return res.json({
            id: user === null || user === void 0 ? void 0 : user._id,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
            accessToken,
            accountDisabled: user === null || user === void 0 ? void 0 : user.accountDisabled,
            emailVerified: user === null || user === void 0 ? void 0 : user.emailVerified,
        });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!cookies.crochRefreshToken) {
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .json({ message: "No refreshToken found." });
    }
    const refreshToken = cookies.refreshToken;
    try {
        const user = yield User.findOne({ refreshToken });
        if (!user) {
            return res
                .json(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User with this refreshToken not found." });
        }
        jwt.verify(refreshToken, process.env.JWT_SECRET, { complete: true }, (error, decoded) => {
            if (error || (decoded === null || decoded === void 0 ? void 0 : decoded.id) !== user._id) {
                return res
                    .status(http_status_codes_1.StatusCodes.FORBIDDEN)
                    .json({ message: "There is an issue with the refreshToken." });
            }
            else {
                const accessToken = generateAccessToken(user._id);
                user.accessToken = accessToken;
            }
        });
        yield user.save();
        return res.json(user);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!cookies.refreshToken) {
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .json({ message: "Cookies not found." });
    }
    const refreshToken = cookies.refreshToken;
    try {
        const user = yield User.findOne({ refreshToken });
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.FORBIDDEN)
                .json({ message: "You cannot perform action." });
        }
        yield User.findOneAndUpdate(refreshToken, { accessToken: "", refreshToken: "" }, { new: true });
        res.clearCookie("crochRefreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.json({ message: "You have logged out successfully" });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    signIn,
    handleRefreshToken,
    logOut,
};
