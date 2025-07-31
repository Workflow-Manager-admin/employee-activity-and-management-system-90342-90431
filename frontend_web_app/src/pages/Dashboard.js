import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Dashboard, role-aware overview.
 * For admin users, displays the module grid as the main dashboard content.
 */
function Dashboard() {
  const { user, logout } = useUser();
  
  if (!user) return <div>Loading…</div>;

  if (user.role === "employee") {
    return (
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Your Daily Work Logs</div>
          <div>See and edit today's report, submit a new one, or review past history.</div>
        </div>
        <div className="card">
          <div className="card-title">Leave Status</div>
          <div>Any pending approvals or recent leave requests will show here.</div>
        </div>
      </div>
    );
  }

  if (user.role === "manager") {
    return (
      <div className="grid-3">
        <div className="card">
          <div className="card-title">Team Log Summary</div>
          <div>Review today's log submissions, feedback actions, and blockers by your team.</div>
        </div>
        <div className="card">
          <div className="card-title">Pending Leave Requests</div>
          <div>Approve or review team leave requests.</div>
        </div>
        <div className="card">
          <div className="card-title">Visual Reports</div>
          <div>See productivity and activity trends, graphical views.</div>
        </div>
      </div>
    );
  }

  if (user.role === "admin") {
    const adminModules = [
      {
        title: "Employee Management",
        description: "Add, edit, and manage all employee profiles and records.",
        icon: "👥",
        path: "/admin-panel" 
      },
      {
        title: "Reporting",
        description: "Generate and view detailed reports on employee activity.",
        icon: "📊",
        path: "/reporting"
      },
      {
        title: "Bulk Onboarding",
        description: "Import multiple employees at once using a CSV file.",
        icon: "📤",
        path: "/onboarding"
      },
      {
        title: "Audit Trail",
        description: "Track all system-wide changes and administrative actions.",
        icon: "🔍",
        path: "/audit-trail"
      },
      {
        title: "System Settings",
        description: "Configure application settings, notifications, and more.",
        icon: "⚙️",
        path: "#"
      },
      {
        title: "Hierarchy Management",
        description: "Define and manage reporting structures and roles.",
        icon: "🔗",
        path: "/hierarchy"
      },
      {
        title: "Calendar View",
        description: "View work logs and leave schedules in calendar format.",
        icon: "📅",
        path: "/calendar"
      },
      {
        title: "Notifications",
        description: "View system notifications and alerts.",
        icon: "🔔",
        path: "/notifications"
      }
    ];

    return (
      <div>
        <h2 style={{
          marginTop: 0, 
          marginBottom: 24, 
          letterSpacing: "0.7px", 
          fontWeight: 800,
          color: "var(--primary-blue)", 
          fontSize: "2rem"
        }}>Admin Dashboard</h2>
        
        <div className="admin-grid">
          {adminModules.map((module, index) => (
            <Link to={module.path} key={index} className="module-card">
              <div className="module-card-icon">{module.icon}</div>
              <div className="module-card-title">{module.title}</div>
              <div className="module-card-description">{module.description}</div>
            </Link>
          ))}
          
          {/* Logout module card for admins */}
          <div 
            className="module-card" 
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            <div className="module-card-icon">🚪</div>
            <div className="module-card-title">Logout</div>
            <div className="module-card-description">Sign out of your admin account.</div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Welcome to TATA ELXSI</div>;
}

export default Dashboard;
