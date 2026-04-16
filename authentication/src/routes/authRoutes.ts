import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendResetLink,
  showForgotPasswordPage,
  showHomePage,
  showLoginPage,
  showRegisterPage,
  showResetPasswordPage,
} from "../controllers/authController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", showHomePage);
router.get("/register", showRegisterPage);
router.post("/register", registerUser);
router.get("/login", showLoginPage);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/forgot-password", showForgotPasswordPage);
router.post("/forgot-password", sendResetLink);
router.get("/reset-password/:token", showResetPasswordPage);
router.post("/reset-password/:token", resetPassword);

export default router;
