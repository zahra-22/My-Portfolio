import config from "./server/config/config.js";  // backend config
import app from "./server/express.js";
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Portfolio database!"))
  .catch(err => console.error("Database connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Your Portfolio Application</h1>");
});

// Start server
app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
