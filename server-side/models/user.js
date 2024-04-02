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
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    accountDisabled: {
        type: Boolean,
        default: false,
    },
    enableEmailNotification: {
        type: Boolean,
        default: false,
    },
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    accessToken: String,
    refreshToken: String,
    emailVerificationToken: String,
    emailVerificationTokenExpiresAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresAt: Date,
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
        next();
    });
});
UserSchema.methods.checkPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
UserSchema.methods.generatePasswordResetToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = crypto.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        this.passwordResetTokenExpiresAt = Date.now() + 60 * 60 * 1000; //Password reset token to expire in one hour.
        return token;
    });
};
UserSchema.methods.generateEmailVerificationToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = crypto.randomBytes(32).toString("hex");
        this.emailVerificationToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        this.emailVerificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; //Password reset token to expire 24 hours.
        return token;
    });
};
module.exports = models.User || model("User", UserSchema);
