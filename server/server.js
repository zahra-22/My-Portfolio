import config from "./config/config.js";
import app from "./express.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/user.routes.js";

app.use(cookieParser());

// API route prefixes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// DB connect
mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB:", mongoose.connection.name))
  .catch((err) => console.error("Database error:", err));

// Root
app.get("/", (req, res) => res.send("Portfolio API running"));

// Port
app.listen(config.port, () => console.log(`Backend running on port ${config.port}`));
