import mongoose = require("mongoose");

const validateId = (id: string) => {
  const IdIsValid = mongoose.Types.ObjectId.isValid(id);

  if (!IdIsValid) {
    return "Invalid id";
  }
};

export = validateId;
