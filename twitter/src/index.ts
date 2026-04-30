import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import db from "./config/db";
import cookieParser from "cookie-parser";
import session from 'express-session';
// import passport  from "passport";
import './config/passport-config'; // Load the strategy
const app = express();
import authRoutes from "./routes/authRoutes"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// app.use(passport.initialize());


// Use cookie-parser with a secret for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// 2. Session initialization
app.use(session({
    secret: 'your_secret_key', // Change this to a random string
    resave: false,             // Don't save session if unmodified
    saveUninitialized: false,   // Create session even if nothing is stored
    cookie: { 
        secure: false,         // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000         // Session expires in 10 minutes
    }
}));

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
