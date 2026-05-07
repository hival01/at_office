import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
// import passport from 'passport';


//middelware that protext routes that require login

export const verifyUser = (req:Request , res:Response, next:NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        return res.redirect("/login");
    }

    try{

        const decoded = jwt.verify(token , String(process.env.SECRET_KEY));
        (req as any).user = decoded;


        // ✅ REBUILD SESSION if missing
        if (!req.session.user) {
            req.session.user = {
                id : decoded.id,
                username: decoded.username,
                email: decoded.email,
                profile_pic_url: decoded.profile_pic_url
            };
        }

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
            return res.redirect("/home");
        }catch(err){
            // if token is not valid then redirect to login page
            next();
        }
    }else{
        next();
    }
}
export const ensureOtpVerified = (req: any, res: any, next: any) => {
    const requestedId = req.params.id;

    // Check if the session has an authorized ID and if it matches the one in the URL
    if (req.session.authorizedResetId && req.session.authorizedResetId.toString() === requestedId) {
        return next(); // Proceed to the page
    }

    // Otherwise, redirect back to start
    return res.redirect('/forgot-password'); 
};