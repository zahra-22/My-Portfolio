import express from "express";
import {
  getAllQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualification.controller.js"; // <-- match filename exactly


const router = express.Router();

router.get("/", getAllQualifications);
router.get("/:id", getQualificationById);
router.post("/", createQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualification);
router.delete("/", deleteAllQualifications);

export default router;
