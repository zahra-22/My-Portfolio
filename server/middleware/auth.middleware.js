import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default function authMiddleware(req, res, next) {
  const token =
    req.cookies?.jwt ||
    req.headers.authorization?.split(" ")[1]; // supports mobile & API tools

  //  Allow public access on missing cookie
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    req.user = null;
    next(); // allow public access but not admin actions
  }
}
