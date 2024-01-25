import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const AdminSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    notifications: [{ type: Types.ObjectId, ref: "Notification" }],

    accessToken: {
      type: String,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export = models.Admin || model("Admin", AdminSchema);
