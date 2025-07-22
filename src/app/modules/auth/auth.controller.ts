import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config/env";
import passport from "passport";

const credentialsLogin= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  
const loginInfo = await AuthServices.credentialsLogin(req.body);

 
// passport.authenticate()

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const resetPassword= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  const decodedToken = req.user;

  const newPassword = req.body.password;
     const oldPassword = req.body.oldPassword;

 // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
 const newResetPassword = await AuthServices.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload )

  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: null,
 
  })
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const googlecallbackController= catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
 const user = req.user;
  let redirectTo = req.query.state? req.query.state as string : "";

  if(redirectTo.startsWith("/")){
    redirectTo = redirectTo.slice(1);
  }

 if (!user) {
  throw new AppError(httpStatus.NOT_FOUND,"user not found")
  
 }

 const tokenInfo = createUserTokens(user);

 setAuthCookie(res,tokenInfo)
  res.redirect(`${envConfig.FRONTEND_URL}/${redirectTo}`); // Redirect to the frontend URL with the path
 
});

export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword,
    googlecallbackController
  }