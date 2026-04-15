import {Request, Response,NextFunction} from "express";


export async function registerController(req:Request , res:Response ,next:NextFunction) {
    const {userName , userMail , userPassword}=req.body;
    res.send("helo");
}