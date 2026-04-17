import {Request,Response, NextFunction} from "express";
import {checkEmail} from "../models/authModels";
export function showLoginPage(req:Request, res:Response , next:NextFunction):void{
    res.status(200).render("login");
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

    const user = await checkEmail(email);
        console.log(user);
    res.json({
        existes: user
    });
}catch(err){
    next(err)
}

}