/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { envConfig } from "../config/env"
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (err:any, req: Request, res: Response, next:NextFunction) => {

    let statusCode = 500;
    let message =  `Something went wrong ${err.message}`;
    
if(err instanceof AppError){
  statusCode = err.statusCode;
  message = err.message
  
}
else if (err instanceof Error) {
  statusCode = 500;
  message = err.message;
  
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: envConfig.NODE_ENV === "development" ? err.stack : undefined
  });
}