import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

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

export = models.Cart || model("Cart", CartSchema);
