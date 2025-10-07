import express from "express";
import userRouter from "./modules/userModule/user.controller.js";
import { NotFoundException } from "./utils/exceptions.js";

const app = express()

// parsing
app.use(express.json())

//router
app.use('/user' , userRouter)

//not found error handling 
app.all('{/*s}',(req , res , next)=>{
    return next(new NotFoundException)
})

//global errhandling
app.use((err,req ,res , next)=>{
    console.error(err.stack);
    res.status(err.cause || 500).json({
        msg : err.message || "❌ Internal Server Error" ,
        status : err.cause || 500,
    })
})


export default app