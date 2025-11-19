import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";
import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Correct CORS (only the real frontend origin)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);



app.use(cookieParser());

// AUTH routes — public
app.use("/api/auth", authRoutes);

// CONTACT — submit allowed without login
app.use("/api/contacts", contactRoutes);

// USER — admin only
app.use("/api/users", authMiddleware, userRoutes);

// QUALIFICATIONS — user must be logged in; controller decides admin vs user
app.use("/api/qualifications", authMiddleware, qualificationRoutes);

// PROJECTS — user must be logged in; controller decides admin vs user
app.use("/api/projects", authMiddleware, projectRoutes);

export default app;
