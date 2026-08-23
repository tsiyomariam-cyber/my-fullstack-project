import { useEffect, useState } from "react";
import Users from "./Users";
import afroawiLogo from '../assets/adminlogo.png';

/* ── SVG Icons ────────────────────────────────────────── */
const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IconClipboard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconBolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
      fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconEmpty = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7"/>
    <path d="M2 13h4l3 4h6l3-4h4"/>
  </svg>
);

/* ── Date formatter ───────────────────────────────────── */
function formatDate(raw) {
  if (!raw) return "—";
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  });
}

function formatDateTime(raw) {
  if (!raw) return "—";
  const d = new Date(raw);
  return (
    d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
}

/* ─────────────────────────────────────────────────────── */

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => { getRequests(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      alert(data.message);
      getRequests();
    } catch {
      alert("Cannot connect to server.");
    }
  };

  const pageTitle    = { dashboard: "Dashboard", requests: "Requests", users: "Users" };
  const pageSubtitle = {
    dashboard: "Overview of all user requests",
    requests:  "Review and manage incoming requests",
    users:     "Manage registered users",
  };

  return (
    <div className="admin-layout">

      {/* ════════════ SIDEBAR ════════════ */}
      <aside className="sidebar">

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <div className="brand-icon">
             <img className="brand-logo" src={afroawiLogo} alt="Afroawi Technologies" /> 
            </div>
            <div>
              <h2>AdminPanel</h2>
              <div className="brand-sub">Management System</div>
            </div>
          </div>
        </div>

        {/* Nav label */}
        <div className="sidebar-nav-label">Main Menu</div>

        {/* Nav */}
        <nav>
          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            <span className="nav-icon"><IconGrid /></span>
            Dashboard
          </button>

          <button
            className={activePage === "requests" ? "active" : ""}
            onClick={() => setActivePage("requests")}
          >
            <span className="nav-icon"><IconClipboard /></span>
            Requests
          </button>

          <button
            className={activePage === "users" ? "active" : ""}
            onClick={() => setActivePage("users")}
          >
            <span className="nav-icon"><IconUsers /></span>
            Users
          </button>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">A</div>
            <div>
              <div className="admin-name">Administrator</div>
              <div className="admin-role">Super Admin</div>
            </div>
          </div>
        </div>

      </aside>

      {/* ════════════ MAIN ════════════ */}
      <main className="main-area">

        {/* Top bar */}
        <header className="admin-header">
          <div>
            <h1>{pageTitle[activePage]}</h1>
            <p>{pageSubtitle[activePage]}</p>
          </div>
          <div className="header-actions">
            <button className="logout-button" onClick={onLogout}>
              <IconLogout /> Logout
            </button>
          </div>
        </header>

        {/* Users page */}
        {activePage === "users" && (
          <section className="requests-section">
            <Users />
          </section>
        )}

        {/* ── DASHBOARD OVERVIEW ── */}
        {activePage === "dashboard" && (
          <section className="requests-section">

            {/* Stats row */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">Total Requests</div>
                <div className="stat-value">{requests.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Pending</div>
                <div className="stat-value stat-warn">
                  {requests.filter(r => r.status.toLowerCase() === "pending").length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Approved</div>
                <div className="stat-value stat-success">
                  {requests.filter(r => r.status.toLowerCase() === "approved").length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Rejected</div>
                <div className="stat-value stat-danger">
                  {requests.filter(r => r.status.toLowerCase() === "rejected").length}
                </div>
              </div>
            </div>

            {/* Recent 5 requests */}
            <div className="table-wrapper">
              <div className="table-header">
                <h3>Recent Requests</h3>
                <span className="table-count">Latest 5</span>
              </div>
              {requests.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon"><IconEmpty /></div>
                  <p>No requests yet</p>
                  <span>New submissions will appear here</span>
                </div>
              ) : (
                <div className="table-overflow">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Request</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.slice(0, 5).map((r) => (
                        <tr key={r.id}>
                          <td><span className="id-cell">#{r.id}</span></td>
                          <td><span className="cell-primary">{r.name}</span></td>
                          <td style={{ color: "var(--gray-500)" }}>{r.email}</td>
                          <td style={{ maxWidth: 220, color: "var(--gray-600)" }}>{r.request_text}</td>
                          <td>
                            <span className={`status ${r.status.toLowerCase()}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <span className="date-cell">{formatDate(r.created_at)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </section>
        )}

        {/* ── REQUESTS FULL TABLE ── */}
        {activePage === "requests" && (
          <section className="requests-section">
            <div className="table-wrapper">

              <div className="table-header">
                <h3>All Requests</h3>
                <span className="table-count">{requests.length} total</span>
              </div>

              {requests.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon"><IconEmpty /></div>
                  <p>No requests yet</p>
                  <span>New submissions will appear here</span>
                </div>
              ) : (
                <div className="table-overflow">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Request</th>
                        <th>Submitted</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((r) => (
                        <tr key={r.id}>
                          <td><span className="id-cell">#{r.id}</span></td>
                          <td><span className="cell-primary">{r.name}</span></td>
                          <td style={{ color: "var(--gray-500)" }}>{r.email}</td>
                          <td style={{ color: "var(--gray-500)" }}>{r.phone}</td>
                          <td style={{ maxWidth: 200, color: "var(--gray-600)" }}>{r.request_text}</td>
                          <td>
                            <span className="date-cell">{formatDateTime(r.created_at)}</span>
                          </td>
                          <td>
                            <span className={`status ${r.status.toLowerCase()}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="approve-button"
                                onClick={() => updateStatus(r.id, "Approved")}
                              >
                                <IconCheck /> Approve
                              </button>
                              <button
                                className="reject-button"
                                onClick={() => updateStatus(r.id, "Rejected")}
                              >
                                <IconX /> Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
