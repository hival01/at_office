import express, { Request, Response } from "express";

import {
  showLoginPage,
  showRegisterPage,
  showForgotPassPage,
  showResetPassword,
  checkEmailController,
  registerUserController,
  loginUserController,
  showDashboard,
  getCaptchaController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/authController";

import { redirectIfLoggedIn, verifyUser } from "../middlerwares/auth";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.redirect("/login");
}); 

router.get("/login", redirectIfLoggedIn, showLoginPage);
router.get("/get-captcha", getCaptchaController);
router.get("/register", showRegisterPage);
router.get("/forgot-password", showForgotPassPage);
router.get("/reset-password/:id", showResetPassword);
router.get("/dashboard", verifyUser, showDashboard);

router.post("/check-email", checkEmailController);
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forgot-password" , forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;
