/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response} from "express";
import cors from "cors";

import exressSession from 'express-session';
import { router } from "./app/router/router";

import { globalErrorHandler } from "./app/middleWares/globalErrorHandler";
import { notFoundHandler } from "./app/middleWares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport"
import './app/config/passport'
const app = express();

app.use(exressSession(
  {
    secret:"Your secret",
    resave:false,
    saveUninitialized: false
  }
))
app.use(passport.initialize());
app.use(passport.session());
app.use (cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFoundHandler)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Tour Management System API"
  })
});

export default app;