import { Response, Request } from "express";
import Notification = require("../models/notification");
import User = require("../models/user");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";

const createNotification = async (req: Request, res: Response) => {
  const { message: notificationMessage, receiver: userId } = req.body;

  validateId(userId, res);

  try {
    const notification = await Notification.create({
      message: notificationMessage,
      receiver: userId,
    });

    await User.findByIdAndUpdate(
      userId,

      {
        $push: {
          notifications: notification._id,
        },
      },

      { new: true }
    );

    return res.json({ message: "Notification created." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getNotifications = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;

  try {
    const user = await User.findById(userId).populate("notifications");

    const notifications = user.notifications;

    return res.json(notifications);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const deleteNotification = async (req: Request, res: Response) => {
  const { notificationId } = req.body;

  const { _id: userId } = req.user;

  validateId(notificationId, res);

  try {
    await User.findByIdAndUpdate(
      userId,

      {
        $pull: {
          notifications: notificationId,
        },
      },

      { new: true }
    );

    return res.json({ message: "Notification removed." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { createNotification, deleteNotification, getNotifications };
