import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    availability: {
      type: String, // available or pre-order
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    gender: {
      type: String, //male or female or unisex
      required: true,
    },

    tag: {
      type: String,
      required: true,
    },

    photos: {
      type: Array(String),
      default: [],
      required: true,
    },

    colors: {
      type: Array(String),
      enum: ["red", "green", "yellow", "orange", "purple"],
      default: [],
    },

    sizes: {
      type: Array(String),
      enum: ["small", "medium", "large", "extraLarge"],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },

    numberOfReviews: {
      type: Number,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    nationwideDelivery: {
      type: Boolean,
      required: true,
    },

    primaryLocation: {
      name: {
        type: String,
        required: true,
      },

      minDeliveryDays: {
        type: Number,
        required: true,
      },

      maxDeliveryDays: {
        type: Number,
        required: true,
      },
    },

    otherLocations: {
      minDeliveryDays: {
        type: Number,
      },

      maxDeliveryDays: {
        type: Number,
      },
    },

    flagged: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export = models.Product || model("Product", ProductSchema);
