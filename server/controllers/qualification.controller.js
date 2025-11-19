import Qualification from "../models/qualification.model.js";

// CREATE (Admin only — already working)
export const createQualification = async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json({
      message: "Qualification added successfully",
      qualification,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ — Get all qualifications (Public)
export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ createdAt: -1 });
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE — Admin only
export const deleteQualification = async (req, res) => {
  try {
    await Qualification.findByIdAndDelete(req.params.id);
    res.json({ message: "Qualification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
