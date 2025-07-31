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
  
  if (!user) {
    return (
      <div className="loading-text">
        <div className="loading-spinner"></div>
        Loading your dashboard...
      </div>
    );
  }

  if (user.role === "employee") {
    return (
      <div>
        <div style={{
          marginBottom: "32px",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, var(--primary-blue), var(--secondary-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px"
          }}>
            Welcome back, {user.name}!
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "var(--secondary-purple)",
            opacity: "0.8"
          }}>
            Here's your personalized employee dashboard
          </p>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">
              📝 Your Daily Work Logs
            </div>
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              See and edit today's report, submit a new one, or review past history.
            </p>
            <div className="status-indicator status-pending" style={{ marginBottom: "16px" }}>
              Today's Log: Pending
            </div>
            <div className="card-actions">
              <Link to="/work-log" className="button-primary" style={{ textDecoration: "none" }}>
                📋 Add Today's Log
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              🏖️ Leave Status
            </div>
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              Any pending approvals or recent leave requests will show here.
            </p>
            <div className="status-indicator status-completed" style={{ marginBottom: "16px" }}>
              No Pending Requests
            </div>
            <div className="card-actions">
              <Link to="/leave-requests" className="button-secondary" style={{ textDecoration: "none" }}>
                📅 Request Leave
              </Link>
            </div>
          </div>

          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-title">
              📊 Quick Stats
            </div>
            <div className="grid-3" style={{ marginTop: "20px" }}>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "800", 
                  color: "var(--success-green)",
                  marginBottom: "8px"
                }}>
                  12
                </div>
                <div style={{ color: "var(--secondary-purple)", fontWeight: "600" }}>
                  Logs This Month
                </div>
              </div>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "800", 
                  color: "var(--accent-yellow)",
                  marginBottom: "8px"
                }}>
                  3
                </div>
                <div style={{ color: "var(--secondary-purple)", fontWeight: "600" }}>
                  Leave Days Used
                </div>
              </div>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "800", 
                  color: "var(--primary-blue)",
                  marginBottom: "8px"
                }}>
                  87%
                </div>
                <div style={{ color: "var(--secondary-purple)", fontWeight: "600" }}>
                  Completion Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "manager") {
    return (
      <div>
        <div style={{
          marginBottom: "32px",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, var(--primary-blue), var(--secondary-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px"
          }}>
            Manager Dashboard
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "var(--secondary-purple)",
            opacity: "0.8"
          }}>
            Manage your team efficiently with these tools
          </p>
        </div>

        <div className="grid-3">
          <div className="card">
            <div className="card-title">
              👥 Team Log Summary
            </div>
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              Review today's log submissions, feedback actions, and blockers by your team.
            </p>
            <div style={{ marginBottom: "16px" }}>
              <div className="status-indicator status-completed" style={{ marginRight: "8px", marginBottom: "8px" }}>
                5 Completed
              </div>
              <div className="status-indicator status-pending">
                2 Pending
              </div>
            </div>
            <div className="card-actions">
              <Link to="/team-review" className="button-primary" style={{ textDecoration: "none" }}>
                📋 Review Team
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              ⏰ Pending Leave Requests
            </div>
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              Approve or review team leave requests.
            </p>
            <div className="status-indicator status-in-progress" style={{ marginBottom: "16px" }}>
              3 Awaiting Review
            </div>
            <div className="card-actions">
              <Link to="/leave-approvals" className="button-secondary" style={{ textDecoration: "none" }}>
                ✅ Approve Requests
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              📈 Visual Reports
            </div>
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              See productivity and activity trends, graphical views.
            </p>
            <div className="status-indicator status-completed" style={{ marginBottom: "16px" }}>
              Data Updated
            </div>
            <div className="card-actions">
              <button className="button-primary">
                📊 View Analytics
              </button>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: "32px" }}>
          <div className="card-title">
            🎯 Team Performance Overview
          </div>
          <div className="grid-2" style={{ marginTop: "20px" }}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ 
                fontSize: "2.5rem", 
                fontWeight: "800", 
                color: "var(--success-green)",
                marginBottom: "8px"
              }}>
                92%
              </div>
              <div style={{ color: "var(--secondary-purple)", fontWeight: "600" }}>
                Team Productivity
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ 
                fontSize: "2.5rem", 
                fontWeight: "800", 
                color: "var(--accent-yellow)",
                marginBottom: "8px"
              }}>
                7
              </div>
              <div style={{ color: "var(--secondary-purple)", fontWeight: "600" }}>
                Team Members
              </div>
            </div>
          </div>
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
        path: "/admin-panel",
        stats: "24 Employees"
      },
      {
        title: "Reporting",
        description: "Generate and view detailed reports on employee activity.",
        icon: "📊",
        path: "/reporting",
        stats: "12 Reports"
      },
      {
        title: "Bulk Onboarding",
        description: "Import multiple employees at once using a CSV file.",
        icon: "📤",
        path: "/onboarding",
        stats: "Ready to Use"
      },
      {
        title: "Audit Trail",
        description: "Track all system-wide changes and administrative actions.",
        icon: "🔍",
        path: "/audit-trail",
        stats: "156 Entries"
      },
      {
        title: "System Settings",
        description: "Configure application settings, notifications, and more.",
        icon: "⚙️",
        path: "#",
        stats: "All Configured"
      },
      {
        title: "Hierarchy Management",
        description: "Define and manage reporting structures and roles.",
        icon: "🔗",
        path: "/hierarchy",
        stats: "3 Levels"
      },
      {
        title: "Calendar View",
        description: "View work logs and leave schedules in calendar format.",
        icon: "📅",
        path: "/calendar",
        stats: "Current Month"
      },
      {
        title: "Notifications",
        description: "View system notifications and alerts.",
        icon: "🔔",
        path: "/notifications",
        stats: "5 New"
      }
    ];

    return (
      <div>
        <div style={{
          marginBottom: "40px",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, var(--primary-blue), var(--secondary-purple), var(--accent-pink))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "12px",
            letterSpacing: "0.5px"
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            fontSize: "1.2rem",
            color: "var(--secondary-purple)",
            opacity: "0.8",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Comprehensive system administration and employee management tools
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="card" style={{ marginBottom: "40px" }}>
          <div className="card-title">
            📊 System Overview
          </div>
          <div className="grid-3" style={{ marginTop: "24px" }}>
            <div style={{ textAlign: "center", padding: "24px" }}>
              <div style={{ 
                fontSize: "3rem", 
                fontWeight: "800", 
                background: "linear-gradient(45deg, var(--success-green), var(--accent-yellow))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "12px"
              }}>
                24
              </div>
              <div style={{ 
                color: "var(--primary-blue)", 
                fontWeight: "700",
                fontSize: "1.1rem"
              }}>
                Total Employees
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "24px" }}>
              <div style={{ 
                fontSize: "3rem", 
                fontWeight: "800", 
                background: "linear-gradient(45deg, var(--accent-yellow), var(--accent-pink))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "12px"
              }}>
                85%
              </div>
              <div style={{ 
                color: "var(--primary-blue)", 
                fontWeight: "700",
                fontSize: "1.1rem"
              }}>
                System Activity
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "24px" }}>
              <div style={{ 
                fontSize: "3rem", 
                fontWeight: "800", 
                background: "linear-gradient(45deg, var(--primary-blue), var(--secondary-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "12px"
              }}>
                7
              </div>
              <div style={{ 
                color: "var(--primary-blue)", 
                fontWeight: "700",
                fontSize: "1.1rem"
              }}>
                Active Managers
              </div>
            </div>
          </div>
        </div>
        
        <div className="admin-grid">
          {adminModules.map((module, index) => (
            <Link to={module.path} key={index} className="module-card">
              <div className="module-card-icon">{module.icon}</div>
              <div className="module-card-title">{module.title}</div>
              <div className="module-card-description">{module.description}</div>
              {module.stats && (
                <div style={{
                  marginTop: "12px",
                  padding: "6px 12px",
                  background: "linear-gradient(45deg, var(--light-bg), var(--bg-canvas))",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--primary-blue)",
                  border: "1px solid rgba(37, 72, 138, 0.1)"
                }}>
                  {module.stats}
                </div>
              )}
            </Link>
          ))}
          
          {/* Enhanced Logout module card for admins */}
          <div 
            className="module-card" 
            style={{ 
              cursor: "pointer",
              background: "linear-gradient(135deg, rgba(216, 29, 109, 0.05), rgba(164, 43, 141, 0.05))"
            }}
            onClick={logout}
          >
            <div className="module-card-icon">🚪</div>
            <div className="module-card-title" style={{ color: "var(--accent-pink)" }}>
              Logout
            </div>
            <div className="module-card-description">
              Sign out of your admin account securely.
            </div>
            <div style={{
              marginTop: "12px",
              padding: "6px 12px",
              background: "rgba(216, 29, 109, 0.1)",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "var(--accent-pink)",
              border: "1px solid rgba(216, 29, 109, 0.2)"
            }}>
              Secure Exit
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      color: "var(--primary-blue)"
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        marginBottom: "16px"
      }}>
        Welcome to TATA ELXSI
      </h1>
      <p style={{
        fontSize: "1.2rem",
        opacity: "0.8"
      }}>
        Employee Management System
      </p>
    </div>
  );
}

export default Dashboard;
