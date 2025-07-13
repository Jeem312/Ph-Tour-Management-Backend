import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import User from "./user.models";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({
        name,
        email,
      
    });
   res.status(httpStatus.CREATED).json({ message: 'User created successfully', user });

  } catch (err: any) {
    console.log(err);
    res.status(httpStatus.BAD_REQUEST).json({ message: `Something went wrong ${err.message}`, error: err });
  }
};
export const UserController = {
  createUser,
};
