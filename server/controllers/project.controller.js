import Project from "../models/project.model.js"; // adjust name if model file differs

// GET all projects (public)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one project (public)
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new project (admin only)
export const createProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = await Project.create({
      title,
      description,
      link: link || "",
    });

    return res.status(201).json({
      message: "Project added successfully",
      project,
    });
  } catch (err) {
    console.error("🔥 PROJECT CREATE ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE project (admin only)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated successfully", project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE one project (admin only)
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ALL projects (admin only)
export const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
