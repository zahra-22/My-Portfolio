import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, deleteAllUsers } from "../controllers/user.controller.js";
import { requireSignin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/", requireSignin, getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllUsers);

export default router;
