import React from "react";
import { Navigate, Outlet } from "react-router";

function AdminProtectedRoute() {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;