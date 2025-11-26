import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";
import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://zahra22-portfolio.netlify.app"
];

// CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Allow cookies (JWT) across domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// AUTH routes — public
app.use("/api/auth", authRoutes);

// CONTACT — submit allowed without login
app.use("/api/contacts", contactRoutes);

// USER — admin only
app.use("/api/users", authMiddleware, userRoutes);

// QUALIFICATIONS — user must be logged in
app.use("/api/qualifications", authMiddleware, qualificationRoutes);

// PROJECTS — user must be logged in
app.use("/api/projects", authMiddleware, projectRoutes);

export default app;
