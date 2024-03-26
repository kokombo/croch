import { Request, Response } from "express";
import mongoose = require("mongoose");

/**
 *
 * @param {string} id
 * @returns invalid id if mongo id is not valid.
 */

const validateId = (id: string) => {
  const IdIsValid = mongoose.Types.ObjectId.isValid(id);

  if (!IdIsValid) {
    return false;
  }

  return true;
};

export = validateId;
