import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const CustomerSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    auto: true,
  },

  carts: {
    type: Map,
    of: {
      cartItems: [
        {
          info: { type: Schema.Types.ObjectId, ref: "Product" },

          title: String,

          size: String,

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

  wishLists: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export = models.Customer || model("Customer", CustomerSchema);
