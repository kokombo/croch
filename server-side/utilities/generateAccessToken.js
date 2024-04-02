"use strict";
const jwt = require("jsonwebtoken");
/**
 * Generates access token
 * @param {string} id
 * @returns access token
 */
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_LIFE_TIME,
    });
};
module.exports = generateAccessToken;
