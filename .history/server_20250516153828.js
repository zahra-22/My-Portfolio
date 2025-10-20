import config from "./config/config.js";
import app from "./server/express.js";
const assetsRouter = require("./server/assets-router");


app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});
app.use("/src", assetsRouter);
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
