import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Admin Dashboard: All controls and views clearly visible (TATA ELXSI branded).
 * Renders admin dashboard only for authenticated admin users.
 */
function AdminPanel() {
  const { user } = useUser() || {};
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user || (user.role !== "admin" && user.role !== "Administrator")) {
    return (
      <div style={{
        padding: "3em", minHeight: "32vh", color: "var(--accent-pink)",
        fontWeight: 700, fontSize: "1.26em", textAlign: "center"
      }}>
        Admin access required.<br />
        You are not authorized to view this dashboard.
      </div>
    );
  }

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
    }
  ];

  return (
    <div style={{ position: "relative" }}>
      <Navbar open={menuOpen} onToggle={() => setMenuOpen(m => !m)} onNavigate={() => setMenuOpen(false)} />
      <div style={{ filter: menuOpen ? "blur(2px)" : "none", pointerEvents: menuOpen ? "none" : "auto", transition: "filter .2s" }}>
        <h2 style={{
          marginTop: 32, marginBottom: 24, letterSpacing: "0.7px", fontWeight: 800,
          color: "var(--primary-blue)", fontSize: "2rem"
        }}>Admin Dashboard</h2>
        
        <div className="admin-grid">
          {adminModules.map((module, index) => (
            <Link to={module.path} key={index} className="module-card">
              <div className="module-card-icon">{module.icon}</div>
              <div className="module-card-title">{module.title}</div>
              <div className="module-card-description">{module.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
