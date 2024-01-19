import { Schema, model, Types } from "mongoose";

const CustomerSchema = new Schema(
  {
    customerId: {
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

    cart: [{ type: Types.ObjectId, ref: "Cart" }],
  },
  { timestamps: true }
);

module.exports = model("Customer", CustomerSchema);
