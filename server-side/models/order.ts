import mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const OrderSchema = new Schema(
  {
    items: [
      {
        info: { type: Schema.Types.ObjectId, ref: "Product" },

        title: String,

        thumbNail: String,

        cummulativePrice: Number,

        size: String,

        count: Number,
      },
    ],

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },

    creativeId: {
      type: Schema.Types.ObjectId,
      ref: "Creative",
    },

    brandName: {
      type: String,
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
