import express from "express";
import {
  createContact,
  getContacts,
  deleteContact
} from "../controllers/contact.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

// USER — submit contact form (public)
router.post("/", createContact);

// ADMIN — view all contacts
router.get("/", authMiddleware, isAdmin, getContacts);

// ADMIN — delete a message
router.delete("/:id", authMiddleware, isAdmin, deleteContact);

export default router;
