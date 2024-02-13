// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({
    path: './.env'
})
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


app.get("/", async (req,res)=>{
    res.status(200).json({
        uptime: process.uptime(),
        message:"Welcome to Blinkit API",
        timestamp: Date.now(),
    });
})



app.use(express.json({ limit: "16kb" })); //for limiting the json req
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // for limiting the url size
app.use(express.static("public"));
app.use(cookieParser());




//routes
import userRouter from "./routes/user.js"
// import { LoginUser, RegisterUser } from "./controllers/user.js";
// import { ApiResponse } from "./utils/ApiResponse.js";


app.get("/jokes",async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,{},"jokes"));
})
// routes decleration
app.use("/api/v1/users", userRouter);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : http://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

