import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;
import bcrypt = require("bcrypt");
import crypto = require("crypto");

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
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    accountDisabled: {
      type: Boolean,
      default: false,
    },

    enableEmailNotification: {
      type: Boolean,
      default: false,
    },

    notifications: [{ type: Types.ObjectId, ref: "Notification" }],

    accessToken: String,

    refreshToken: String,

    emailVerificationToken: String,

    emailVerificationTokenExpiresAt: Date,

    passwordResetToken: String,

    passwordResetTokenExpiresAt: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export = models.User || model("User", UserSchema);
