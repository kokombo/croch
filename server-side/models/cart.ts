import { Schema, model, Types } from "mongoose";

const CartSchema = new Schema(
  {
    cartItems: [
      {
        cartItem: {
          type: Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("Cart", CartSchema);
