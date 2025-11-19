import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from "../controllers/project.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

/* ---------- PUBLIC ROUTES (NO LOGIN NEEDED) ---------- */
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

/* ---------- ADMIN ONLY ROUTES ---------- */
router.post("/", authMiddleware, isAdmin, createProject);
router.put("/:id", authMiddleware, isAdmin, updateProject);
router.delete("/:id", authMiddleware, isAdmin, deleteProject);
router.delete("/", authMiddleware, isAdmin, deleteAllProjects);

export default router;
