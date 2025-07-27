import { Router } from "express"

import {
   registerUserController,
   verifyUserController,
   loginUserController,
   logoutUserController,
   forgotPasswordController,
   verifyForgotPasswordOTPController,
   resetPasswordController,
   refreshTokenController
} from "../controllers/user.controller.js"
import {authMiddleware} from "../middleware/auth.js"

const userRoutes = Router();

userRoutes.post("/register", registerUserController)
userRoutes.post("/verify-email", verifyUserController)
userRoutes.post("/login", loginUserController)
userRoutes.get ("/logout", authMiddleware, logoutUserController)
userRoutes.put ("/forgot-password", forgotPasswordController)
userRoutes.put ("/verify-forgot-password-otp", verifyForgotPasswordOTPController)
userRoutes.put("/reset-password", resetPasswordController)
userRoutes.put("/refresh-token", refreshTokenController)


export default userRoutes 