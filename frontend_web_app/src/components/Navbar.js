import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Mobile-responsive hamburger navbar for admin dashboard navigation.
 * Shows hamburger icon, reveals nav when open. Role-aware.
 */
function Navbar({ open, onToggle, onNavigate }) {
  const { user, logout } = useUser();

  if (!user) return null;

  // Simple icons using text; you may replace with SVG icons if assets provided
  const hamburgerIcon = (
    <span style={{
      display: "inline-block",
      cursor: "pointer",
      padding: 7,
      fontSize: "2rem",
      userSelect: "none",
      lineHeight: 1,
      marginRight: 10,
    }} aria-label="Open navigation" onClick={onToggle}>
      &#9776; {/* Unicode hamburger */}
    </span>
  );
  const closeIcon = (
    <span style={{
      display: "inline-block",
      cursor: "pointer",
      fontSize: "2.1rem",
      userSelect: "none",
      lineHeight: 1,
      marginRight: 10,
      color: "var(--accent-pink)"
    }} aria-label="Close navigation" onClick={onToggle}>
      &times;
    </span>
  );

  // All links copied from Sidebar.js for admin role
  return (
    <nav className="admin-navbar" style={{
      position: "relative",
      zIndex: 1100
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "0.6em 1.2em",
        background: "var(--primary-blue)",
        color: "white",
        minHeight: 56,
      }}>
        {!open ? hamburgerIcon : closeIcon}
        <div style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          marginLeft: 8
        }}>
          Admin Menu
        </div>
      </div>
      {open && (
        <div className="admin-navbar-dropdown">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Dashboard</NavLink>
          <NavLink
            to="/admin-panel"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Admin Panel</NavLink>
          <NavLink
            to="/reporting"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Reporting</NavLink>
          <NavLink
            to="/audit-trail"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Audit Trail</NavLink>
          <NavLink
            to="/hierarchy"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Hierarchy</NavLink>
          <NavLink
            to="/onboarding"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Onboarding</NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Calendar</NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            onClick={onNavigate}
          >Notifications</NavLink>
          <button
            className="button-secondary"
            onClick={() => { logout(); onNavigate(); }}
            style={{ width: "90%", margin: "1.2em 5%", display: "block" }}
          >Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
