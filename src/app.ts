/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response} from "express";
import cors from "cors";


import { router } from "./app/router/router";

import { globalErrorHandler } from "./app/middleWares/globalErrorHandler";
import { notFoundHandler } from "./app/middleWares/notFound";
const app = express();
 
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