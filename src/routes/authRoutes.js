import { Router } from "express";
import {
  loginUser,
  logoutUser,
  checkIfUserAuthenticated,
} from "../controllers/authController.js";

const router = Router();

// User Routes
router.post("/login", loginUser); // Logging in a user
router.post("/logout", logoutUser); // Logging out a user
router.get("/checkauth", checkIfUserAuthenticated); // Check if user is authenticated

export default router;
