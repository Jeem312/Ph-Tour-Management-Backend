/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelpers/AppError";
import { isActive, IUser } from "../user/user.interface"
import httpStatus, { NETWORK_AUTHENTICATION_REQUIRED } from "http-status-codes"
import bcryptjs from "bcryptjs"
import User from "../user/user.models";
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken, verifyToken } from "../../utils/jwt";
import { envConfig } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";

const credentialsLogin = async(payload:Partial<IUser>)=>{
    const {email,password} = payload;

        const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,'User Not Exist')
    }
    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST,"Incorrect Password")
    }

        const userToken = createUserTokens(isUserExist)
    
     const {password:pass,...rest}=isUserExist;

 return{
   accessToken:userToken.accessToken,
   refreshToken:userToken.refreshToken,
  user: rest,
 }

}

const getNewAccessToken = async(refreshToken:string)=>{

const newAccessToken =await createNewAccessTokenWithRefreshToken(refreshToken)


return {
    accessToken: newAccessToken
}

 


}

const resetPassword = async(oldPassword:string,newPassword:string,decodedToken:JwtPayload)=>{
    const user = await User.findById(decodedToken.userId);

 const isOldPasswordMatch =await bcryptjs.compare(oldPassword, user!.password as string);
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED,"old password didnt matched")
    
  }


const newHashedPassword = await bcryptjs.hash(newPassword,Number(envConfig.BCRYPT_SALT_ROUND))
user!.password = newHashedPassword;
user!.save()



 


}

export const AuthServices ={
    credentialsLogin,
     getNewAccessToken,
     resetPassword
}