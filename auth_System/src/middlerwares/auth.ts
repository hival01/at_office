import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { verify } from "node:crypto";


//middelware that protext routes that require login

export const verifyUser = (req:Request , res:Response, next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        return res.redirect("/login");
    }

    try{

        const decoded = jwt.verify(token , String(process.env.SECRET_KEY));
        (req as any).user = decoded;
        next(); 
    }catch(err){
        //iftoken is invalid or expire . remove it and redirect to login
        
        res.clearCookie("token");
        res.redirect("/login");
    }
}

// Middleware to prevent logged-in users from seeing /login or /

export const redirectIfLoggedIn =  (req:Request , res:Response, next:NextFunction)=>{
    const token = req.cookies.token;

    if(token){
        try{
            jwt.verify(token, String(process.env.SECRET_KEY));
            return res.redirect("/dashboard");
        }catch(err){
            // if token is not valid then redirect to login page
            next();
        }
    }else{
        next();
    }
}
