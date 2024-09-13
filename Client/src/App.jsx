import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Library from "./components/Library.jsx";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:3000/session", {
          withCredentials: true,
        });
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Session check failed", error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>; // Add a loader while checking session

  return (
    <BrowserRouter>
      <Routes>
        {/* Check if user is logged in */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/library"
          element={isLoggedIn ? <Library /> : <Navigate to="/login" replace />}
        />
        {/* Google OAuth callback */}
        <Route path="/auth/google/callback" element={<Home />} />

        {/* Default route: redirect if not logged in */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
