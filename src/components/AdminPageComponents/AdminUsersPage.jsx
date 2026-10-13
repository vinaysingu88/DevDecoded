import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaSyncAlt,
  FaUserShield,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import api from "../../api/axios";
import "./AdminUsersPage.css";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/admin/users/");
      const data = response.data;
      setUsers(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load users. Check your admin permissions and API."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const name = user.name || user.username || "";
      const email = user.email || "";
      const role = (user.role || "AUTHOR").toUpperCase();

      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        String(user.id).includes(query);

      const matchesRole = roleFilter === "ALL" || role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const updateRole = async (user, newRole) => {
    const userId = user.id;

    if ((user.role || "").toUpperCase() === newRole) return;

    const confirmed = window.confirm(
      `Change ${user.name || user.email || `user #${userId}`} to ${newRole}?`
    );

    if (!confirmed) return;

    setUpdatingId(userId);
    setError("");
    setNotice("");

    try {
      await api.patch(`/api/admin/users/${userId}/role/`, {
        role: newRole,
      });

      setUsers((current) =>
        current.map((item) =>
          item.id === userId ? { ...item, role: newRole } : item
        )
      );

      setNotice(`User role updated to ${newRole}.`);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to update this user's role. Verify the endpoint and HTTP method."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const adminCount = users.filter(
    (user) => (user.role || "").toUpperCase() === "ADMIN"
  ).length;

  const authorCount = users.filter(
    (user) => (user.role || "").toUpperCase() === "AUTHOR"
  ).length;

  return (
    <div className="admin-users-page">
      <header className="admin-users-header">
        <div>
          <span className="admin-users-eyebrow">COMMUNITY MANAGEMENT</span>
          <h1>User Management</h1>
          <p>View community members and manage account roles.</p>
        </div>

        <button
          type="button"
          className="admin-users-refresh"
          onClick={fetchUsers}
          disabled={loading || updatingId !== null}
        >
          <FaSyncAlt className={loading ? "admin-users-spin" : ""} />
          Refresh
        </button>
      </header>

      <section className="admin-users-stats">
        <article className="admin-users-stat">
          <span className="admin-users-stat-icon total">
            <FaUsers />
          </span>
          <div>
            <p>Total users</p>
            <strong>{loading ? "—" : users.length}</strong>
          </div>
        </article>

        <article className="admin-users-stat">
          <span className="admin-users-stat-icon admins">
            <FaUserShield />
          </span>
          <div>
            <p>Administrators</p>
            <strong>{loading ? "—" : adminCount}</strong>
          </div>
        </article>

        <article className="admin-users-stat">
          <span className="admin-users-stat-icon authors">
            <FaUser />
          </span>
          <div>
            <p>Authors</p>
            <strong>{loading ? "—" : authorCount}</strong>
          </div>
        </article>
      </section>

      <section className="admin-users-panel">
        <div className="admin-users-panel-header">
          <div>
            <h2>Registered users</h2>
            <p>Search by name, email, or user ID.</p>
          </div>

          <div className="admin-users-search">
            <FaSearch />
            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search users"
            />
          </div>
        </div>

        <div className="admin-users-filters">
          {["ALL", "ADMIN", "AUTHOR"].map((role) => (
            <button
              type="button"
              key={role}
              className={`admin-users-filter ${
                roleFilter === role ? "active" : ""
              }`}
              onClick={() => setRoleFilter(role)}
            >
              {role === "ALL" ? "All users" : role}
            </button>
          ))}
        </div>

        {notice && <div className="admin-users-notice">{notice}</div>}
        {error && <div className="admin-users-error">{error}</div>}

        {loading ? (
          <div className="admin-users-state">
            <div className="admin-users-loader" />
            <p>Loading registered users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="admin-users-state">
            <span className="admin-users-empty-icon">
              <FaUsers />
            </span>
            <h3>No users found</h3>
            <p>Try another search or change the selected role filter.</p>
          </div>
        ) : (
          <div className="admin-users-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>User ID</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Change role</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => {
                  const role = (user.role || "AUTHOR").toUpperCase();
                  const name = user.name || user.username || "Unnamed user";

                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="admin-user-identity">
                          <span className="admin-user-avatar">
                            {role === "ADMIN" ? <FaUserShield /> : <FaUser />}
                          </span>
                          <span>
                            <strong>{name}</strong>
                            <small>{user.email || "No email available"}</small>
                          </span>
                        </div>
                      </td>

                      <td>#{user.id}</td>

                      <td>
                        <span
                          className={`admin-user-role ${
                            role === "ADMIN" ? "admin" : "author"
                          }`}
                        >
                          {role}
                        </span>
                      </td>

                      <td>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "—"}
                      </td>

                      <td>
                        <div className="admin-user-role-actions">
                          <FaUserEdit />
                          <select
                            aria-label={`Change role for ${name}`}
                            value={role}
                            disabled={updatingId !== null}
                            onChange={(e) => updateRole(user, e.target.value)}
                          >
                            <option value="AUTHOR">Author</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredUsers.length > 0 && (
          <footer className="admin-users-footer">
            Showing {filteredUsers.length} of {users.length} users
          </footer>
        )}
      </section>
    </div>
  );
}

export default AdminUsersPage;
