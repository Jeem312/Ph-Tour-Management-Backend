import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUIDE = 'GUIDE',
}
export enum isActive {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
}

export interface IAuthProvider {

    provider: "google" | "credentials";
    providerId: string;}

export interface IUser {
    _id?: Types.ObjectId;
    email: string;
    name: string;
    role: Role;
    password?: string;
    phone: string;
    picture: string;
    address: string;
    isDeleted: boolean;
    isActive?: isActive;
    isVerified?:boolean;
    auths?: IAuthProvider[];
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[];

}