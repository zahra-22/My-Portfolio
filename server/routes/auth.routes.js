import express from "express"; // <- Make sure this is at the top
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

// Routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

export default router;
