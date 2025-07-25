import { Router } from "express";
import {
  cancelSession,
  createSession,
  deleteSession,
  getAllSessionsForThisYearFromSelectedDate,
  getMyCompletedSessions,
  getMyUpcomingSessions,
  getPaginatedSessions,
  getSessionById,
  registerToSession,
  registerUserToSession,
  unregisterFromSession,
  unregisterUserFromSession,
  updateSession,
} from "../controllers/sessionController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

// Admin routes
router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  asyncHandler(createSession)
); // Admin - Create a new session
router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  asyncHandler(getPaginatedSessions)
); // Admin - Get all sessions
router.put(
  "/update/:id",
  protect,
  authorizeRoles("admin"),
  asyncHandler(updateSession)
); // Admin - Update a session by ID
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("admin"),
  asyncHandler(deleteSession)
); // Admin - Delete a session by ID
router.post(
  "/register/:sessionId/:username",
  protect,
  authorizeRoles("admin"),
  asyncHandler(registerUserToSession)
); // Admin - Register a user to a session
router.post(
  "/unregister/:sessionId/:userId",
  protect,
  authorizeRoles("admin"),
  asyncHandler(unregisterUserFromSession)
); // Admin - Unregister a user from a session
router.put(
  "/cancel/:id/",
  protect,
  authorizeRoles("admin"),
  asyncHandler(cancelSession)
); // Admin - Cancel a session by ID

// User routes
router.get("/myupcoming", protect, asyncHandler(getMyUpcomingSessions)); // User - Get all sessions the user registered to UPCOMING
router.get("/mycompleted", protect, asyncHandler(getMyCompletedSessions)); // User - Get all sessions the completed
router.get(
  "/soon",
  protect,
  asyncHandler(getAllSessionsForThisYearFromSelectedDate)
); // User - gets all sessions for year by selected date
router.get("/:id", protect, asyncHandler(getSessionById)); // User - View details of a specific session
router.post("/register/:id", protect, asyncHandler(registerToSession)); // User - Register to a session
router.post("/unregister/:id", protect, asyncHandler(unregisterFromSession)); // User - Unregister from a session

export default router;
