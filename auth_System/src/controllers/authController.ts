import {Request,Response, NextFunction} from "express";

// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

import {checkEmail , registerUser,authenticateUser,EnterJWT} from "../models/authModels";
export function showLoginPage(req:Request, res:Response , next:NextFunction):void{
    res.status(200).render("login");
}
export function showDashboard(req:Request, res:Response , next:NextFunction):void{
    res.status(200).render("dashboard");
}

export function showRegisterPage (req:Request, res:Response,next:NextFunction):void{
    res.status(200).render("register");
}

export function showForgotPassPage (req:Request, res:Response,next:NextFunction):void{
    res.status(200).render("forgot-password");
}

export function showResetPassword (req:Request, res:Response, next:NextFunction):void{
    const token= req.params.id;
    console.log(token);
    res.status(200).render("reset-password", {token:token})
}

export async function checkEmailController(req:Request, res:Response, next:NextFunction): Promise<any>{
    try{
    const email = req.body.email;
    console.log("email in controller", email);

    const userExist = await userExistOrNot(email);
    if(userExist){
        res.json({
            existes:userExist,
        })
    }

}catch(err){
    next(err)
}


}
//function to check user is exist or not
async function userExistOrNot(email:string):Promise<boolean>{
    const user = await checkEmail(email);
        if( user){
            return true;
        }else{
            return false;
        }
}



export async function registerUserController(req:Request , res:Response , next:NextFunction){
    try{
        //store user data 
        if (!req.body.userName || !req.body.email || !req.body.password) {
             res.status(401).json({
                message:"please enter all the data"
            })
        }
        //check again if user email is present in db or not 
        const userExist = await userExistOrNot(req.body.email);
        console.log(userExist);
        if(userExist){
             res.json({
                message:"user is exist with this email",
                success:false,
            })
        }else{
    
            const saltRound =Math.random() * 10;
            const password = req.body.password;


            const hashPassword = await bcrypt.hash(password, saltRound);
            console.log("hash" , hashPassword);
            await registerUser(req.body.userName , req.body.email , hashPassword);

             res.json({
                message:"Registed!",
                success:true,
            });

            
        }



    }catch(err){
        next(err);
    }
}

export async function loginUserController(req:Request, res:Response , next:NextFunction){
    const{email , password} = req.body;
    if(!email ||!password){
        return res.status(401).json({
            message:"incorrect email or password",
            success:false,
        })
    }

    //now authenticate user

    const result :any= await authenticateUser(email, password);


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

            const token = jwt.sign(
                {id:result[0].user_id , email:result[0].email},
                String(process.env.SECRET_KEY),
                {expiresIn:'1h'},
            )
            console.log(token);

            
            await EnterJWT(token , result[0].user_id);
          

            res.cookie('token', token , {
                httpOnly:true,
                maxAge: 24*60*60 *1000 //24h

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



