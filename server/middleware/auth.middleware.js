import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default function authMiddleware(req, res, next) {
  const token =
    req.cookies?.jwt ||
    req.headers.authorization?.split(" ")[1];

  // If no token → allow request but mark user as guest
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    // Token exists but is invalid → treat as guest
    req.user = null;
    next();
  }
}
