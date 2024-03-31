import { Response } from "express";
import mongoose = require("mongoose");

/**
 *
 * @param {string} id
 * @returns true if id is valid and false if otherwise.
 */

const validateId = (id: string, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    return res.status(400).json({ message: "INvalid request" });
  }
};

export = validateId;
