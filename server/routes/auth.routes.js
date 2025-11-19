import express from "express";
const router = express.Router();

import { signup, signin, signout } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);

// Get currently logged-in user (used for frontend persistence)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error retrieving user info" });
  }
});

// Logout (must be logged in)
router.get("/signout", authMiddleware, signout);

export default router;
