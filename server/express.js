import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";
import { requireSignIn } from "./controllers/auth.controller.js";

const app = express();

// Middleware
app.use(express.json());

// Register API routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", requireSignIn, (req, res) => {
  res.json({ message: "You have access to this protected route", userId: req.user._id });
});

export default app;
