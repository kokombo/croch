import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const CreativeSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      auto: true,
    },

    brandName: {
      type: String,
    },

    brandLogo: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true, //Available to take orders
    },

    rating: {
      type: Number,
      default: 0,
    },

    superCreative: {
      type: Boolean,
      default: false,
    },

    yearsOfExperience: {
      type: Number,
    },

    personalDescription: {
      type: String,
    },

    funFacts: {
      type: Array(String),
    },

    accountSetupDone: {
      type: Boolean,
      default: false,
    },

    identityVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export = models.Creative || model("Creative", CreativeSchema);
