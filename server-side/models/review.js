"use strict";
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const ReviewSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
}, { timestamps: true });
module.exports = models.Review || model("Review", ReviewSchema);
