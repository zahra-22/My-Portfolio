import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded; // { _id: ... }
    next();
  });
};
