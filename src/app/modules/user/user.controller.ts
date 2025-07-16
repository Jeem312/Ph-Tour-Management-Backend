/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";


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
export const UserController = {
  createUser,
  getAllUsers
};

// route matching -> controller -> service -> model