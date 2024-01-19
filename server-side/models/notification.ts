import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({}, { timestamps: true });

module.exports = model("Notification", NotificationSchema);
