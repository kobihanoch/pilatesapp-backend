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
import { createIOServer, startSocket } from "./config/webSocket.js";
import { createServer } from "http";

// RESOURECES CONNECTIONS AND GENERAL CONFIGURATIONS  ------------------------------------------
dotenv.config();

// Create an express server
const app = express();

// Define port
const PORT = process.env.PORT || 5000;

await connectDB(); // Connect to MongoDB
await connectRedis(); // Connect to Redis

// MIDDLWARES ----------------------------------------------------------------------------------
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
    origin: true,
    credentials: true,
  })
);

// For using cookies
app.use(cookieParser());

// Use express JSON formats
app.use(express.json());

// Use helmet
app.use(helmet());

// Trust proxy to get the request device IP for rate limiting
// IMPORTANT: Allow it only if using secured cloud services like Render, AWS, Azure, etc...
app.set("trust proxy", 1);

// Use general rate limiter
app.use(generalLimiter);

// Notify the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Health check
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// API ROUTES --------------------------------------------------------------------------------------------------

// Users
app.use("/api/users", userRoutes);

// Auth
app.use("/api/auth", authRoutes);

// Sessions
app.use("/api/sessions", sessionRoutes);

// Error Handler
app.use(errorHandler);

// SOCKET CONNECTIONS ---------------------------------------------------------------------------------------------
const { io, server } = createIOServer(app);
await startSocket(io);

// LISTEN TO PORT ------------------------------------------------------------------------------------------------
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
