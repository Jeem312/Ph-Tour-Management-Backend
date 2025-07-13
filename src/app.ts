import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./app/modules/user/user.router";
const app = express();
 
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Tour Management System API"
  })
});

export default app;