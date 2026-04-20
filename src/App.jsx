import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { api } from "./utils/api";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/api/v1/user/admin/me", { withCredentials: true });
        setIsAuthenticated(true);
        setAdmin(data.user);
        localStorage.setItem("isAuth", "true");
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
        localStorage.removeItem("isAuth");
        console.error("Error fetching admin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setIsAuthenticated, setAdmin]);

  if (loading) return <h2>Loading...</h2>;

  // ✅ ProtectedRoute wrapper
  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/login" />;

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<ProtectedRoute element={<AddNewDoctor />} />} />
        <Route path="/admin/addnew" element={<ProtectedRoute element={<AddNewAdmin />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
        <Route path="/doctors" element={<ProtectedRoute element={<Doctors />} />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;

