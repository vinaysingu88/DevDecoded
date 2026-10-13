import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

// Login and registration are for signed-out users. Keep the landing page public.
export default function PublicRoute() {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("access"));

  if (isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
}
