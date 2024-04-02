"use strict";
const mongoose = require("mongoose");
const connectToDatabase = (url) => {
    return mongoose.connect(url, {
        dbName: "Croch",
    });
};
module.exports = connectToDatabase;
