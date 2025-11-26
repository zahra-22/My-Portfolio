import React from "react";
import "../App.css";

export default function About() {
  return (
    <section className="center-section">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <img
          src="/projects/Headshot.jpg"
          alt="Headshot"
          className="headshot"
        />

        <div style={{ maxWidth: "600px", textAlign: "center" }}>
          <h2>About Me</h2>
          <p><strong>Zahra Aden</strong></p>
          <p>
            I'm a motivated Health Informatics student interested in building digital
            tools that improve healthcare workflows and productivity.
          </p>
          <p>
            Resume:{" "}
            <a
              href="/ZahraAdenResume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-teal-600 underline"
            >
              Download PDF
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
