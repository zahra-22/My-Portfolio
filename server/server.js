import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "./config.js";   // <-- import config
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Allowed domains (local + Netlify)
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// JSON + Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/contacts", contactRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running successfully " });
});

// Start server
const PORT = config.port;
app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);
