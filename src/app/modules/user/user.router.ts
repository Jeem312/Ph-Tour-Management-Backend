import {  NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middleWares/validatedRequest";

import { Role } from "./user.interface";

import { } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { verifyToken } from "../../utils/jwt";
import { checkAuth } from "../../middleWares/checkAuth";

const router = Router();



    

router.post("/register", 
    validateRequest(createUserZodSchema),
     UserController.createUser);

router.get("/all-users",
 checkAuth(Role.ADMIN,Role.SUPER_ADMIN),  UserController.getAllUsers);
 router.patch("/:id", checkAuth(...Object.values(Role)),UserController.updateUser)

export const userRouter = router;