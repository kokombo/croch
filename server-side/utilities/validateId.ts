import type { Response } from "express";
import mongoose = require("mongoose");

/**
 *
 * @param {string} id
 * @returns true if id is valid and false if otherise.
 */

const validateId = (id: string, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    return res.status(400).json({ message: "Invalid request" });
  }
};

export = validateId;
