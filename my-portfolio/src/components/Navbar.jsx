import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { apiRequest } from "../api.js";
import { useNavigate, NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest("/auth/signout", "GET");
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <h2 className="logo" onClick={() => navigate("/")}>
        <span className="logo-badge">ZA</span>
      </h2>

      {/* Nav Links */}
      <div className="nav-links">
        {!user && (
          <>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
              Signup
            </NavLink>
            <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
              Signin
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
            <NavLink to="/qualifications" className={({ isActive }) => (isActive ? "active" : "")}>
              Qualifications
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
              Projects
            </NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin/contacts" className={({ isActive }) => (isActive ? "active" : "")}>
            Messages
          </NavLink>
        )}
      </div>

      {/* Logout */}
      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}
