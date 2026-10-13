import React from "react";
import { Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthorLayout from "./components/AuthorPageComponents/AuthorLayout";
import MyPosts from "./components/AuthorPageComponents/MyPosts";
import WritePost from "./components/AuthorPageComponents/WritePost";
import PostDetail from "./components/AuthorPageComponents/PostDetail";
import ProfilePage from "./components/AuthorPageComponents/ProfilePage";
import SettingsPage from "./components/AuthorPageComponents/SettingsPage";
import SearchPage from "./components/AuthorPageComponents/SearchPage";
import AuthorPage from "./author/AuthorPage";
import PageBackground from "./components/LandingPageComponents/PageBackground";
import AdminProtectedRoute from "./admin/AdminProtectedRoutes";
import AdminDashboard from "./components/AdminPageComponents/AdminDashboard";
import AdminLayout from "./components/AdminPageComponents/AdminLayout"
import AdminPostsPage from "./components/AdminPageComponents/AdminPostsPage";
import AdminUsersPage from "./components/AdminPageComponents/AdminUsersPage";
import "./App.css";

export default function App() {
  return (
    <>
      <PageBackground />
      <div className="app-shell">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AuthorLayout />}>
              <Route path="/Home" element={<AuthorPage />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/write" element={<WritePost />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/Home" replace />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/posts" element={<AdminPostsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </>
  );
}
