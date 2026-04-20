import express from "express";

import {showLoginPage,showRegisterPage, showForgotPassPage, showResetPassword,
    checkEmailController,registerUserController,loginUserController,showDashboard} from "../controllers/authController";
const router = express.Router();

router.get("/login", showLoginPage);
router.get("/register" , showRegisterPage);
router.get("/forgot-password", showForgotPassPage);
router.get("/reset-password/:id", showResetPassword);
router.get ("/dashboard" , showDashboard)
router.post("/check-email", checkEmailController)
router.post("/register", registerUserController);
router.post("/login", loginUserController)

export default router;
