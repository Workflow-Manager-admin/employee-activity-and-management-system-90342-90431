import React from "react";
import EmployeeManagement from "./EmployeeManagement";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Admin Panel: Employee Management interface for admins.
 * Shows employee CRUD operations and management tools.
 */
function AdminPanel() {
  const { user } = useUser() || {};

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

  return <EmployeeManagement />;
}

export default AdminPanel;
