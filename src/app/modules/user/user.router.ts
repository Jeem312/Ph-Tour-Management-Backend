import {  NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middleWares/validatedRequest";
import AppError from "../../errorHelpers/AppError";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envConfig } from "../../config/env";


const router = Router();

const checkAuth = (...authRoles:string[])=>  async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken){
                throw new AppError(403,"NO Token Received")
            }
            const verifiedToken =verifyToken(accessToken,envConfig.JWT_ACCESS_SECRET)
              if(!verifiedToken){
                throw new AppError(403,"You are not authorized")

              }

        if (
            (verifiedToken as JwtPayload).role !== Role.ADMIN ) {
            throw new AppError(403, "you are not permitted");
        }
            console.log(verifiedToken);
            next()
        } catch (error) {
            next(error)
            
        }
    }
    
    

router.post("/register", 
    validateRequest(createUserZodSchema),
     UserController.createUser);

router.get("/all-users",
 checkAuth("ADMIN","SUPER_ADMIN"),  UserController.getAllUsers);

export const userRouter = router;