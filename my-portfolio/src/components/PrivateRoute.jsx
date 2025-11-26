import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in → redirect to signin
    return <Navigate to="/signin" replace />;
  }

  return children;
}
