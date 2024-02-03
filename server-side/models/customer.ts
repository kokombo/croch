import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const CustomerSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      ref: "User",
    },

    carts: {
      type: Map,
      of: {
        cartItems: [
          {
            info: { type: Types.ObjectId, ref: "Product" },

            price: Number,

            count: Number,
          },
        ],

        totalPrice: {
          type: Number,
        },

        totalPriceAfterDiscount: {
          type: Number,
        },
      },
    },
  },

  { timestamps: true }
);

export = models.Customer || model("Customer", CustomerSchema);
