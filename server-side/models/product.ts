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
      name: String,

      minDeliveryDays: Number,

      maxDeliveryDays: Number,
    },

    otherLocations: {
      minDeliveryDays: Number,

      maxDeliveryDays: Number,
    },
  },

  { timestamps: true }
);

export = models.Product || model("Product", ProductSchema);
