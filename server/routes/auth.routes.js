import express from "express";
import { signUp, signIn, signOut, requireSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

// Public routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

// Example protected route
router.get("/protected", requireSignIn, (req, res) => {
  res.json({ message: "You have access to this protected route", userId: req.user._id });
});

export default router;
