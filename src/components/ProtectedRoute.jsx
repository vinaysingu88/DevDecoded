import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("access"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
