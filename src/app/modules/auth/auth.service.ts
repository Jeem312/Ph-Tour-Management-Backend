import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface"
import httpStatus from "http-status-codes"
import bycryptjs from "bcryptjs"
import User from "../user/user.models";
import jwt from "jsonwebtoken"

const credentialsLogin = async(payload:Partial<IUser>)=>{
    const {email,password} = payload;

        const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,'User Not Exist')
    }
    const isPasswordMatched = await bycryptjs.compare(password as string, isUserExist.password as string);

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST,"Incorrect Password")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = jwt.sign(jwtPayload,"secret",{
        expiresIn:"5d"
    })

 return{
   accessToken
 }

}

export const AuthServices ={
    credentialsLogin
}