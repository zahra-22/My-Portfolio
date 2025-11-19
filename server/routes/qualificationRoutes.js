import express from "express";
import {
  getAllQualifications,
  createQualification,
  deleteQualification
} from "../controllers/qualification.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

// PUBLIC — View qualifications
router.get("/", getAllQualifications);

// ADMIN — Create
router.post("/", authMiddleware, isAdmin, createQualification);

// ADMIN — Delete
router.delete("/:id", authMiddleware, isAdmin, deleteQualification);

export default router;
