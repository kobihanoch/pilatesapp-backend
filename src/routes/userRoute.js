import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// User Routes
router.post("/create", createUser); // Create a new user
router.get("/all", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.put("/update/:id", protect, updateUser); // Update a user by ID
router.delete("/delete/:id", /*protect, */ deleteUser); // Delete a user by ID

export default router;
