import { z } from "zod";
import { isActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
    })
      .min(2, { message: "Name too short" })
      .max(50, { message: "Name too long" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z.string()
      .min(8, { message: "Password should be at least 8 characters" }),

    phone: z.string()
      .min(11, { message: "Phone should be 11 digits" })
      .max(11, { message: "Phone should be 11 digits" }),

    picture: z.string().url({ message: "Picture must be a valid URL" }),

    address: z.string({
      invalid_type_error: "Address must be a string",
    }),

    role: z.enum(Object.values(Role) as [string]).optional(),
    isActive: z.enum(Object.values(isActive) as [string]).optional(),
    isVerified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UpdateUserZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    password: z.string().min(8).optional(),
    phone: z.string().min(11).max(11).optional(),
    picture: z.string().url().optional(),
    address: z.string().optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
    isActive: z.enum(Object.values(isActive) as [string]).optional(),
    isVerified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
