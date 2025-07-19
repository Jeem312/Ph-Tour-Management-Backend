import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...authRoles:string[])=>  async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const accessToken = req.headers.authorization;
// console.log( process.env.JWT_ACCESS_SECRET )
            if (!accessToken){
                throw new AppError(403,"NO Token Received")
            }
            const verifiedToken =verifyToken(accessToken,envConfig.JWT_ACCESS_SECRET)as JwtPayload
            // console.log("verify",envConfig.JWT_ACCESS_SECRET)
              if(!verifiedToken){
                throw new AppError(403,"You are not authorized")

              }

        if (
            (!authRoles.includes(verifiedToken.role) )){
            throw new AppError(403, "you are not permitted");
        }
            // console.log(verifiedToken);

            req.user = verifiedToken;

            next()
        } catch (error) {
            next(error)
            
        }
    }