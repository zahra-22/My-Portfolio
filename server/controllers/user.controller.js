import User from "../models/user.model.js";
import { handleError } from "./error.controller.js";

// CREATE USER (Admin only)
export const createUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Only Admin can create new users" });

    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json({ message: "User created", savedUser });
  } catch (err) {
    handleError(res, err, 400);
  }
};

// GET ALL USERS (Admin only)
export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Only Admin can view all users" });

    const users = await User.find();
    res.json(users);
  } catch (err) {
    handleError(res, err);
  }
};

// GET USER BY ID (Admin or profile owner)
export const getUserById = async (req, res) => {
  try {
    if (req.user.role !== "Admin" && req.user.id !== req.params.id)
      return res.status(403).json({ message: "Access denied" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    handleError(res, err);
  }
};

// UPDATE USER (Admin or profile owner)
export const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin" && req.user.id !== req.params.id)
      return res.status(403).json({ message: "Only Admin or profile owner can update" });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json({ message: "User updated", updatedUser });
  } catch (err) {
    handleError(res, err, 400);
  }
};

// DELETE USER (Admin only)
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Only Admin can delete users" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE ALL USERS (Admin only)
export const deleteAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin")
      return res.status(403).json({ message: "Only Admin can delete ALL users" });

    await User.deleteMany();
    res.json({ message: "All users deleted" });
  } catch (err) {
    handleError(res, err);
  }
};
