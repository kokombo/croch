import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const CustomerSchema = new Schema(
  {
    _id: {
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

    cart: {
      cartItems: [
        {
          info: { type: Types.ObjectId, ref: "Product" },

          price: Number,

          count: Number,
        },
      ],

      totalPrice: Number,

      totalPriceAfterDiscount: Number,
    },
  },
  { timestamps: true }
);

export = models.Customer || model("Customer", CustomerSchema);
