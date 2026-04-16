import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import path from "path";
import authRoutes from "./routes/authRoutes";
import { attachUserToLocals } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-this-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);
app.use(attachUserToLocals);

app.use("/", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).send("Something went wrong. Please try again later.");
});

export default app;
