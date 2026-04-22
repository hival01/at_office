import {Request,Response, NextFunction} from "express";
import svgCaptcha from "svg-captcha";

// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

import {
  checkEmail,
  registerUser,
  getUser,
  EnterJWT,
  updatePassword,
} from "../models/authModels";
export function showLoginPage(req:Request, res:Response , next:NextFunction):void{
    res.status(200).render("login");
}
export function showDashboard(req:Request, res:Response , next:NextFunction):void{
    const user = req.user; 
    
    res.render("dashboard", { user });
    
}

export function showRegisterPage (req:Request, res:Response,next:NextFunction):void{
    res.status(200).render("register");
}

export function showForgotPassPage (req:Request, res:Response,next:NextFunction):void{
    res.status(200).render("forgot-password");
}

export function showResetPassword (req:Request, res:Response, next:NextFunction):void{
    const token= req.params.id;
    
    res.status(200).render("reset-password", {token:token})
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
    const { userName, email, password } = req.body;
    //store user data
    if (!userName || !email || !password) {
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

      await registerUser(userName, email, hashPassword);

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
        const hashStored =result[0].user_password;
        const isMatch = await bcrypt.compare(password , hashStored);

        if (isMatch === false) {
          return res.status(401).json({
            message: "invalid email or password",
            success: false,
          });
        } else {
            //all info is correct

            //generate jwt
            const user = { id:result[0].user_id ,email:result[0].user_email};

            const token = jwt.sign(
                user,
                String(process.env.SECRET_KEY),
                {expiresIn:'1m'},
            );

            await EnterJWT(token , result[0].user_id);

            res.cookie('token', token , {
                httpOnly:true,
                maxAge: 24*60*60 *1000 //1d

            })
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
        noise:0,
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
        const resetToken = jwt.sign(
            {id: user.user_id},
            String(process.env.SECRET_KEY),
            {expiresIn:"2m"},
        )
       

        return res.status(200).json({
            success:true,
            redirectUrl:`/reset-password/${resetToken}`,

        });
    
    }catch(e){
        console.log(e);
    }
}

export async function resetPasswordController(req:Request, res:Response, next:NextFunction) {
    try{
        const {token , password} = req.body;
        
        const decoded :any= jwt.verify(token, String(process.env.SECRET_KEY));
        const hash= await bcrypt.hash(password , 10);

        //check decoded has id or not
          if (!decoded || !decoded.id) {
            throw new Error("Invalid payload");
        }
        await updatePassword(decoded.id, hash);
        return res.json({ success: true, message: "Password updated!" });

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"invalid token",
        })
    }
}


export async function getAdminPage(req:Request, res:Response, next:NextFunction){
    //fetch all the data and send to frontend



}