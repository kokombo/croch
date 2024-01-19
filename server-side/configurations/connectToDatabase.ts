import mongoose from "mongoose";

export const connectToDatabase = (url: string) => {
  return mongoose.connect(url, {
    dbName: "croch",
  });
};
