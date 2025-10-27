import User from "../models/user.model.js"; 
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Sign up
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Sign in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.authenticate(password)) {
      return res.status(401).json({ message: "Email and password do not match" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: "1h" });

    res.json({
      message: "Signed in successfully",
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Sign out
export const signOut = (req, res) => {
  // JWT is stateless, so signout is handled on client-side
  res.json({ message: "Signed out successfully" });
};

// Middleware to protect routes
export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Access denied. No token provided." });

    const token = authHeader.split(" ")[1]; // expects "Bearer <token>"
    if (!token) return res.status(401).json({ message: "Access denied. Invalid token." });

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
