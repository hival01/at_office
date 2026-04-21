import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import db from "./config/db";
import cookieParser from "cookie-parser";
const app = express();
import authRoutes from "./routes/authRoutes"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use cookie-parser with a secret for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found");
});


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).send("Something went wrong. Please try again later.");
});


try {

  (async () => {
    const database = await db.getConnection();
    database.release();
  })();
 
  app.listen(process.env.PORT, () => {
    console.log("surever is runnig on http://localhost:" + process.env.PORT);
  });
} catch (err) {
  console.log(err);
}
