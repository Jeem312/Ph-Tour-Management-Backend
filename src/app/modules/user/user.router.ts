import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import z from "zod";

const router = Router();

router.post("/register", async (req:Request,res:Response,next:NextFunction)=>{
    const createUserZodSchema = z.object({
        name: z.string({
            invalid_type_error: "Name Must Be String "
        }).min(2,{message: "Name Too Short "}).max(50,{message:"Name too long"}),
        email: z.string().email(),
      
        password: z.string().min(8,{
            message: "Password Should Be 8 Character"
        }).optional(),
        phone: z.string().min(11).max(11).optional(),
        address: z.string().optional(),
          
           
    })


 req.body =await createUserZodSchema.parseAsync(req.body);
 next()
},
     UserController.createUser);
router.get("/all-users", UserController.getAllUsers);

export const userRouter = router;