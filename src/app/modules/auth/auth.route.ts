import { json, NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middleWares/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";


const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post ("/logOut",AuthControllers.logOut);
router.post("/resetPassword",checkAuth(...Object.values(Role)),AuthControllers.resetPassword);
router.get("/google",async(req:Request,res:Response,next:NextFunction)=>{
const redirect = req.query.redirect ||"/" ;
    passport.authenticate("google",{scope:["profile","email"],state:redirect as string})(req,res)
})
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),AuthControllers.googlecallbackController)

export const AuthRoutes = router;