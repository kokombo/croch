import jwt = require("jsonwebtoken");

/**
 *
 * @param {string} id
 * @returns access token
 */

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_LIFE_TIME,
  });
};

export = generateAccessToken;
