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
  updateProfile,
  createTweet,
getHomePage,
logoutUser,
toggleLike,
toggleFollow,
getCommentsController,
addCommentController,


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
router.get("/comments/:tweetId", verifyUser, getCommentsController);
router.get("/:username", verifyUser, getProfilePage);  //always keepit last


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
router.post("/like", verifyUser,toggleLike);
router.post("/follow", verifyUser,toggleFollow);
router.post("/comment", verifyUser, addCommentController);

export default router;
