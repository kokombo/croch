import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const OrderSchema = new Schema(
  {
    item: {
      type: Types.ObjectId,
      ref: "Product",
    },

    size: {
      type: String,
    },

    customerId: {
      type: Types.ObjectId,
      ref: "Customer",
    },

    creativeId: {
      type: Types.ObjectId,
      ref: "Creative",
    },

    status: {
      type: String,
      enum: ["pending", "fulfilled", "cancelled"],
    },
  },
  { timestamps: true }
);

export = models.Order || model("Order", OrderSchema);
