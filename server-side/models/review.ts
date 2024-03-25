import mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const ReviewSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    to: {
      type: Schema.Types.ObjectId,
      ref: "Creative",
      required: true,
    },

    forOrder: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

export = models.Review || model("Review", ReviewSchema);
