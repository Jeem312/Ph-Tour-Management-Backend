import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";

const credentialsLogin= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  
const loginInfo = await AuthServices.credentialsLogin(req.body);

  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Users log in successfully",
    data: loginInfo,
 
  })
});

export const AuthControllers = {
    credentialsLogin
}