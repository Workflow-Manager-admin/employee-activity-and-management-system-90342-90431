import React from "react";

/**
 * PUBLIC_INTERFACE
 * Admin: manage reporting hierarchy and roles.
 */
function HierarchyMgmt() {
  return (
    <div className="card">
      <div className="card-title">Hierarchy & Role Management</div>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Manager</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B. Jones</td>
            <td>A. Smith</td>
            <td>Employee</td>
            <td>
              <select className="select" defaultValue="employee"><option>Employee</option><option>Manager</option><option>Admin</option></select>
            </td>
          </tr>
          <tr>
            <td>A. Smith</td>
            <td>—</td>
            <td>Manager</td>
            <td>
              <select className="select" defaultValue="manager"><option>Employee</option><option>Manager</option><option>Admin</option></select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HierarchyMgmt;
