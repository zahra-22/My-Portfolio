import Project from "../models/project.js";

export const getAllProjects = async (req, res) => {
  try { res.json(await Project.find()); } 
  catch (err) { res.status(500).json({ message: err.message }); }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    res.status(201).json(await project.save());
  } catch (err) { res.status(400).json({ message: err.message }); }
};

export const updateProject = async (req, res) => {
  try { res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(400).json({ message: err.message }); }
};

export const deleteProject = async (req, res) => {
  try { await Project.findByIdAndDelete(req.params.id); res.json({ message: "Project deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteAllProjects = async (req, res) => {
  try { await Project.deleteMany(); res.json({ message: "All projects deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
