import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://YOUR_NETLIFY_NAME.netlify.app"
];

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
