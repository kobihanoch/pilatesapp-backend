import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redisClient.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Config-------------------------------------------------------------------
dotenv.config();
const app = express();

// Port
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

// CORS allowance-----------------------------------------------------
const allowedOrigins = [
  process.env.SHILAT_IP,
  process.env.HOME_IP,
  process.env.COMPUTER_IP,
  process.env.PHONE_IP,
  "https://pilates-backend-wk9s.onrender.com", // Backend Render
  "https://myapp.com", // Production frontend
];

/*app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);*/
// Apply CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Use express
app.use(express.json());

// Use helmet
app.use(helmet());

// Trust proxy to get the request device IP for rate limiting
// IMPORTANT: Allow it only if using secured cloud services like Render, AWS, Azure, etc...
app.set("trust proxy", 1);

// Use general rate limiter
app.use(generalLimiter);

await connectDB(); // Connect to MongoDB
await connectRedis(); // Connect to Redis

// Notify the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Health check
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// API Routes---------------------------------------------------------------

// Users
app.use("/api/users", userRoutes);

// Auth
app.use("/api/auth", authRoutes);

// Sessions
app.use("/api/sessions", sessionRoutes);

// Error Handler
app.use(errorHandler);
