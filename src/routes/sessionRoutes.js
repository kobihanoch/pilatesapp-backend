import { Router } from "express";
import { protect, protectAdmin } from "../middlewares/authMiddleware.js";
import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  registerToSession,
  unregisterFromSession,
  getMySessions,
  getAllSessionsForAMonthFromToday,
} from "../controllers/sessionController.js";

const router = Router();

// Admin routes
router.post("/create", protectAdmin, createSession); // Admin - Create a new session
router.get("/all", protectAdmin, getAllSessions); // Admin - Get all sessions
router.put("/update/:id", protectAdmin, updateSession); // Admin - Update a session by ID
router.delete("/delete/:id", protectAdmin, deleteSession); // Admin - Delete a session by ID

// User routes
router.get("/my", protect, getMySessions); // User - Get all sessions the user registered to
router.get("/soon", protect, getAllSessionsForAMonthFromToday); // User - gets all sessions for next month
router.get("/:id", protect, getSessionById); // User - View details of a specific session
router.post("/register/:id", protect, registerToSession); // User - Register to a session
router.post("/unregister/:id", protect, unregisterFromSession); // User - Unregister from a session

export default router;
