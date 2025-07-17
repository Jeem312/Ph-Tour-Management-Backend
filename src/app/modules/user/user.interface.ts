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

    provider: "goggle" | "credentials";
    providerId: string;}

export interface IUser {

    email: string;
    name: string;
    role: Role;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: isActive;
    isVerified?: string;
    auths?: IAuthProvider[];
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[];

}