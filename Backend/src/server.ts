import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

// Route imports
import authRoutes from "./routes/auth.route";
import clubRoutes from "./routes/club.route";
import meetingRoutes from "./routes/meeting.route";
import agendaRoutes from "./routes/agenda.route";
import guestRoutes from "./routes/guest.route";
import templateRoutes from "./routes/template.route";
import eventRoutes from "./routes/event.route";
import speechRoutes from "./routes/speech.route";
import tableTopicRoutes from "./routes/tableTopic.route";
import roleHistoryRoutes from "./routes/roleHistory.route";
import dashboardRoutes from "./routes/dashboard.route"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/club", clubRoutes);
app.use("/api/v1/meeting", meetingRoutes);
app.use("/api/v1/agenda", agendaRoutes);
app.use("/api/v1/guest", guestRoutes);
app.use("/api/v1/template", templateRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/speech", speechRoutes);
app.use("/api/v1/table-topic", tableTopicRoutes);
app.use("/api/v1/role-history", roleHistoryRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  connectDB();
});

export default app;