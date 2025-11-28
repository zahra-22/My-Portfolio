import { useState, useContext, useEffect } from "react";
import { apiRequest } from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../App.css";

export default function Projects() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

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
      const res = await apiRequest("/api/projects", "GET");
      setProjects(Array.isArray(res) ? res : []);
    } catch {
      setProjects([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await apiRequest("/api/projects", "POST", { title, description, link });
      setSuccess("Project added!");
      setTitle("");
      setDescription("");
      setLink("");
      loadProjects();
    } catch {
      setError("Only admins can add projects");
    }
  };

  const startEditing = (p) => {
    setEditingId(p._id);
    setEditTitle(p.title);
    setEditDescription(p.description);
    setEditLink(p.link);
  };

  const handleUpdate = async (id) => {
    try {
      await apiRequest(`/api/projects/${id}`, "PUT", {
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
    if (!window.confirm("Delete this project?")) return;
    try {
      await apiRequest(`/api/projects/${id}`, "DELETE");
      loadProjects();
    } catch {
      alert("Only admins can delete");
    }
  };

  return (
    <section className="center-section">
      <h2>Projects</h2>

      {isAdmin && (
        <form className="form-container" onSubmit={handleAdd}>
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

          <label>Link</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} />

          <button className="btn-primary">Add Project</button>
        </form>
      )}

      <div className="project-list">
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          projects.map((p) => (
            <div className="project-card" key={p._id}>
              {editingId === p._id ? (
                <>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <textarea rows="3" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  <input value={editLink} onChange={(e) => setEditLink(e.target.value)} />

                  <button className="btn-primary" onClick={() => handleUpdate(p._id)}>Save</button>
                  <button className="btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer">Visit Project</a>}

                  {isAdmin && (
                    <div className="project-controls">
                      <button onClick={() => startEditing(p)}>Edit</button>
                      <button className="danger" onClick={() => handleDelete(p._id)}>Delete</button>
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
