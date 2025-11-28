import express from "express";
import Contact from "../models/contact.model.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * POST /api/contacts
 * Allow any user to submit a contact message
 */
router.post("/", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("POST /api/contacts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/contacts
 * Admin only — view all submitted messages
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can view messages" });
    }

    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("GET /api/contacts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
