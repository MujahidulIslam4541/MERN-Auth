import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import todoRoute from "./routes/todoRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json()); // use express.json() for parsing JSON
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://client-eight-sand-98.vercel.app",
    ],
  })
); // replace origin with your frontend URL

// Database connection
connectDB();

// API Endpoints
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api", (req, res) => {
  res.send("Server running fine ✅");
});

// Import and use auth routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", todoRoute);

// Start server
app.listen(PORT, () => {
  console.log(`MERN AUTH Server is running on PORT ${PORT}`);
});
