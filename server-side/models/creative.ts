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

    orders: {
      pendingOrders: [
        {
          order: {
            type: Types.ObjectId,
            ref: "Order",
          },
        },
      ],

      fulfilledOrders: [
        {
          order: {
            type: Types.ObjectId,
            ref: "Order",
          },
        },
      ],

      cancelledOrders: [
        {
          order: {
            type: Types.ObjectId,
            ref: "Order",
          },
        },
      ],
    },

    isAvailable: {
      type: Boolean,
      default: true,
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

    products: [{ type: Types.ObjectId, ref: "Product" }],
  },

  { timestamps: true }
);

export = models.Creative || model("Creative", CreativeSchema);
