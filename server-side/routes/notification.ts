import express = require("express");
const router = express.Router();
import notificationController = require("../controllers/notification");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;

const { createNotification, getNotifications, deleteNotification } =
  notificationController;

router.post("/createNotification", authorizeUser, createNotification);
router.get("/getNotifications", authorizeUser, getNotifications);
router.delete("/deleteNotification", authorizeUser, deleteNotification);

export = router;
