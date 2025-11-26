import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve('./server/.env') });

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || "7d",
};

export default config;
