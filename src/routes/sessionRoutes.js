import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  registerToSession,
  unregisterFromSession,
  getMySessions,
  getAllSessionsForThisYearFromSelectedDate,
} from "../controllers/sessionController.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

// Admin routes
router.post("/create", protect, authorizeRoles("admin"), createSession); // Admin - Create a new session
router.get("/all", protect, authorizeRoles("admin"), getAllSessions); // Admin - Get all sessions
router.put("/update/:id", protect, authorizeRoles("admin"), updateSession); // Admin - Update a session by ID
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteSession); // Admin - Delete a session by ID

// User routes
router.get("/my", protect, getMySessions); // User - Get all sessions the user registered to
router.get("/soon", protect, getAllSessionsForThisYearFromSelectedDate); // User - gets all sessions for year by selected date
router.get("/:id", protect, getSessionById); // User - View details of a specific session
router.post("/register/:id", protect, registerToSession); // User - Register to a session
router.post("/unregister/:id", protect, unregisterFromSession); // User - Unregister from a session

export default router;
