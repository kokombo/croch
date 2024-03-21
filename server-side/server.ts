import express = require("express");
const app = express();
require("dotenv").config();
import connectToDatabase = require("./configurations/connectToDatabase");
import cookieParser = require("cookie-parser");
import cors = require("cors");
import authRouter = require("./routes/auth");
import userRouter = require("./routes/user");
import adminRouter = require("./routes/admin");
import notificationRouter = require("./routes/notification");
import orderRouter = require("./routes/order");
import productRouter = require("./routes/product");
import tagRouter = require("./routes/tag");
import creativeRouter = require("./routes/creative");
import customerRouter = require("./routes/customer");
import cartRouter = require("./routes/cart");
import limiter = require("./middlewares/rateLimiter");
import helmet from "helmet";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(limiter(1000 * 60 * 60, 10));
app.use(helmet());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/creative", creativeRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/cart", cartRouter);

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
