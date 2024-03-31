import { NextFunction, Request, Response } from "express";
import mongoose = require("mongoose");

export const validateMongoId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => {
  const IdIsValid = mongoose.Types.ObjectId.isValid(id);

  if (!IdIsValid) {
    return res.status(400);
  } else {
    next();
  }
};
