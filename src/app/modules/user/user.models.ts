import { model, Schema } from "mongoose";
import { gender, IAuthProvider, isActive, IUser, Role } from "./user.interface";
const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
});
const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    picture: { type: String },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: { 
        type: String, 
        enum: Object.values(isActive), 
        default: isActive.ACTIVE },
    isVerified: { type: Boolean, default: false },
    auths: [authProviderSchema],

}, { timestamps: true ,
    versionKey: false
});
const User = model<IUser>("User", userSchema);
export default User;
