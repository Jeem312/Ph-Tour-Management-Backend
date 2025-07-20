import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

const credentialsLogin= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  
const loginInfo = await AuthServices.credentialsLogin(req.body);
 

setAuthCookie(res,loginInfo)

  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Users log in successfully",
    data: loginInfo,
 
  })
});

const getNewAccessToken= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST,'No AccessToken Available')    
  }
const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string);

setAuthCookie(res,tokenInfo)

  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "New Access Token retrive  successfully",
    data: tokenInfo,
 
  })
});

const logOut= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  

res.clearCookie("accessToken",{
  httpOnly:true,
  secure:false,
  sameSite:"lax"
})

res.clearCookie("refreshToken",{
  httpOnly:true,
  secure:false,
  sameSite:"lax"
})
  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "LogOut successfully",
    data: null,
 
  })
});

const resetPassword= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  const decodedToken = req.user;

  const newPassword = req.body.password;
     const oldPassword = req.body.oldPassword;

 const newResetPassword = await AuthServices.resetPassword(oldPassword,newPassword,decodedToken)

  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: null,
 
  })
});
export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword
  }