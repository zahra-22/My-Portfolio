import config from "./config/config.js";  // backend config
import app from "./express.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

// Cookie parser for JWT cookies
app.use(cookieParser());

// Auth routes
app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB:", mongoose.connection.name);
  })
  .catch((err) => console.error("Database connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Your Portfolio Application</h1>");
});

// Start server
app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);
