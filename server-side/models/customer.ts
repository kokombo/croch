import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const CustomerSchema = new Schema({
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

          title: String,

          thumbNail: String,

          cummulativePrice: Number,

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

  wishLists: [{ type: Types.ObjectId, ref: "Product" }],
});

export = models.Customer || model("Customer", CustomerSchema);
