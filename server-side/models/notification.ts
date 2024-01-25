import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const NotificationSchema = new Schema({}, { timestamps: true });

export = models.Notification || model("Notification", NotificationSchema);
