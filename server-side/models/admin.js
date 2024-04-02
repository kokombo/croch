"use strict";
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const AdminSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });
module.exports = models.Admin || model("Admin", AdminSchema);
