import jwt = require("jsonwebtoken");

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
};

export = generateAccessToken;
