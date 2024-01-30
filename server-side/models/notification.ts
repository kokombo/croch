import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const NotificationSchema = new Schema(
  {
    message: String,
  },
  { timestamps: true }
);

export = models.Notification || model("Notification", NotificationSchema);
