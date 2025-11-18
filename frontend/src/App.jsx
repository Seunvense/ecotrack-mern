import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import LogActivity from "./pages/LogActivity";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://ecotrack-mern.onrender.com/api/auth/me",
          { credentials: "include" }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/log"
          element={
            user ? <LogActivity user={user} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
