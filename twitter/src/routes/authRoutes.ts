import express, { Request, Response } from "express";

import {
  showLoginPage,
  showRegisterPage,
  showForgotPassPage,
  showResetPassword,
  checkEmailController,
  registerUserController,
  loginUserController,
  
  getCaptchaController,
  forgotPasswordController,
  resetPasswordController,
  

  verifyOtpPage,
  verifyOTPController,
  emailBoxController,
  getProfilePage,
  updateProfileImages,
  updateProfile,
  createTweet,
getHomePage,
logoutUser,
toggleLike,
toggleFollow,

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



router.get("/verify-otp", verifyOtpPage)

router.get('/mock-inbox', emailBoxController);


router.get("/home", verifyUser, getHomePage);
router.get("/:username", verifyUser, getProfilePage);


router.post("/check-email", checkEmailController);
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forgot-password" , forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post('/verify-otp', verifyOTPController);

router.post(
    "/tweet",
    verifyUser,
    upload.single("image"),
    createTweet
);

router.post(
  "/update-profile",
  verifyUser,
  upload.fields([
    
    { name: "profile_pic", maxCount: 1 },
    { name: "cover_pic", maxCount: 1 }
  ]),
  updateProfile
);

router.post("/logout" , logoutUser);
router.post("/like", toggleLike);
router.post("/follow", toggleFollow);

export default router;
