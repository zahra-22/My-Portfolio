import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    // Password hashing handled by Mongoose pre-save hook
    const user = await User.create({
      fullName,
      email,
      password,
      role: role || "user"
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    // Store token in cookie — localhost-friendly settings
   res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,          // required for HTTPS (Netlify)
    sameSite: "None",      // allows cross-site cookies
    path: "/",
});




    return res.json({
      message: "Signin successful",
      token, // helps frontend AuthContext
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// SIGNOUT
export const signout = (req, res) => {
  res.clearCookie("jwt", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
});


  return res.status(200).json({ message: "Signout successful" });
};

