import { Request, Response, NextFunction } from "express";


export class AppError extends Error{
    statusCode:number;

    constructor(message:string , statusCode:number){
        super(message),
        this.statusCode = statusCode,
        this.name= 'AppError';
    }
} 
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  console.error(err);

  if(err instanceof AppError){
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err.message,
    
    });
  }

  res.status(500).json({
    success: false,
     message: 'Internal server error',
    error: err.message || 'Unknown error',
  });
}
