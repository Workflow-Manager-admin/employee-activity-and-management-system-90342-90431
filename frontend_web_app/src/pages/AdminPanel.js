import React from "react";

/**
 * PUBLIC_INTERFACE
 * Admin: Employee CRUD, bulk onboarding, and settings.
 */
function AdminPanel() {
  // Minimal admin screens (full CRUD/bulk upload not implemented here)
  return (
    <div>
      <div className="card">
        <div className="card-title">Manage Employees</div>
        <button className="button-primary">Add Employee</button>
        <button className="button-secondary" style={{marginLeft: "12px"}}>Bulk Import</button>
        {/* List of employees (mocked) */}
        <table className="table" style={{marginTop: "24px"}}>
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
                <button className="button-small button-primary" style={{marginLeft: '6px'}}>Del</button>
              </td>
            </tr>
            <tr>
              <td>C. Doe</td>
              <td>cdoe@email.com</td>
              <td>Employee</td>
              <td>Active</td>
              <td>
                <button className="button-small button-secondary">Edit</button>
                <button className="button-small button-primary" style={{marginLeft: '6px'}}>Del</button>
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
  );
}

export default AdminPanel;
