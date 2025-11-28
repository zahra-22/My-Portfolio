import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const router = express.Router();

/* ─────────────────────────────── SIGNUP ─────────────────────────────── */
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Store as plain text (matching current assignment requirements)
    const user = await User.create({
      fullName,
      email,
      password,
      role: role || "user",
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────── SIGNIN ─────────────────────────────── */
/* Supports BOTH:
   ✔ old accounts where password was hashed
   ✔ new accounts stored in plain text
*/
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare hashed OR plain
    const hashedMatch = await bcrypt.compare(password, user.password);
    const plainMatch = user.password === password;

    if (!hashedMatch && !plainMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // required for HTTPS
      sameSite: "None",      // required for Netlify + Render
      path: "/",
    });

    return res.json({
      message: "Signin successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────── SIGNOUT ─────────────────────────────── */
router.post("/signout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  return res.json({ message: "Signed out successfully" });
});

/* ─────────────────────────────── AUTH / ME ─────────────────────────────── */
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(null);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return res.json(user || null);
  } catch {
    return res.json(null);
  }
});

export default router;
