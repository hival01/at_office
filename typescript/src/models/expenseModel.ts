
import { release } from "node:os";
import db from "../config/database";
import {AppError} from "../middleware/errorHandler";

//create expense 
export async function createExpense (name:string , amount:number , date:string){
    try{
    const connection = await db.getConnection();

    const query:string  = `insert into expense(expense_name , expense_amount , expense_date) values (?,?,?);`

    const [result] :any[] = await connection.execute(query , [name,amount,date]);
    connection.release();

    return result;
    }catch(err){
        throw err;
    }
}

//get all expense

export async function getAllExpense(){
    try {
        const connection = await db.getConnection();

        const query :string = `select * from expense order by created_at desc`;
        const [result] :any[] = await connection.execute(query);
        connection.release();
        return result;

    } catch (error) {
        throw error;
    }
}

export async function getExpenseById(id:number){
    try{
        const connection = await db.getConnection();

        const query:string = `select * from expense where id= ?`;
        const [result]:any[] = await connection.execute(query , [id]);
        connection.release();

        //what if no exp is there with this id?
        // return result;


        const expense = result as any[];
        if(expense.length === 0){
              throw new AppError('Expense not found', 404);
        }
        return expense;

    }catch(err){
        throw err;
    }
}

export async function deleteExpense(id:number){
    try {
        const connection = await db.getConnection();

        const query:string= `delete from expense where id=?`;
        const [result] = await connection.execute(query ,[id]);
        connection.release();

        const deleteRow :any= result;
        if(deleteRow.affectedRows === 0){
            throw new Error("expense not found");
        }
        return deleteRow;
        
    } catch (error) {
        throw error;
    }
}

export async function updateExpense(
    id:number,
    name:string,
    amount:number,
    date:string,
){
    try{
        const connection = await db.getConnection();

       const  query:string = `update expense set expense_name=? , expense_amount=?, expense_date=? where id=?`;

       const [result] :any[]= await connection.execute(query , [id ,name, amount ,date]);

       connection.release();

       //if no matching data found
       if(result.affectedRows ===0){
        throw new AppError("no expense found" , 404);
       }
       return result;
    }catch(err){
        throw new AppError("err "+ err , 500);
    }
}