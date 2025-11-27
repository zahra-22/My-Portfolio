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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://zahra22-portfolio.netlify.app"
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/qualifications", authMiddleware, qualificationRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);

export default app;
