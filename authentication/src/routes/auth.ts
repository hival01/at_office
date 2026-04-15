import express from "express";
const router = express.Router();

import { registerController } from "../controllers/authController"; 
router.get("/", (req, res)=>{
    res.send("helloo");
})

router.post("/register" , registerController)
export default router;
