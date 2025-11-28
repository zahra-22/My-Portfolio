import { createContext, useState, useEffect } from "react";
import { apiRequest } from "../api.js";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // FIXED: removed duplicate /api — now it matches the backend route
        const res = await apiRequest("/api/auth/me", "GET");

        if (res && res._id) {
          setUser(res);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
