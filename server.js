import config from "./server/config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

mongoose.connect(config.mongoUri)
  .then(() => console.log("Connected to Portfolio database!"))
  .catch(err => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Your Portfolio Application</h1>");
});

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
