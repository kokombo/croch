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
const Product = require("../models/product");
const http_status_codes_1 = require("http-status-codes");
const validateId = require("../utilities/validateId");
const sendEmail = require("../utilities/sendEmail");
const crypto = require("crypto");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password || !role) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Please provide all necessary credentials." });
    }
    const refinedEmail = email.toLowerCase();
    try {
        const userExists = yield User.findOne({ email: refinedEmail });
        if (userExists) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "User with this email already exists. Please sign in.",
            });
        }
        const user = yield User.create(Object.assign(Object.assign({}, req.body), { email: refinedEmail }));
        if (role === "customer") {
            yield Customer.create({ _id: user._id });
        }
        if (role === "creative") {
            yield Creative.create({ _id: user._id });
        }
        return res.json(user);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = yield User.findById(_id);
        const passwordIsCorrect = yield user.checkPassword(oldPassword);
        if (!passwordIsCorrect) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Incorrect old password. You cannot change your password at this time.",
            });
        }
        if (!newPassword) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid new password",
            });
        }
        user.password = newPassword;
        yield user.save();
        return res.json({ message: "Password updated." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const sendForgotPasswordToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User.findOne({ email });
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User with this email not found." });
        }
        const token = yield user.generatePasswordResetToken();
        const data = {
            from: "Croch",
            to: email,
            subject: "Reset Your Password",
            text: "Follow this link to reset your password.",
            html: `Follow this link to reset your password <a href = "${process.env.BASE_URL}/auth/reset-password?token=${token}">Click Here To Verify</a>.`,
        };
        yield sendEmail(data);
        return res.json({ message: "Password reset sent to your email." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const { password } = req.body;
    try {
        const user = yield User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpries: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid password reset link. Link must have expired.",
            });
        }
        user.password = password;
        yield user.save();
        return res.json({
            message: "Password changed successfully. You can continue to login.",
        });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const sendEmailVerificationToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User.findOne({ email });
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User with this email not found." });
        }
        const token = yield user.generateEmailVerificationToken();
        const data = {
            from: "Croch",
            to: email,
            subject: "Verify Your Email Address",
            text: "Verify Your Email Addresss",
            html: `Follow this link to verify your email address <a href = "${process.env.BASE_URL}/auth/verifyEmail?token=${token}">Click Here To Verify</a>.`,
        };
        yield sendEmail(data);
        return res.json({ message: "Email verification link sent successfully." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    try {
        const user = yield User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationTokenExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid email verification link. Link must have expired.",
            });
        }
        user.emailVerified = true;
        yield user.save();
        return res.json({
            message: "Email verified successfully.",
        });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const deleteMyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const { password } = req.body;
    validateId(userId, res);
    try {
        const user = yield User.findById(userId);
        const passwordIsCorrect = yield user.checkPassword(password);
        if (!passwordIsCorrect) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid password. You cannot perform action." });
        }
        if (user.role === "customer") {
            yield Customer.findByIdAndDelete(userId);
        }
        else {
            yield Creative.findByIdAndDelete(userId);
            yield Product.findOneAndDelete({ owner: userId });
        }
        yield User.findByIdAndDelete(userId);
        return res.json({ messaage: "Account deleted." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    signUp,
    updatePassword,
    resetPassword,
    sendForgotPasswordToken,
    verifyEmail,
    sendEmailVerificationToken,
    deleteMyAccount,
};
