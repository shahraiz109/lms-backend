require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleWare } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticRoute from "./routes/analytics.route";
import layoutRoute from "./routes/layout.route";

// body parser

app.use(express.json({ limit: "50mb" }));

// cookie parser

app.use(cookieParser());

// cors=> cross origin resource sharing

app.use(
  cors({
    origin:['http://localhost:3000'],
    credentials: true,
  })
);

// routes

app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRoute,
  analyticRoute,
  layoutRoute
);

// testing api

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working perfectly",
  });
});

// unknown route

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 400;
  next(err);
});

app.use(ErrorMiddleWare);
