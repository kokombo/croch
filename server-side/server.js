"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
require("dotenv").config();
const connectToDatabase_1 = __importDefault(require("./configurations/connectToDatabase"));
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const notificationRouter = require("./routes/notification");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const tagRouter = require("./routes/tag");
const creativeRouter = require("./routes/creative");
const customerRouter = require("./routes/customer");
const cartRouter = require("./routes/cart");
const reviewRouter = require("./routes/review");
const helmet_1 = __importDefault(require("helmet"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? ["https://croch.vercel.app", "https://croch.onrender.com"]
        : "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
}));
// app.use(limiter(1000 * 60 * 60, 20));
app.use((0, helmet_1.default)());
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
const Start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectToDatabase_1.default)(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`app listening in port ${port}`);
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
Start();
