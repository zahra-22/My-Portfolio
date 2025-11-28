// server/routes/auth.routes.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();

// SIGNUP (no bcrypt, plain password for now)
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

    const user = await User.create({
      fullName,
      email,
      password,          // ⚠ plain text for simplicity
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

// SIGNIN (simple password check)
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not configured" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Cookie for auth/me
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,      // local dev
      sameSite: "Lax",
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

// AUTH ME - return logged-in user
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token || !process.env.JWT_SECRET) {
      return res.json(null);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return res.json(user || null);
  } catch (err) {
    return res.json(null);
  }
});

export default router;
