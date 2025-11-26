import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default function authMiddleware(req, res, next) {
  const token =
    req.cookies?.jwt ||
    req.headers.authorization?.split(" ")[1];

  // no token → block access
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
