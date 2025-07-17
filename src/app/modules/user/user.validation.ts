import z, { object } from "zod";
import { isActive, Role } from "./user.interface";


  export const createUserZodSchema = z.object({
        name: z.string({
            invalid_type_error: "Name Must Be String "
        }).min(2,{message: "Name Too Short "}).max(50,{message:"Name too long"}),
        email: z.string().email(),
      
        password: z.string().min(8,{
            message: "Password Should Be 8 Character"
        }),
        phone: z.string().min(11).max(11).optional(),
        address: z.string().optional(),
          
           
    })


    export const UpdateUserZodSchema = z.object({
        name: z.string({
            invalid_type_error: "Name Must Be String "
        }).min(2,{message: "Name Too Short "}).max(50,{message:"Name too long"}).optional(),
     
      
        password: z.string().min(8,{
            message: "Password Should Be 8 Character"
        }).optional(),
        phone: z.string().min(11).max(11).optional(),
        address: z.string().optional(),
        role: z.enum(Object.values(Role) as [string]).optional(),
        isActive: z.enum(Object.values(isActive) as [string]).optional(),
        isDeleted:z.boolean().optional(),
        isVarified: z.boolean().optional()
          
           
    })


