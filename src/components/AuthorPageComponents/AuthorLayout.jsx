import React from "react";
import { Outlet, useLocation } from "react-router";
import AuthorNavbar from "./AuthorNavbar";
import AuthorSidebar from "./AuthorSidebar";
import TrendingSidebar from "./TrendingSidebar";
import "./AuthorLayout.css";

function AuthorLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname.toLowerCase() === "/home";

  return (
    <div className="author-page">
      <AuthorNavbar />

      <div className={`author-layout ${isHomePage ? "" : "author-layout-page"}`}>
        <AuthorSidebar />

        <main className="author-main">
          <Outlet />
        </main>

        {isHomePage && (
          <aside className="author-right">
            <TrendingSidebar />
          </aside>
        )}
      </div>
    </div>
  );
}

export default AuthorLayout;
