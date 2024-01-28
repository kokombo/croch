import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const OrderSchema = new Schema(
  {
    items: [
      {
        type: Types.ObjectId,
        ref: "Product",
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
  },
  { timestamps: true }
);

export = models.Order || model("Order", OrderSchema);
