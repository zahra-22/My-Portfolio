import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";

// Sign up (optional if you already have user creation in user.controller)
export const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword
    });
    const savedUser = await user.save();
    res.status(201).json({ message: "User registered", user: savedUser });
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

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

// Sign out (client usually deletes token)
export const signOut = (req, res) => {
  res.json({ message: "Signed out successfully" });
};

// Middleware to protect routes
export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Access denied. No token provided." });

    const token = authHeader.split(" ")[1]; // expects "Bearer <token>"
    if (!token)
      return res.status(401).json({ message: "Access denied. Invalid token." });

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


