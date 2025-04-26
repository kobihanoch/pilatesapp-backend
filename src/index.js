import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import sessionRoute from "./routes/sessionRoute.js";

// Config-------------------------------------------------------------------
dotenv.config();
const app = express();

// Port
const PORT = process.env.PORT || 5000;

// Using cors and express.json() middleware
app.use(cors());
app.use(express.json());
connectDB(); // Connect to MongoDB

// Notify the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// API Routes---------------------------------------------------------------

// Users
app.use("/api/users", userRoute);

// Auth
app.use("/api/auth", authRoute);

// Sessions
app.use("/api/sessions", sessionRoute);
