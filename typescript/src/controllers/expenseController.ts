import { Request, Response , NextFunction } from "express";
import {createExpense ,getAllExpense , getExpenseById , deleteExpense, updateExpense, seachExpense } from "../models/expenseModel";


export async function searchExpenseController(req:Request , res:Response , next:NextFunction) {
    try{
    console.log(); 
    // const {searchData}= req.body;
    const result = await seachExpense(String(req.query.searchData));
    
    res.status(200).json({
        success:true,
        message:"data is searcheddd",
        data:result,
    })
}catch(err){
    next(err);
}
}
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
        console.log("expdae" + expDate);

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
        console.log(expense[0]);
        res.status(200).render("updateForm" , {expense:expense[0]})
        
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
        const{expName, amount, expDate}= req.body;
        console.log(expName , amount, expDate);
        

        if(!id){
            return res.status(400).json({
                success:false,
                message:"Expense id is required",
            });
        }

        if(!expName || !amount || !expDate){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields: name, amount, date....",
            })
        }
        const result = await updateExpense(Number(id) , expName, Number(amount), expDate);

        res.status(200).json({
            success:true,
            message:"expense updated",
            data:result,
        });
    } catch (error) {
        next(error)
    }
}