/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envConfig } from "../config/env";

 type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req,res,next)).catch((err: any) => {
       if (envConfig.NODE_ENV === "development") {
          console.error("Error:", err);
        }
        next(err);
})
}