import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    productAvailability: {
      type: String,
      enum: ["available", "pre-order"],
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productDescription: {
      type: String,
      required: true,
    },

    productGender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },

    productTag: {
      type: String,
      enum: [],
      required: true,
    },

    productPhotos: {
      type: Array,
      default: [],
      required: true,
    },

    availableColors: {
      type: Array,
      enum: ["red", "green", "yellow", "orange", "purple"],
    },

    availableSizes: {
      type: Array,
      enum: ["small", "medium", "large", "extra-large"],
    },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
