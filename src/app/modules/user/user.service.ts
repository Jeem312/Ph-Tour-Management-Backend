import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import User from "./user.models";
import httpStatus from "http-status-codes"
import bycryptjs from "bcryptjs"
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config/env";


const createUser = async (payload:Partial<IUser>)=>{

    const {email,password,...rest} = payload;

    const isUserExist = await User.findOne({email})

    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,'User Already Exist')
    }

    const hashedPassword =await bycryptjs.hash(password as string,10)

 const authProvider: IAuthProvider = {provider:"credentials",providerId:email as string}

    const user = await User.create({
        email,
        password:hashedPassword,
        auths:[authProvider],
        ...rest
    })
     return user;

}
const getAllUsers = async ()=>{
    const users = await User.find({});
    
    const totalUsers = await User.countDocuments();

    return { data:users,
       meta:{
          total:totalUsers 
       }};
}

const updateUser = async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{

     const isUserExist = await User.findById(userId);

     if(!isUserExist){
          throw new AppError(httpStatus.FORBIDDEN,"User Not Found")
     }
     

if (payload.role) {
    if(decodedToken.role=== Role.USER || decodedToken.role===  Role.GUIDE){
        throw new AppError(httpStatus.FORBIDDEN,"You are not authorize")

    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {

         throw new AppError(httpStatus.FORBIDDEN,"You are not authorize")
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
            if(decodedToken.role=== Role.USER || decodedToken.role===  Role.GUIDE){
        throw new AppError(httpStatus.FORBIDDEN,"You are not authorize")

    }
        
    }

    if(payload.password){
        payload.password= await bycryptjs.hash(payload.password,envConfig.BCRYPT_SALT_ROUND)
    }
    
}
const updatedUser = await User.findByIdAndUpdate(userId,payload,{new:true,runValidators:true});
return updatedUser;

}

export const UserService = {
    createUser,
    getAllUsers,
    updateUser
}