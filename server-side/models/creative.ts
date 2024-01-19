import { Schema, model, Types } from "mongoose";

const CreativeSchema = new Schema(
  {
    creativeId: {
      type: Types.ObjectId,
      ref: "User",
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

    isCreativeAvailable: {
      type: Boolean,
    },

    superCreative: {
      type: Boolean,
      default: false,
    },

    yearsOfExperience: {
      type: String,
    },

    creativePersonalDescription: {
      type: String,
    },

    creativeFunFacts: {
      type: Array,
    },

    products: [{ type: Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = model("Creative", CreativeSchema);
