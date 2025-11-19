import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers
} from "../controllers/user.controller.js";

const router = express.Router();

// ADMIN ONLY — manage users
router.post("/", authMiddleware, isAdmin, createUser);
router.get("/", authMiddleware, isAdmin, getUsers);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.put("/:id", authMiddleware, isAdmin, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.delete("/", authMiddleware, isAdmin, deleteAllUsers);

export default router;
