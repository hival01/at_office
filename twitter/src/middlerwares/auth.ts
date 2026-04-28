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
        next(); 
    }catch(err){
        //iftoken is invalid or expire . remove it and redirect to login
        
        res.clearCookie("token");
        res.redirect("/login");
    }
}

//authtenticate with passport-jwt

// export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
//         if (err || !user) {
//             res.clearCookie("token");
//             return res.redirect("/login");
//         }
//         req.user = user; // Attach database user to the request
//         next();
//     })(req, res, next);
// };


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
export const ensureOtpVerified = (req: any, res: any, next: any) => {
    const requestedId = req.params.id;

    // Check if the session has an authorized ID and if it matches the one in the URL
    if (req.session.authorizedResetId && req.session.authorizedResetId.toString() === requestedId) {
        return next(); // Proceed to the page
    }

    // Otherwise, redirect back to start
    return res.redirect('/forgot-password'); 
};