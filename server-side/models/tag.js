"use strict";
const mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;
const TagSchema = new Schema({
    label: {
        type: String,
    },
    icon: {
        type: String,
    },
}, { timestamps: true });
module.exports = models.Tag || model("Tag", TagSchema);
