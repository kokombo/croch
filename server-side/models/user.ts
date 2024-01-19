import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
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

    role: {
      type: String,
      enum: ["customer", "creative"],
      required: true,
    },

    userBlocked: {
      type: Boolean,
      default: false,
    },

    enableEmailNotification: {
      type: Boolean,
      default: false,
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

module.exports = model("User", UserSchema);
