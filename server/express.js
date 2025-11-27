import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// ✅ All route imports must match exact filenames
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";

import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://zahra22-portfolio.netlify.app"
];

// CORS settings
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Required to allow cookies (JWT) across domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);
app.use("/api/qualifications", authMiddleware, qualificationRoutes);

// Health check route for Render
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

export default app;
