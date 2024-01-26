import express = require("express");
const app = express();
require("dotenv").config();
import connectToDatabase = require("./configurations/connectToDatabase");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import authRouter = require("./routes/auth");
import adminRouter = require("./routes/admin");
import notificationRouter = require("./routes/notification");
import orderRouter = require("./routes/order");
import productRouter = require("./routes/product");
import tagRouter = require("./routes/tag");
import creativeRouter = require("./routes/creative");
import customerRouter = require("./routes/customer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/creative", creativeRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/customer", customerRouter);

const port = 5000;

const Start = async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URI as string);

    app.listen(port, () => {
      console.log(`app listening in port ${port}`);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

Start();
