import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getAuthenticatedUserById,
  updateAuthenticatedUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

// Public routes
router.post("/create", createUser); // Public - Create a new user (registration)

// User routes
router.get("/get", protect, getAuthenticatedUserById); // User - Get their own profile
router.put("/update", protect, updateAuthenticatedUser); // User - Update their own profile

// Admin routes
router.get("/all", protect, authorizeRoles("admin"), getAllUsers); // Admin - Get all users
router.get("/:id", protect, authorizeRoles("admin"), getUserById); // Admin - Get a specific user by ID
router.put("/update/:id", protect, authorizeRoles("admin"), updateUser); // Admin - Update a specific user by ID
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteUser); // Admin - Delete a specific user by ID

export default router;
