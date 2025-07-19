/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envConfig } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const createUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = await UserService.createUser(req.body);
  //  res.status(httpStatus.CREATED).json({ message: 'User created successfully', user });

  SendResponse(res,{
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user
  })

  } catch (err: any) {
   next(err);
    
  }
};
const getAllUsers = catchAsync(async (req: Request, res: Response,next:NextFunction) => { 
  const result = await UserService.getAllUsers();
  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message: "Users retrieved successfully",
  //   data: users
  // })

  SendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result.data,
    meta: result.meta
  })
});



const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => { 
  const userId = req.params.id;
  // const token = req.headers.authorization;
  // const verifiedToken = verifyToken(token as string,envConfig.JWT_ACCESS_SECRET)as JwtPayload;
  const verifiedToken = req.user;
  const payload = req.body;

  if (!verifiedToken) {
    return SendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Unauthorized: No valid token found",
      data: null,
    });
  }

  const result = await UserService.updateUser(userId, payload, verifiedToken);
  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message: "Users retrieved successfully",
  //   data: users
  // })

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users updated successfully",
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  updateUser
};

// route matching -> controller -> service -> model