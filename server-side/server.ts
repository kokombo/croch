const express = require("express");
const app = express();
import { connectToDatabase } from "./configurations/connectToDatabase";

const port = 5000;

const Start = async () => {
  try {
    await connectToDatabase("url");

    app.listen(port, console.log(`app listening in port ${port}`));
  } catch (error: any) {
    throw new Error(error);
  }
};

Start();
