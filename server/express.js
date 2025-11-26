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

const allowedOrigins = [
  "http://localhost:3000",
  "https://zahra22-portfolio.netlify.app",
];

// CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.options("*", cors());

// Body + cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/qualifications", authMiddleware, qualificationRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);

export default app;
