"use strict";
const mongoose = require("mongoose");
/**
 *
 * @param {string} id
 * @returns true if id is valid and false if otherise.
 */
const validateId = (id, res) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        return res.status(400).json({ message: "Invalid request" });
    }
};
module.exports = validateId;
