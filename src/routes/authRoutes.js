import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  loginUser,
  logoutUser,
  checkIfUserAuthenticated,
  refreshToken,
} from "../controllers/authController.js";

const router = Router();

// User Routes
router.post("/login", asyncHandler(loginUser)); // Logging in a user
router.post("/logout", asyncHandler(logoutUser)); // Logging out a user
router.get("/checkauth", asyncHandler(checkIfUserAuthenticated)); // Check if user is authenticated
router.post("/refresh", asyncHandler(refreshToken)); // Refresh token

export default router;
