import mongoose = require("mongoose");
const { Schema, model, models, Types } = mongoose;

const NotificationSchema = new Schema(
  {
    message: String,

    receiver: [{ type: Types.ObjectId, ref: "User" }],
  },

  { timestamps: true }
);

export = models.Notification || model("Notification", NotificationSchema);
