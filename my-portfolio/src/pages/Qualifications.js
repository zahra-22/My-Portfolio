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
    loadQualifications();
  }, []);

  const loadQualifications = async () => {
    try {
      const res = await apiRequest("/qualifications", "GET");
      setQualifications(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await apiRequest("/qualifications", "POST", {   // 🔥 res removed
        title,
        firstname,
        lastname,
        email,
        completion,
        description,
      });

      setSuccess("Qualification added!");
      setTitle("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setCompletion("");
      setDescription("");
      loadQualifications();
    } catch {
      setError("Only admins can add qualifications.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this qualification?")) return;

    try {
      await apiRequest(`/qualifications/${id}`, "DELETE");
      loadQualifications();
    } catch {
      alert("Only admins can delete qualifications");
    }
  };

  return (
    <section className="center-section">
      <h2>Qualifications</h2>
      <p>List of education and certifications</p>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="form-container">
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
          <input
            type="date"
            value={completion}
            onChange={(e) => setCompletion(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button className="btn-primary" type="submit">Add Qualification</button>
        </form>
      )}

      <div className="qualification-list">
        {qualifications.length === 0 ? (
          <p>No qualifications available.</p>
        ) : (
          qualifications.map((q) => (
            <div key={q._id} className="qualification-card">
              <h3>{q.title}</h3>
              <p>{q.firstname} {q.lastname} – {q.email}</p>
              <small>Completed: {new Date(q.completion).toLocaleDateString()}</small>
              <p>{q.description}</p>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(q._id)}
                  style={{ marginTop: "10px" }}
                  className="danger"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
