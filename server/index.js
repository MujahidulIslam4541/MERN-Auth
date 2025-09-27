import  "dotenv/config";;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json()); // use express.json() for parsing JSON
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // replace origin with your frontend URL


// Database connection

connectDB()
// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start server
app.listen(PORT, () => {
  console.log(`MERN AUTH Server is running on PORT ${PORT}`);
});
