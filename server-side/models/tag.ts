import { Schema, model } from "mongoose";

const TagSchema = new Schema(
  {
    label: {
      type: String,
    },

    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Tag", TagSchema);
