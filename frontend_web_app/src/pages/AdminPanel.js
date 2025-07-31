import React, { useState } from "react";
import Navbar from "../components/Navbar";

/**
 * PUBLIC_INTERFACE
 * Comprehensive Admin Dashboard for TATA ELXSI Employee Management.
 * All major admin features are integrated: user management (view/add/edit/delete), role & hierarchy assignment,
 * bulk onboarding (CSV import), system settings, audit trail, and organization-wide metrics/reporting.
 * Mobile responsive with hamburger menu navigation.
 */
function AdminPanel() {
  // Hamburger/nav state (for Navbar); disables main area if open
  const [menuOpen, setMenuOpen] = useState(false);

  // State for multi-panel swapping (tabs within Admin Panel)
  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "Employees" },
    { key: "role", label: "Role & Hierarchy" },
    { key: "onboarding", label: "Bulk Onboarding" },
    { key: "settings", label: "System Settings" },
    { key: "audit", label: "Audit Trail" },
    { key: "reporting", label: "Reporting" },
  ];
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy employee data with unique employee number (auto increment for demo)
  const [employees, setEmployees] = useState([
    { id: 1, empNo: "EMP001", name: "A. Smith", email: "asmith@email.com", role: "Manager", status: "Active", manager: "" },
    { id: 2, empNo: "EMP002", name: "C. Doe", email: "cdoe@email.com", role: "Employee", status: "Active", manager: "A. Smith" },
    { id: 3, empNo: "EMP003", name: "B. Jones", email: "bjones@email.com", role: "Employee", status: "Inactive", manager: "A. Smith" },
  ]);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  // Pending emp stores the form fields, including auto employee number readonly (generated on modal open)
  const [pendingEmp, setPendingEmp] = useState({ empNo: "", name: "", email: "", role: "Employee", status: "Active", manager: "" });

  // Util to auto-generate the next employee number (auto-increment, not UUID for demo)
  function getNextEmployeeNumber() {
    // Get max numeric part of empNo, increment by 1
    const lastNo = employees
      .map(e => parseInt((e.empNo || '').replace("EMP","")) || 0)
      .reduce((a, b) => Math.max(a, b), 0);
    const next = (lastNo + 1).toString().padStart(3,'0');
    return `EMP${next}`;
  }

  // Bulk import dummy result
  const [importResult, setImportResult] = useState(null);

  // Organization metrics (static/mock data)
  const orgStats = {
    employees: employees.length,
    active: employees.filter(e => e.status === "Active").length,
    managers: employees.filter(e => e.role === "Manager").length,
    leaves: 19,
    pendingOnboard: 2,
  };

  const auditTrailData = [
    { date: "2024-06-10", time: "14:30", action: "Admin changed role of B. Jones from Employee to Manager." },
    { date: "2024-06-11", time: "10:49", action: "Imported 5 new users via onboarding CSV." },
    { date: "2024-06-12", time: "12:02", action: "A. Smith marked B. Jones as Inactive." },
    { date: "2024-06-13", time: "09:31", action: "System settings updated: notifications enabled." },
  ];

  // Chart mock (SVG bar, pie)
  function OrgChartStats() {
    // demo active vs inactive count
    const active = orgStats.active;
    const inactive = orgStats.employees - active;
    return (
      <div style={{ display: "flex", gap: 28, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
        {/* Pie */}
        <svg width={80} height={80} viewBox="0 0 36 36">
          <circle r="16" cx="18" cy="18" stroke="var(--primary-blue)" strokeWidth="4" fill="none"
            strokeDasharray={`${(active/orgStats.employees)*100} ${(inactive/orgStats.employees)*100}`}
            strokeDashoffset="25"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'all .4s' }}
          />
          <circle r="16" cx="18" cy="18" stroke="var(--accent-yellow)" strokeWidth="4" fill="none"
            strokeDasharray={`${(inactive/orgStats.employees)*100} ${100-(inactive/orgStats.employees)*100}`}
            strokeDashoffset={25+(active/orgStats.employees)*100}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'all .4s' }}
          />
          <text x="18" y="21" textAnchor="middle" fontSize="10" fill="var(--text-dark)" fontWeight="bold">{orgStats.active} Active</text>
        </svg>
        <div style={{ fontSize: "1.09rem" }}>
          <div><b>Total Employees:</b> {orgStats.employees}</div>
          <div><b>Active:</b> {orgStats.active} | <span style={{ color: "var(--accent-pink)" }}>Inactive:</span> {inactive}</div>
          <div><b>Managers:</b> {orgStats.managers}</div>
          <div><b>Pending Onboarding:</b> <span style={{ color: "var(--accent-yellow)", fontWeight: "bold" }}>{orgStats.pendingOnboard}</span></div>
        </div>
      </div>
    );
  }

  // Employee CRUD handlers
  // PUBLIC_INTERFACE
  function handleAddEditEmployee() {
    if (editTarget) {
      // Edit: keep empNo & id, update others
      setEmployees(employees.map(e =>
        e.id === editTarget.id ? { ...e, ...pendingEmp } : e
      ));
    } else {
      // Add: generate empNo and id
      setEmployees([
        ...employees,
        {
          ...pendingEmp,
          empNo: getNextEmployeeNumber(),
          id: Date.now() // use ms timestamp for id in demo
        }
      ]);
    }
    setShowAddEdit(false);
    setPendingEmp({ empNo: "", name: "", email: "", role: "Employee", status: "Active", manager: "" });
    setEditTarget(null);
  }
  function handleDeleteEmployee(id) {
    setEmployees(employees.filter(e => e.id !== id));
  }
  function handleEditClicked(emp) {
    setShowAddEdit(true);
    setEditTarget(emp);
    setPendingEmp({
      empNo: emp.empNo || "",
      name: emp.name,
      email: emp.email,
      role: emp.role,
      status: emp.status,
      manager: emp.manager || ""
    });
  }
  // Tab rendering
  function renderMainPanel() {
    switch(activeTab) {
      case "overview":
        // ——— ORG METRICS + quick cards/charts/summary ———
        return (
          <div>
            <div className="card">
              <div className="card-title">Organization Overview</div>
              <OrgChartStats />
              <div style={{ marginTop: "1.1em", color: "var(--secondary-purple)" }}>
                Welcome to the Admin Dashboard.<br />
                Use the sections above to manage employees, assign roles/hierarchy, review onboarding, monitor system settings, and see organization-wide metrics and reports.
              </div>
            </div>
            <div className="grid-2">
              <div className="card">
                <div className="card-title">Quick Metrics</div>
                <div>
                  <div><b>Leaves (YTD):</b> 19</div>
                  <div><b>Work Logs (Monthly):</b> 340</div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Latest Audit Events</div>
                <div className="log-entry" style={{ fontSize: "0.96em" }}>{auditTrailData[0].date} {auditTrailData[0].time}: {auditTrailData[0].action}</div>
                <div className="log-entry" style={{ fontSize: "0.96em" }}>{auditTrailData[1].date} {auditTrailData[1].time}: {auditTrailData[1].action}</div>
              </div>
            </div>
          </div>
        );
      case "users":
        // ——— EMPLOYEE TABLE/CRUD ———
        return (
          <div className="card">
            <div className="card-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Manage Employees</span>
              <button
                className="button-primary"
                onClick={() => {
                  setShowAddEdit(true);
                  setEditTarget(null);
                  setPendingEmp({
                    empNo: getNextEmployeeNumber(),
                    name: "",
                    email: "",
                    role: "Employee",
                    status: "Active",
                    manager: ""
                  });
                }}>
                Add Employee
              </button>
            </div>
            <table className="table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>EMP No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Manager</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.empNo}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.role}</td>
                    <td>{emp.manager || "—"}</td>
                    <td>{emp.status}</td>
                    <td>
                      <button className="button-small button-secondary" onClick={() => handleEditClicked(emp)}>Edit</button>
                      <button className="button-small button-primary" style={{ marginLeft: 7 }} onClick={() => handleDeleteEmployee(emp.id)}>Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add/Edit employee modal/panel */}
            {showAddEdit && (
              <div style={{
                position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh", zIndex: 1200,
                background: "rgba(37,72,138,0.13)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <div className="card" style={{ minWidth: 340, boxShadow: "0 8px 35px rgba(37,72,138,0.19)", position: "relative" }}>
                  <div style={{ position: "absolute", right: 10, top: 10, cursor: "pointer", color: "var(--accent-pink)", fontSize: 24, fontWeight: 700 }}
                    onClick={() => { setShowAddEdit(false); setEditTarget(null); }}>
                    ×
                  </div>
                  <div className="card-title">{editTarget ? "Edit Employee" : "Add Employee"}</div>
                  <form onSubmit={e => { e.preventDefault(); handleAddEditEmployee(); }}>
                    <div style={{marginBottom:12}}>
                      <label style={{fontSize:".99em",fontWeight:"bold",color:"var(--secondary-purple)",marginRight:8}}>EMP No</label>
                      <input
                        className="input"
                        type="text"
                        value={
                          editTarget
                            ? pendingEmp.empNo
                            : (pendingEmp.empNo || getNextEmployeeNumber())
                        }
                        disabled
                        style={{ background: "#f3f3f8", color: "var(--primary-blue)", fontWeight: 700, letterSpacing: 1.8, marginBottom: 7 }}
                        tabIndex={-1}
                        readOnly
                      />
                    </div>
                    <input
                      className="input"
                      type="text"
                      placeholder="Full Name"
                      value={pendingEmp.name}
                      onChange={e => setPendingEmp({ ...pendingEmp, name: e.target.value })}
                      required
                      style={{ marginBottom: 12 }}
                    />
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      value={pendingEmp.email}
                      onChange={e => setPendingEmp({ ...pendingEmp, email: e.target.value })}
                      required
                      style={{ marginBottom: 12 }}
                    />
                    <select
                      className="select"
                      value={pendingEmp.role}
                      onChange={e => setPendingEmp({ ...pendingEmp, role: e.target.value })}
                      style={{ marginBottom: 12 }}>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <input
                      className="input"
                      type="text"
                      placeholder="Manager (optional)"
                      value={pendingEmp.manager}
                      onChange={e => setPendingEmp({ ...pendingEmp, manager: e.target.value })}
                      style={{ marginBottom: 12 }}
                    />
                    <select
                      className="select"
                      value={pendingEmp.status}
                      onChange={e => setPendingEmp({ ...pendingEmp, status: e.target.value })}
                      style={{ marginBottom: 12 }}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <button className="button-primary" type="submit">{editTarget ? "Save Changes" : "Add Employee"}</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case "role":
        // ——— HIERARCHY & ROLE mgmt ———
        return (
          <div className="card">
            <div className="card-title">Role & Hierarchy Management</div>
            <table className="table">
              <thead>
                <tr><th>User</th><th>Manager</th><th>Role</th><th>Change Role</th></tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.manager || <span style={{ color: "#aaa" }}>None</span>}</td>
                    <td>{emp.role}</td>
                    <td>
                      <select
                        className="select"
                        style={{ minWidth: 110 }}
                        value={emp.role}
                        onChange={e => {
                          let role = e.target.value;
                          setEmployees(employees.map(empx => empx.id === emp.id ? { ...empx, role } : empx));
                        }}>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "onboarding":
        // ——— BULK ONBOARDING ———
        return (
          <div className="card">
            <div className="card-title">Bulk Onboarding / CSV Import</div>
            <form onSubmit={e => { e.preventDefault(); setImportResult("Imported 7 users (demo)"); }}>
              <input className="input" type="file" accept=".csv" required style={{ maxWidth: 300 }} />
              <button className="button-secondary" style={{ marginLeft: "12px" }}>Import CSV</button>
            </form>
            <div style={{ marginTop: "24px" }}>
              <button className="button-primary">Add One Employee</button>
            </div>
            {importResult && (
              <div className="notification success" style={{ marginTop: 20 }}>{importResult}</div>
            )}
            <div style={{ marginTop: 18, fontSize: ".96em", color: "var(--secondary-purple)" }}>
              Download a sample <u>CSV template</u> to prepare your data.<br />
              On import, new users will be created and notified.
            </div>
          </div>
        );
      case "settings":
        // ——— SYSTEM SETTINGS ———
        return (
          <div className="card">
            <div className="card-title">System Settings</div>
            <div>
              <label style={{ fontSize: "1.07em" }}>
                <input type="checkbox" defaultChecked style={{ marginRight: "12px" }} /> Enable notifications for all users
              </label>
            </div>
            <div style={{ marginTop: 18 }}>
              <label>
                <b>Require log submission confirmation:</b>
                <input type="checkbox" style={{ marginLeft: 12 }} />
              </label>
            </div>
            <div style={{ marginTop: 28, fontSize: ".97em" }}>
              <span style={{ color: "var(--accent-pink)" }}>Note:</span> System settings apply platform-wide. Any change is audit-logged.
            </div>
          </div>
        );
      case "audit":
        // ——— AUDIT TRAIL EVENTS ———
        return (
          <div className="card">
            <div className="card-title">Audit Trail</div>
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              {auditTrailData.map((e, i) => (
                <div className="log-entry" key={i}>
                  [{e.date} {e.time}] {e.action}
                </div>
              ))}
            </div>
          </div>
        );
      case "reporting":
        // ——— REPORTING & VISUALIZATION ———
        return (
          <div>
            <div className="card">
              <div className="card-title">Reports & Export</div>
              <div>
                <button className="button-primary">Export to PDF</button>
                <button className="button-secondary" style={{ marginLeft: 18 }}>Export to Excel</button>
              </div>
              <div style={{ marginTop: 18, fontSize: '1.035em' }}>
                View organization-wide activity, productivity charts, and export data for compliance or review.
              </div>
              {/* Bar chart demo */}
              <div style={{ marginTop: 30 }}>
                <svg width={210} height={70}>
                  <rect x={30} y={20} width={20} height={40} fill="var(--accent-yellow)" />
                  <rect x={65} y={10} width={20} height={50} fill="var(--primary-blue)" />
                  <rect x={100} y={18} width={20} height={42} fill="var(--secondary-purple)" />
                  <rect x={135} y={35} width={20} height={25} fill="var(--accent-pink)" />
                  <text x={30} y={64} fontSize="10">Jan</text>
                  <text x={65} y={64} fontSize="10">Feb</text>
                  <text x={100} y={64} fontSize="10">Mar</text>
                  <text x={135} y={64} fontSize="10">Apr</text>
                </svg>
                <div style={{ fontSize: "0.94em", marginTop: "4px" }}>Logs submitted per month</div>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Recent Exports</div>
              <ul>
                <li>All_EmployeeData_202406.pdf</li>
                <li>LeavesByDepartment_202406.xlsx</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <Navbar open={menuOpen} onToggle={() => setMenuOpen(open => !open)} onNavigate={() => setMenuOpen(false)} />
      {/* Internal panel nav (tabs, not routes) */}
      <div
        className="card"
        style={{
          background: "var(--bg-canvas)",
          marginTop: 20,
          padding: "0 0 .3em 0",
          border: "none",
          boxShadow: "none"
        }}
      >
        <div style={{
          display: "flex",
          gap: 10,
          borderBottom: "1px solid var(--border-color)",
          marginBottom: 4,
          flexWrap: "wrap",
        }}>
          {TABS.map(tab =>
            <button
              key={tab.key}
              style={{
                background: activeTab === tab.key ? "var(--primary-blue)" : "transparent",
                color: activeTab === tab.key ? "#fff" : "var(--primary-blue)",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px 8px 0 0",
                padding: "13px 17px",
                cursor: "pointer",
                borderBottom: activeTab === tab.key ? "3px solid var(--accent-yellow)" : "none",
                outline: "none",
                boxShadow: activeTab === tab.key ? "0 2px 9px rgba(37,72,138,0.09)" : "none"
              }}
              onClick={() => setActiveTab(tab.key)}
              tabIndex={0}
            >{tab.label}</button>
          )}
        </div>
      </div>
      {/* Main */}
      <div style={{ transition: "filter .24s", filter: menuOpen ? "blur(2px)" : "none", pointerEvents: menuOpen ? "none" : "auto" }}>
        {renderMainPanel()}
      </div>
    </div>
  );
}

export default AdminPanel;
