import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const CreativeSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      ref: "User",
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
  },

  { timestamps: true }
);

export = models.Creative || model("Creative", CreativeSchema);
