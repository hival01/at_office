import express from "express";

import {showLoginPage,showRegisterPage, showForgotPassPage, showResetPassword,checkEmailController} from "../controllers/authController";
const router = express.Router();

router.get("/login", showLoginPage);
router.get("/register" , showRegisterPage);
router.get("/forgot-password", showForgotPassPage);
router.get("/reset-password/:id", showResetPassword);

router.post("/check-email", checkEmailController)

export default router;
