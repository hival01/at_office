import express ,{Request, Response} from "express";
import itemRoutes from "./routes/auth";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const PORT:number = Number(process.env.port) || 3045;


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));


app.set("view engine","ejs");
app.set("views" , path.join(__dirname , './views'));

// const itemRoutes = require("./routes/auth")
app.use("/" , itemRoutes);


app.use((req:Request, res:Response):void=>{
    res.status(404).send("page not found")
});

app.listen(PORT, ():void=>{
    console.log(`server is runnnig at http://localhost:${PORT}`);
})
