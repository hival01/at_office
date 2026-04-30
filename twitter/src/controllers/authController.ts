import {Request,Response, NextFunction} from "express";
import svgCaptcha from "svg-captcha";

// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

import {
  checkEmail,
  registerUser,
  getUser,
  EnterJWT,
  updatePassword,
  saveOTP,
  getLatestOTP,markOTPAsUsed,
  getUserByUsername,
  getUserStats,
  updateUserImages,
  getUserById, updateUserProfile 

} from "../models/authModels";
import {
    getTweetsByUser,
    addTweet,
    getAllTweets,



}from "../models/tweetModel"
export function showLoginPage(req:Request, res:Response , next:NextFunction):void{
    res.status(200).render("login");
}


export function showRegisterPage (req:Request, res:Response,next:NextFunction):void{
    res.status(200).render("register");
}

export function showForgotPassPage (req:Request, res:Response,next:NextFunction):void{
    res.status(200).render("forgot-password");
}

export function verifyOtpPage (req:Request, res:Response,next:NextFunction):void{

    const {email} = req.query;
    res.status(200).render("verify-otp" ,{email:email});
}



export function showResetPassword (req:Request, res:Response, next:NextFunction):void{
    const id= req.params.id;
    
    res.status(200).render("reset-password", {id:id})
}

export async function checkEmailController(req:Request, res:Response, next:NextFunction): Promise<any>{
    try{
    const email = req.body.email;

        console.log(email);
    const userExist = await userExistOrNot(email);
    console.log(userExist);
        return res.json({
            existes:userExist, //true or false
        })
    

}catch(err){
    next(err)
}


}
//function to check user is exist or not
async function userExistOrNot(email:string):Promise<boolean>{
    const user = await checkEmail(email);
        if(user){
            return true;
        }else{
            return false;
        }
}



export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userName, email, password,dob } = req.body;
    //store user data
    if (!userName || !email || !password || !dob) {
      return res.status(401).json({
        message: "please enter all the data",
      });
    }

    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongRegex.test(password)) {
      return res
        .status(400)
        .json({ success: false, message: "Password is too weak!" });
    }
    //check again if user email is present in db or not
    const userExist = await userExistOrNot(email);

    if (userExist) {
      return res.json({
        message: "user is exist with this email",
        success: false,
      });
    } else {
      const saltRound = 10;
      const hashPassword = await bcrypt.hash(password, saltRound);

      await registerUser(userName, email, hashPassword, dob);

      return res.json({
        message: "Registed!",
        success: true,
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function loginUserController(req:Request, res:Response , next:NextFunction){
    const{email , password, captchaInput} = req.body;
    if(!email ||!password){
        return res.status(401).json({
            message:"incorrect email or password",
            success:false,
        })
    }

    //retrive captcha from siged cookie
    const storedCaptcah = req.signedCookies.captcha;

   

    if(!storedCaptcah || storedCaptcah !== captchaInput){
        return res.status(400).json({
            message:"invalid captcha",
            success:false,
        })
    }

    //now authenticate user

    const result :any= await getUser(email);

    
    if(result.length){
        const hashStored =result[0].password_hash;
        const isMatch = await bcrypt.compare(password , hashStored);

        if (isMatch === false) {
          return res.status(401).json({
            message: "invalid email or password",
            success: false,
          });
        } else {
            //all info is correct

            //generate jwt
            const user = { id:result[0].id ,email:result[0].email,username:result[0].username ,  profile_pic_url: result[0].profile_pic_url,};

            const token = jwt.sign(
                user,
                String(process.env.SECRET_KEY),
                {expiresIn:'1d'},
            );

            await EnterJWT(token , result[0].id);

            res.cookie('token', token , {
                httpOnly:true,
                maxAge: 24*60*60 *1000 //1d

            })

            console.log(user , "user");
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                 profile_pic_url: user.profile_pic_url,
            };

            console.log("session:" , req.session);


            return res.status(201).json({
                message: "login successfuly",
                success: true,
            });
        }
    }else{
        return res.status(401).json({
            message: "invalid email or password",
            success: false,
          });
    }
}

export async function getCaptchaController(req:Request, res:Response , next:NextFunction){
    const captcha = svgCaptcha.create({
        size:4,
        noise:2,
        color:true,
    });

    res.cookie('captcha', captcha.text, {
        signed:true,
        httpOnly:true,
        maxAge:5*60*1000 //captcha valid for 5min only
    })

    res.type("svg");
    res.status(200).send(captcha.data);
}

export async function forgotPasswordController(req:Request, res:Response, next:NextFunction){
    try{const {email}= req.body;

    
        const user :any= await checkEmail(email); //will give row of user if present

        if(!user){
            return res.status(404).json({success:false, message:"user not found"});
        }

        //
        
        // Generate a 2-minute reset token
        // const resetToken = jwt.sign(
        //     {id: user.user_id},
        //     String(process.env.SECRET_KEY),
        //     {expiresIn:"10m"},
        // )

        //2.generate 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("opt is", otp);

        //hash otp;
        const saltRound =10;
        const otpHash = await bcrypt.hash(otp, saltRound);

        // 4. Set Expiry (e.g., 5 minutes from now)
        const expiresAt = new Date(Date.now() + 5 * 60000); 
        console.log({ userId: user.id, otpHash, expiresAt }); 

        // 2. EASY WAY: Store plain text in session ONLY for the mock inbox page
        req.session.lastSentOtp = {
            code: otp,
            email: email,
            time: new Date().toLocaleTimeString()
        };
        //save into databse table password_resets
        await saveOTP(user.id , otpHash , expiresAt);

        return res.status(200).json({
            success:true,
            // redirectUrl:`/reset-password/${resetToken}`,
            redirectUrl:`/verify-otp?email=${email}`

        });
    
    }catch(e){
        console.log(e);
    }
}



export async function resetPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { password ,id} = req.body;
        const userIdFromUrl = id 

        // 1. Session Authorization Check
        // Check if the session flag exists and matches the user ID in the URL
        console.log(req.session.authorizedResetId,userIdFromUrl , "id for auth");
        if (!req.session.authorizedResetId || req.session.authorizedResetId.toString() !== userIdFromUrl) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized. Please verify your OTP again." 
            });
        }

        // 2. Hash the new password
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        // 3. Update the password in the database
        await updatePassword(Number(userIdFromUrl), hash);

        // 4. SECURITY: Clear the session flag so the reset cannot be performed again
        req.session.authorizedResetId = null;

        req.session.lastSentOtp = null;

        return res.status(200).json({ 
            success: true, 
            message: "Password updated successfully!",
            redirectUrl: "/login"
        });

    } catch (err) {
        console.error("Reset Password Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export async function getAdminPage(req:Request, res:Response, next:NextFunction){
    //fetch all the data and send to frontend



}


export async function verifyOTPController(req:Request, res:Response, next:NextFunction) {
    try {
        const { email, otp } = req.body;

        // 1. Get User ID from email
        const user = await checkEmail(email);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // 2. Get the latest OTP record for this user
        const [resetRecord] = await getLatestOTP(user.id);

        console.log(resetRecord);
        if (!resetRecord || resetRecord.length ===0) {
            return res.status(400).send("No active reset request found.");
        }

        // 3. Check if expired
        if (new Date() > new Date(resetRecord.expires_at)) {
            return res.status(400).send("OTP has expired. Please request a new one.");
        }

        // 4. Compare the 6-digit OTP with the stored Hash
        const isMatch = await bcrypt.compare(otp, resetRecord.otp_hash);

        if (!isMatch) {
            return res.status(400).send("Invalid OTP code.");
        }

        // 5. Success! Mark it used so it can't be used again
        await markOTPAsUsed(resetRecord.reset_id);
        req.session.authorizedResetId = user.id; 

        // 6. Redirect to your reset password route
        return res.redirect(`/reset-password/${user.id}`);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export async function emailBoxController(req:Request , res:Response, next:NextFunction) {
    const mockEmail = req.session.lastSentOtp; 
    
    res.render('mock-inbox', { email: mockEmail });
}


export const getProfilePage = async (req: Request, res: Response) => {
    try {
        const username = String(req.params.username);

        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).render("error", { message: "User not found" });
        }

        const stats = await getUserStats(user.id);
        const tweets = await getTweetsByUser(user.id);

        res.render("profile", {
            user,
            stats,
            tweets,
            currentUser: req.session.user || null
        });

    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).render("error", { message: "Internal Server Error" });
    }
};



export const updateProfileImages = async (req: Request, res: Response) => {
    try {
        console.log("in controller");
         console.log(process.cwd());
        const userId = req.session.user?.id;

        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        let profilePath = null;
        let coverPath = null;

        if (req.files && "profile_pic" in req.files) {
            const file = (req.files as any)["profile_pic"][0];
           
            profilePath = `/uploads/profile/${file.filename}`;
        }

        if (req.files && "cover_pic" in req.files) {
            const file = (req.files as any)["cover_pic"][0];
            coverPath = `/uploads/cover/${file.filename}`;
        }

        await updateUserImages(userId, profilePath, coverPath);

        res.redirect(`/${req.session.user?.username || `/hival`}`);

    } catch (err) {
        console.log(err);
        res.status(500).send("Upload failed");
    }
};



export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.id;

        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        const bio = req.body.bio;

        // 1️⃣ Get existing user data
        const user = await getUserById(userId);

        let profilePath = user.profile_pic_url;
        let coverPath = user.cover_page_url;

        // 2️⃣ Handle profile pic update
        if (req.files && (req.files as any)["profile_pic"]) {
            const file = (req.files as any)["profile_pic"][0];

            // delete old profile pic
            if (user.profile_pic_url) {
                const oldPath = path.join(
                    __dirname,
                    "../public",
                    user.profile_pic_url
                );

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            profilePath = `/uploads/profile/${file.filename}`;
        }

        // 3️⃣ Handle cover pic update
        if (req.files && (req.files as any)["cover_pic"]) {
            const file = (req.files as any)["cover_pic"][0];

            // delete old cover pic
            if (user.cover_page_url) {
                const oldPath = path.join(
                    __dirname,
                    "../public",
                    user.cover_page_url
                );

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            coverPath = `/uploads/cover/${file.filename}`;
        }

        // 4️⃣ Update DB
        await updateUserProfile(userId, bio, profilePath, coverPath);


            if (req.session.user) {
              if (profilePath) {
                req.session.user.profile_pic_url = profilePath;
                console.log("chnage session");
              }
            }
        res.redirect(`/${req.session.user?.username}`);

    } catch (err) {
        console.log("updateProfile error:", err);
        res.status(500).send("Update failed");
    }
};

export const createTweet = async (req:Request, res:Response) => {
    try {
        const userId = Number(req.session.user?.id);
        const { content } = req.body;
        console.log("SESSION USER:", req.session.user);

        let imagePath = null;

        if (req.file) {
            imagePath = `/uploads/tweets/${req.file.filename}`;
        }

        await addTweet(userId, content, imagePath);

        res.redirect("/home");

        
    } catch (err) {
        console.log(err);
        res.send("Error posting tweet");
    }
};

export const getHomePage = async (req: Request, res: Response) => {
    try {
        console.log("in get home");
        const tweets = await getAllTweets();
        console.log("in get home2");

        res.render("home", {
            tweets,
            currentUser: req.session.user || null
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading home page");
    }
};