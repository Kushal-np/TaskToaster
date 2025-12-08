import dotenv from "dotenv"
import express from "express";
import authRoutes from "./routes/user.ts"
import connectDB from "./config/db.ts";
dotenv.config();

const app = express();
const PORT = process.env.PORT! || 8000; 

app.use(express.json())
app.use("/api/auth" , authRoutes)
app.listen(PORT , ()=>{
    console.log(`Connected to the port ${PORT} `);
    connectDB();
})