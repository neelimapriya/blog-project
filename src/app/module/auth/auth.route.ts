import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userVAlidationSchema } from "../users/user.validation";
import { authController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";


const router=Router()
router.post('/register',validateRequest(userVAlidationSchema.createUserValidationSchema),authController.registerUser)
router.post('/login',validateRequest(AuthValidation.loginValidationSchema),authController.loginUser)

export const AuthRoute = router;