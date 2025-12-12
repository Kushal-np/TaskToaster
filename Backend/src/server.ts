import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import clubRoutes from "./routes/club.route"
dotenv.config();

const app = express();
const PORT = process.env.PORT!;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/club" , clubRoutes);

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
  connectDB();
});
