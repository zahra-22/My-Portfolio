import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

// Pages
import Signup from "./pages/Signup.js";
import Signin from "./pages/Signin.js";
import Home from "./pages/Home.jsx";                     // Homepage
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.js";
import Qualifications from "./pages/Qualifications.js";
import Projects from "./pages/Projects.jsx";
import AdminContacts from "./pages/AdminContacts.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Pages */}
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/qualifications"
          element={
            <PrivateRoute>
              <Qualifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        {/* Admin-only */}
        <Route
          path="/admin/contacts"
          element={
            <PrivateRoute>
              {user?.role === "admin" ? <AdminContacts /> : <Home />}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
