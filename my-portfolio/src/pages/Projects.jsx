import { useState, useContext, useEffect } from "react";
import { apiRequest } from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../App.css";

export default function Projects() {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await apiRequest("/projects", "GET"); // FIXED
      setProjects(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await apiRequest("/projects", "POST", {   // 🔥 res removed (fix)
        title,
        description,
        link,
      });

      setSuccess("Project added successfully!");
      setTitle("");
      setDescription("");
      setLink("");
      loadProjects();
    } catch {
      setError("Only admins can add projects");
    }
  };

  const startEditing = (project) => {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditLink(project.link);
  };

  const handleUpdate = async (id) => {
    try {
      await apiRequest(`/projects/${id}`, "PUT", {   // FIXED
        title: editTitle,
        description: editDescription,
        link: editLink,
      });
      setEditingId(null);
      loadProjects();
    } catch {
      alert("Only admins can update projects");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await apiRequest(`/projects/${id}`, "DELETE"); // FIXED
      loadProjects();
    } catch {
      alert("Only admins can delete projects");
    }
  };

  return (
    <section className="center-section">
      <h2>Projects</h2>
      <p>Portfolio projects displayed below</p>

      {user?.role === "admin" && (
        <form onSubmit={handleAdd} className="form-container">
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description</label>
          <textarea
            value={description}
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Link (optional)</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} />

          <button type="submit" className="btn-primary">Add Project</button>
        </form>
      )}

      <div className="project-list">
        {projects.length === 0 ? (
          <p>No projects added yet</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              {editingId === project._id ? (
                <>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <textarea
                    rows="3"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></textarea>
                  <input value={editLink} onChange={(e) => setEditLink(e.target.value)} />

                  <button onClick={() => handleUpdate(project._id)} className="btn-primary">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="btn-secondary">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      Visit Project
                    </a>
                  )}

                  {user?.role === "admin" && (
                    <div className="project-controls">
                      <button onClick={() => startEditing(project)}>Edit</button>
                      <button onClick={() => handleDelete(project._id)} className="danger">
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
