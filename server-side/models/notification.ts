import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const NotificationSchema = new Schema(
  {
    message: String,

    receiver: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  { timestamps: true }
);

export = models.Notification || model("Notification", NotificationSchema);
