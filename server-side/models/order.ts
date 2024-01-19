import { Schema, model, Types } from "mongoose";

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

module.exports = model("Order", OrderSchema);
