import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../App.css";

export default function AdminContacts() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") loadMessages();
  }, [user]);

  const loadMessages = async () => {
    try {
      const res = await apiRequest("/contacts", "GET"); // FIXED
      setMessages(Array.isArray(res) ? res : []);
    } catch {
      setError("Failed to load messages");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await apiRequest(`/contacts/${id}`, "DELETE"); // FIXED
      loadMessages();
    } catch {
      alert("Only admins can delete messages");
    }
  };

  return (
    <section className="center-section">
      <h2>Contact Messages</h2>
      <p>Messages received from the Contact page</p>

      {!user && <p className="form-error">You must be logged in to view messages.</p>}
      {user && user.role !== "admin" && (
        <p className="form-error">Only administrators can view messages.</p>
      )}

      {user && user.role === "admin" && (
        <>
          {error && <p className="form-error">{error}</p>}

          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <div className="message-list">
              {messages.map((msg) => (
                <div key={msg._id} className="message-card">
                  <h3>{msg.firstname} {msg.lastname}</h3>
                  <p><strong>Email:</strong> {msg.email}</p>
                  <p><strong>Phone:</strong> {msg.phone || "—"}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <button
                    className="danger"
                    onClick={() => handleDelete(msg._id)}
                    style={{ marginTop: "10px" }}
                  >
                    Delete Message
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
