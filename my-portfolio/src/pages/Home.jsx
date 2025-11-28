import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import "../App.css";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <section className="center-section">
      {!user && (
        <>
          <h2>Welcome</h2>
          <p>Sign in to access your portfolio dashboard</p>
        </>
      )}

      {user && (
        <>
          <h2>Dashboard</h2>
          <p>Welcome, {user.fullName}! You are now signed in.</p>

          {user.role === "admin" && (
            <p style={{ color: "green" }}>
              You are logged in as <strong>Admin</strong>. You have full control.
            </p>
          )}

          {user.role === "user" && (
            <p style={{ color: "blue" }}>
              You are logged in as <strong>User</strong>. You can view content only.
            </p>
          )}
        </>
      )}

      {/* 👇 This paragraph is the CI/CD update */}
      <p style={{ marginTop: "20px" }}>
        This portfolio continues to evolve as I enhance my skills in full-stack development and cloud deployment.
      </p>
    </section>
  );
}
