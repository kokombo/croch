import { Schema, model, Types } from "mongoose";

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

module.exports = model("Admin", AdminSchema);
