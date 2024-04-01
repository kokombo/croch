import express = require("express");
const app = express();
require("dotenv").config();
import connectToDatabase from "./configurations/connectToDatabase";
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
import reviewRouter = require("./routes/review");
import limiter = require("./middlewares/rateLimiter");
import helmet from "helmet";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://croch.vercel.app", "https://croch.onrender.com"]
        : "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// app.use(limiter(1000 * 60 * 60, 20));
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
app.use("/api/v1/review", reviewRouter);

const port = process.env.PORT || 5000;

const Start = async () => {
  try {
    const res = await connectToDatabase(
      process.env.MONGODB_URI as string
    ).catch((error) => console.log(error));

    app.listen(port, () => {
      console.log(`app listening in port ${port}`);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

Start();
