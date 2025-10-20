import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { requireSignIn } from "./controllers/auth.controller.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", requireSignIn, (req, res) => {
  res.json({ message: "You have access to this protected route", userId: req.user._id });
});

export default app;
