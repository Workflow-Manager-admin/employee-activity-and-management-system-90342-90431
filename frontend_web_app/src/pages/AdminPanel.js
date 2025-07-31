import React, { useState } from "react";
import Navbar from "../components/Navbar";

/**
 * PUBLIC_INTERFACE
 * Admin: Employee CRUD, bulk onboarding, and settings.
 * Responsive: shows hamburger nav for navigation (sidebar/links), dashboard content always visible.
 */
function AdminPanel() {
  // Navbar open/hide state for hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Close nav after clicking a navigation option
  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Responsive Navbar for menu (visible at mobile sizes, but always present for admin panel) */}
      <Navbar open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} onNavigate={handleNavClick} />

      {/* Main content (dashboard) */}
      <div style={{ marginTop: 24, transition: "filter .2s", filter: menuOpen ? "blur(2px)" : "none", pointerEvents: menuOpen ? "none" : "auto" }}>
        <div className="card">
          <div className="card-title">Manage Employees</div>
          <button className="button-primary">Add Employee</button>
          <button className="button-secondary" style={{ marginLeft: "12px" }}>Bulk Import</button>
          {/* List of employees (mocked) */}
          <table className="table" style={{ marginTop: "24px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A. Smith</td>
                <td>asmith@email.com</td>
                <td>Manager</td>
                <td>Active</td>
                <td>
                  <button className="button-small button-secondary">Edit</button>
                  <button className="button-small button-primary" style={{ marginLeft: '6px' }}>Del</button>
                </td>
              </tr>
              <tr>
                <td>C. Doe</td>
                <td>cdoe@email.com</td>
                <td>Employee</td>
                <td>Active</td>
                <td>
                  <button className="button-small button-secondary">Edit</button>
                  <button className="button-small button-primary" style={{ marginLeft: '6px' }}>Del</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">System Settings</div>
          <div>
            <label>
              <input type="checkbox" /> Enable notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
