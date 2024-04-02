import mongoose = require("mongoose");

const connectToDatabase = (url: string) => {
  return mongoose.connect(url);
};

export = connectToDatabase;
