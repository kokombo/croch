"use strict";
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    availability: {
        type: String, // available or pre-order
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    gender: {
        type: String, //male or female or unisex
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    photos: {
        type: Array(String),
        default: [],
        required: true,
    },
    colors: {
        type: Array(String),
        enum: ["red", "green", "yellow", "orange", "purple"],
        default: [],
    },
    sizes: {
        type: Array(String),
        enum: ["small", "medium", "large", "extraLarge"],
        default: [],
    },
    rating: {
        type: Number,
    },
    numberOfReviews: {
        type: Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nationwideDelivery: {
        type: Boolean,
        required: true,
    },
    primaryLocation: {
        name: {
            type: String,
        },
        minDeliveryDays: {
            type: Number,
        },
        maxDeliveryDays: {
            type: Number,
        },
    },
    otherLocations: {
        minDeliveryDays: {
            type: Number,
        },
        maxDeliveryDays: {
            type: Number,
        },
    },
}, { timestamps: true });
module.exports = models.Product || model("Product", ProductSchema);
