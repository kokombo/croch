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
const Notification = require("../models/notification");
const User = require("../models/user");
const validateId = require("../utilities/validateId");
const http_status_codes_1 = require("http-status-codes");
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message: notificationMessage, receiver: userId } = req.body;
    validateId(userId, res);
    try {
        const notification = yield Notification.create({
            message: notificationMessage,
            receiver: userId,
        });
        yield User.findByIdAndUpdate(userId, {
            $push: {
                notifications: notification._id,
            },
        }, { new: true });
        return res.json({ message: "Notification created." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    try {
        const user = yield User.findById(userId).populate("notifications");
        const notifications = user.notifications;
        return res.json(notifications);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId } = req.body;
    const { _id: userId } = req.user;
    validateId(notificationId, res);
    try {
        yield User.findByIdAndUpdate(userId, {
            $pull: {
                notifications: notificationId,
            },
        }, { new: true });
        return res.json({ message: "Notification removed." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = { createNotification, deleteNotification, getNotifications };
