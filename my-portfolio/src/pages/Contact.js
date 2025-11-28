import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../App.css";

export default function Contact() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isAdmin) loadMessages();
  }, [isAdmin]);

  const loadMessages = async () => {
    const res = await apiRequest("/api/contacts", "GET");
    if (Array.isArray(res)) setContacts(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const [first, ...rest] = fullName.trim().split(" ");
    const data = {
      firstname: first,
      lastname: rest.join(" ") || "N/A",
      email,
      phone,
      message
    };

    try {
      if (editingId) {
        await apiRequest(`/api/contacts/${editingId}`, "PUT", data);
        setEditingId(null);
        setSuccess("Message updated!");
      } else {
        await apiRequest("/api/contacts", "POST", data);
        setSuccess("Message sent!");
      }

      setFullName(""); setEmail(""); setPhone(""); setMessage("");
      if (isAdmin) loadMessages();
    } catch {
      setError("Something went wrong.");
    }
  };

  const startEdit = (m) => {
    setEditingId(m._id);
    setFullName(`${m.firstname} ${m.lastname}`);
    setEmail(m.email);
    setPhone(m.phone);
    setMessage(m.message);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await apiRequest(`/api/contacts/${id}`, "DELETE");
    loadMessages();
  };

  return (
    <section className="center-section">
      <h2>Contact</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <label>Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Message</label>
        <textarea rows="3" value={message} onChange={(e) => setMessage(e.target.value)} />

        <button className="btn-primary">{editingId ? "Update Message" : "Send Message"}</button>
      </form>

      {isAdmin && (
        <>
          <h2>Messages</h2>
          {contacts.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <table className="contact-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {contacts.map((m) => (
                  <tr key={m._id}>
                    <td>{m.firstname} {m.lastname}</td>
                    <td>{m.email}</td>
                    <td>{m.phone || "-"}</td>
                    <td>{m.message || "-"}</td>
                    <td>
                      <button onClick={() => startEdit(m)}>Edit</button>
                      <button className="danger" onClick={() => handleDelete(m._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
}
