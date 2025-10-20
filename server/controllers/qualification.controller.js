import Qualification from "../models/qualification.js";

export const getAllQualifications = async (req, res) => {
  try { res.json(await Qualification.find()); } 
  catch (err) { res.status(500).json({ message: err.message }); }
};

export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) return res.status(404).json({ message: "Qualification not found" });
    res.json(qualification);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createQualification = async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    res.status(201).json(await qualification.save());
  } catch (err) { res.status(400).json({ message: err.message }); }
};

export const updateQualification = async (req, res) => {
  try { res.json(await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
};

export const deleteQualification = async (req, res) => {
  try { await Qualification.findByIdAndDelete(req.params.id); res.json({ message: "Qualification deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteAllQualifications = async (req, res) => {
  try { await Qualification.deleteMany(); res.json({ message: "All qualifications deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
