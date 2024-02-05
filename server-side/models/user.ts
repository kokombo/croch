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
      unique: true,
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

UserSchema.methods.generatePasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetTokenExpiresAt = Date.now() + 60 * 60 * 1000; //Password reset token to expire in one hour.

  return token;
};

UserSchema.methods.generateEmailVerificationToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.emailVerificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; //Password reset token to expire 24 hours.

  return token;
};

export = models.User || model("User", UserSchema);
