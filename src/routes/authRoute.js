import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/authController.js";

const router = Router();

// User Routes
router.get("/login", loginUser); // Logging in a user
router.post("/logout", logoutUser); // Logging out a user

export default router;
