import { Router } from "express";
import { loginUser } from "../controllers/authController.js";

const router = Router();

// User Routes
router.get("/login", loginUser); // Logging in a user

export default router;
