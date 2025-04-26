import { Router } from "express";
import { protect, protectAdmin } from "../middlewares/authMiddleware.js";
import {
  createSession,
  getAllSessions,
  getAllSessionsOfUser,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = Router();

// Session routes
// For admins
router.get("/all", protectAdmin, getAllSessions); // Get all sessions
router.put("/update/:id", protectAdmin, updateSession); // Update a session by ID
router.delete("/delete/:id", protectAdmin, deleteSession); // Delete a session by ID

// For users
router.post("/create", protect, createSession); // Create a new session
router.get("/all/:userId", protect, getAllSessionsOfUser); // Get all sessions by user ID
router.get("/:id", protect, getSessionById); // Get a session by ID

export default router;
