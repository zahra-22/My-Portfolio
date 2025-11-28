import { useState, useContext, useEffect } from "react";
import { apiRequest } from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../App.css";

export default function Qualifications() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const [qualifications, setQualifications] = useState([]);
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [completion, setCompletion] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadQuals();
  }, []);

  const loadQuals = async () => {
    const res = await apiRequest("/api/qualifications", "GET");
    setQualifications(Array.isArray(res) ? res : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    try {
      await apiRequest("/api/qualifications", "POST", {
        title, firstname, lastname, email, completion, description
      });
      setSuccess("Qualification added!");

      setTitle(""); setFirstname(""); setLastname(""); setEmail("");
      setCompletion(""); setDescription("");
      loadQuals();
    } catch {
      setError("Only admins can add qualifications");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this qualification?")) return;
    await apiRequest(`/api/qualifications/${id}`, "DELETE");
    loadQuals();
  };

  return (
    <section className="center-section">
      <h2>Qualifications</h2>

      {isAdmin && (
        <form className="form-container" onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>First Name</label>
          <input value={firstname} onChange={(e) => setFirstname(e.target.value)} required />

          <label>Last Name</label>
          <input value={lastname} onChange={(e) => setLastname(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Completion Date</label>
          <input type="date" value={completion} onChange={(e) => setCompletion(e.target.value)} required />

          <label>Description</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />

          <button className="btn-primary">Add Qualification</button>
        </form>
      )}

      <div className="qualification-list">
        {qualifications.length === 0 ? (
          <p>No qualifications yet.</p>
        ) : (
          qualifications.map((q) => (
            <div key={q._id} className="qualification-card">
              <h3>{q.title}</h3>
              <p>{q.firstname} {q.lastname} – {q.email}</p>
              <small>Completed: {new Date(q.completion).toLocaleDateString()}</small>
              <p>{q.description}</p>

              {isAdmin && (
                <button className="danger" onClick={() => handleDelete(q._id)}>Delete</button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
