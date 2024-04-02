"use strict";
const jwt = require("jsonwebtoken");
/**
 * Generates refresh token
 * @param {string} id
 * @returns refresh token
 */
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_LIFE_TIME,
    });
};
module.exports = generateRefreshToken;
