import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const OrderSchema = new Schema(
  {
    items: [
      {
        info: { type: Types.ObjectId, ref: "Product" },

        title: String,

        thumbNail: String,

        cummulativePrice: Number,
      },
    ],

    customerId: {
      type: Types.ObjectId,
      ref: "Customer",
    },

    creativeId: {
      type: Types.ObjectId,
      ref: "Creative",
    },

    status: {
      type: String, //pending, fulfilled, cancelled
    },

    expectedDeliveryTime: Number,

    totalPrice: Number,

    totalPriceAfterDiscount: Number,
  },

  { timestamps: true }
);

export = models.Order || model("Order", OrderSchema);
