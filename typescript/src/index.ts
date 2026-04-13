import express , {Request , Response , NextFunction, response} from "express";
import path from 'path';
import dotenv from "dotenv";
import router from "./routes/expenseRoutes";
import {errorHandler} from "./middleware/errorHandler";
dotenv.config();

const PORT = process.env.port ||3010;

const app = express();

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../src/public')));


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "../src/views"))


app.use("/api/expense" , router);

// Error handler (must be last)


//404 page 
app.use((req:Request  , res:Response)=>{
    res.status(404).json({
        success :false,
        message:"page not found",
    }); 
});
app.use(errorHandler);


app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})