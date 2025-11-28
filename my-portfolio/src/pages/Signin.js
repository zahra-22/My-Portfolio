import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { apiRequest } from "../api.js";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signin() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // FIXED: Removed duplicate "/api"
      const res = await apiRequest("/auth/signin", "POST", { email, password });

      if (!res || !res.token) {
        setError("Invalid email or password");
        return;
      }

      // Save token and user
      localStorage.setItem("token", res.token);
      setUser(res.user);

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="center-section">
      <h2>Welcome Back</h2>
      <p>Sign in to access your portfolio dashboard</p>

      <form onSubmit={handleSignin} className="form-container">
        {error && <p className="form-error">{error}</p>}

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
          Sign In
        </button>
      </form>
    </section>
  );
}

export default Signin;
