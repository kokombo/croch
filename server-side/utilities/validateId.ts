import mongoose = require("mongoose");

/**
 *
 * @param {string} id
 * @returns true or false after checking mongo id validity
 */

const validateId = (id: string) => {
  const IdIsValid = mongoose.Types.ObjectId.isValid(id);

  if (!IdIsValid) {
    return "Invalid id";
  }
};

export = validateId;
