import { Request, Response , NextFunction } from "express";
import {createExpense ,getAllExpense , getExpenseById , deleteExpense, updateExpense } from "../models/expenseModel";



export async function createExpenseController(req: Request, res:Response , next:NextFunction){

    try{
        const {expName , amount , expDate} = req.body;

        if(!expName || !amount || !expDate){
            return res.status(400).json({
                success:false,
                message:"please enter all fiels : name , amount , date"
            });
        }

        //create new Expense
        //await is remaining =============

        const result = await createExpense(expName , amount , expDate);


        res.status(201).json({
            success:true,
            message:"New Expense is Created",
            data:result,
        });


    }catch(err){
        next(err);
    }
}


export async function getAllExpensesController(req: Request , res:Response , next:NextFunction){
    try{
        const expenses = await getAllExpense();
        
       
       
        res.status(200).json({
            success:true,
            message:"all expenses fetched",
            data:expenses,
        })
        
    }catch(err){
        next(err);
    }
}

export async function getExpenseByIdController(req: Request , res:Response , next:NextFunction){
    try{
        
        const  {id }= req.params;
        
        if(!id){
            throw new Error("expense is id required");
        }
        
        const expense = await getExpenseById(Number(id));
        
        res.status(200).json({
            success:true,
            message:" expense is  fetched by id",
            data:expense,
        })
        
    }catch(err){
        next(err);
    }
}
export function homepage(req: Request , res:Response , next:NextFunction){
    res.render("index");
}

export async function deleteExpenseController(req:Request , res:Response , next:NextFunction){
    try{
    const {id}= req.params;
    if(!id){
        throw new Error("expense id is required");
    }

     await deleteExpense(Number(id));

     res.status(200).json({
        success:true,
        message:"Expense deleted successfully",
    });
    }catch(err){
        next(err);
    }
}

export async function updateExpenseController(req:Request , res:Response, next:NextFunction){
    try {
        const {id}= req.params;
        const{expName, amount, expdate}= req.body;
        console.log(expName , amount, expdate);
        

        if(!id){
            return res.status(400).json({
                success:false,
                message:"Expense id is required",
            });
        }

        if(!expName || !amount || !expdate){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields: name, amount, date....",
            })
        }
        const result = await updateExpense(Number(id) , expName, Number(amount), expdate);

        res.status(200).json({
            success:true,
            message:"expense updated",
            data:result,
        });
    } catch (error) {
        next(error)
    }
}