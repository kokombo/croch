import { Schema, model } from "mongoose";

const CartSchema = new Schema({}, { timestamps: true });

module.exports = model("Cart", CartSchema);
