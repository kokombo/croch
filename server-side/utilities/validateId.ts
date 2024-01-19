import mongoose from "mongoose";

export const validateId = (id: string) => {
  const IdIsValid = mongoose.Types.ObjectId.isValid(id);

  if (!IdIsValid) {
    throw new Error("Invalid id");
  }
};
