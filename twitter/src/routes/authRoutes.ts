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
  getAdminPage,
  verifyOtpPage,
  verifyOTPController,
  emailBoxController,
  getProfilePage,
  updateProfileImages,
  updateProfile,


} from "../controllers/authController";
import { upload } from "../middlerwares/upload";
import { redirectIfLoggedIn, verifyUser,ensureOtpVerified } from "../middlerwares/auth";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.redirect("/login");
}); 

router.get("/login", redirectIfLoggedIn, showLoginPage);
router.get("/get-captcha", getCaptchaController);
router.get("/register", showRegisterPage);
router.get("/forgot-password", showForgotPassPage);
router.get("/reset-password/:id",ensureOtpVerified, showResetPassword);
router.get("/dashboard", verifyUser, showDashboard);
router.get("/admin",verifyUser, getAdminPage)

router.get("/verify-otp", verifyOtpPage)
// In your routes file
router.get('/mock-inbox', emailBoxController);
router.get("/:username", verifyUser, getProfilePage);

router.post("/check-email", checkEmailController);
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forgot-password" , forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post('/verify-otp', verifyOTPController);


router.post(
  "/update-profile",
  verifyUser,
  upload.fields([
    
    { name: "profile_pic", maxCount: 1 },
    { name: "cover_pic", maxCount: 1 }
  ]),
  updateProfile
);



export default router;
