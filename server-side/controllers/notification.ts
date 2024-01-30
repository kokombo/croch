import { Response, Request } from "express";
import Notification = require("../models/notification");

const createANotification = async (req: Request, res: Response) => {};
const deleteANotification = async (req: Request, res: Response) => {};
const getNotifications = async (req: Request, res: Response) => {};

export = { createANotification, deleteANotification, getNotifications };
