import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authMiddleware from "./middleware/auth.middleware.js";

const app = express(); // MUST come before app.use()

// Allowed domains (local + Netlify)
const allowedOrigins = [
  "http://localhost:3000",
  "https://zahra22-portfolio.netlify.app"   // your REAL Netlify URL
];

// CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Required response headers for cookies + CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// JSON body, URL-encoded body + cookie parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/contacts", contactRoutes);

// Default root test
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running successfully 🚀" });
});

// SERVER LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on port ${PORT}`)
);
