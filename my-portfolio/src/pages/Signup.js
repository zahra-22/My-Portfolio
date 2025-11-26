import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api.js";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await apiRequest("/api/auth/signup", "POST", {
        fullName,
        email,
        password
      });

      if (res?.user) {
        setSuccess("Account created! Redirecting to Sign In...");
        setTimeout(() => navigate("/signin"), 1200);
      } else {
        setError(res.message || "Signup failed");
      }
    } catch (err) {
      setError("Signup failed — please try again.");
    }
  };

  return (
    <section className="center-section">
      <h2>Create an Account</h2>
      <p>Sign up to access your portfolio dashboard</p>

      <form onSubmit={handleSignup} className="form-container">
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name..."
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>
    </section>
  );
}
