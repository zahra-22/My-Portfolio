import React from "react";                                // ← ADD THIS
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
    if (isAdmin) fetchContacts();
  }, [isAdmin]);

  const fetchContacts = async () => {
    try {
      const res = await apiRequest("/api/contacts", "GET");
      if (Array.isArray(res)) setContacts(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const [first, ...rest] = fullName.trim().split(" ");
    const firstname = first;
    const lastname = rest.join(" ") || "N/A";

    //  send all 5 fields to the backend
    const data = { firstname, lastname, email, phone, message };

    try {
  if (editingId) {
    if (!isAdmin) {
      setError("Only admins can edit messages.");
      return;
    }
    await apiRequest(`/api/contacts/${editingId}`, "PUT", data);
    setEditingId(null);
  } else {
    await apiRequest("/api/contacts", "POST", data);
  }

  setSuccess("Saved successfully!");
  setFullName("");
  setEmail("");
  setPhone("");
  setMessage("");

  if (isAdmin) fetchContacts();
} catch (err) {
  setError("Something went wrong — please try again.");
}

  };

  const startEdit = (c) => {
    setEditingId(c._id);
    setFullName(`${c.firstname} ${c.lastname}`);
    setEmail(c.email);
    setPhone(c.phone || "");
    setMessage(c.message || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await apiRequest(`/api/contacts/${id}`, "DELETE");
    fetchContacts();
  };

  return (
    <section className="center-section">
      <h2>Contact Me</h2>

      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <label htmlFor="fullName">Full Name</label>
<input
  id="fullName"
  type="text"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  required
/>


        <label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>


        <label htmlFor="phone">Phone</label>
<input
  id="phone"
  type="text"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>


        <label htmlFor="message">Message</label>
<textarea
  id="message"
  rows="4"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
></textarea>


        <button type="submit" className="btn-primary">
          {editingId ? "Update Message" : "Send Message"}
        </button>
      </form>

      {isAdmin && (
        <>
          <h2>All Messages</h2>

          {contacts.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.firstname} {c.lastname}</td>
                    <td>{c.email}</td>
                    <td>{c.phone || "—"}</td>
                    <td>{c.message || "—"}</td>
                    <td>
                      <button onClick={() => startEdit(c)}>Edit</button>
                      <button onClick={() => handleDelete(c._id)} className="danger">
                        Delete
                      </button>
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
