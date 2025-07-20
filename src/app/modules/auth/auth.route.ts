import { json, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middleWares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post ("/logOut",AuthControllers.logOut);
router.post("/resetPassword",checkAuth(...Object.values(Role)),AuthControllers.resetPassword)

export const AuthRoutes = router;