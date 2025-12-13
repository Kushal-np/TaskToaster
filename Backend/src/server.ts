import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import clubRoutes from "./routes/club.route";
import meetingRoutes from "./routes/meeting.route";
import agendaRoutes from "./routes/agenda.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT!;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/club" , clubRoutes);
app.use("/api/v1/meeting" , meetingRoutes);
app.use("/api/v1/agenda" , agendaRoutes);
app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
  connectDB();
});
