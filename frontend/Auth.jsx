import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // Contient l'id, le nom, le rôle...
      } catch (error) {
        console.log("Token invalide");
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Auth.Provider value={{ user, login, logout }}>
      {children}
    </Auth.Provider>
  );
};
