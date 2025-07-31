import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import EmployeeDetailsForm from "../components/EmployeeDetailsForm";

/**
 * PUBLIC_INTERFACE
 * Enhanced Employee Management page with improved visual design.
 */
function EmployeeManagement() {
  const { user } = useUser() || {};
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [employees, setEmployees] = useState([
    {
      empNo: "EMP001",
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      designation: "Software Engineer",
      role: "Employee",
      manager: "Jane Doe",
      location: "Bangalore",
      joiningDate: "2023-01-15",
      status: "Active"
    },
    {
      empNo: "EMP002", 
      name: "Jane Doe",
      email: "jane.doe@company.com",
      department: "Engineering",
      designation: "Manager",
      role: "Manager",
      manager: "Admin User",
      location: "Mumbai",
      joiningDate: "2022-08-10",
      status: "Active"
    },
    {
      empNo: "EMP003",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      department: "HR",
      designation: "HR Executive",
      role: "Employee",
      manager: "Jane Doe",
      location: "Delhi",
      joiningDate: "2023-03-20",
      status: "Active"
    },
    {
      empNo: "EMP004",
      name: "Bob Wilson",
      email: "bob.wilson@company.com",
      department: "Finance",
      designation: "Financial Analyst",
      role: "Employee",
      manager: "Jane Doe",
      location: "Remote",
      joiningDate: "2023-05-12",
      status: "Inactive"
    }
  ]);

  if (!user || (user.role !== "admin" && user.role !== "Administrator")) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        color: "var(--accent-pink)",
        background: "linear-gradient(135deg, rgba(216, 29, 109, 0.05), rgba(164, 43, 141, 0.05))",
        borderRadius: "var(--card-radius)",
        border: "2px solid rgba(216, 29, 109, 0.1)"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔒</div>
        <h2 style={{ fontWeight: "800", fontSize: "1.8rem", marginBottom: "12px" }}>
          Admin Access Required
        </h2>
        <p style={{ fontSize: "1.1rem", opacity: "0.8" }}>
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  function handleAddEmployee(employeeData) {
    const newEmployee = {
      ...employeeData,
      status: "Active"
    };
    setEmployees([...employees, newEmployee]);
    setShowAddForm(false);
  }

  function handleEditEmployee(employeeData) {
    setEmployees(employees.map(emp => 
      emp.empNo === employeeData.empNo ? employeeData : emp
    ));
    setEditingEmployee(null);
  }

  function handleDeleteEmployee(empNo) {
    if (window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      setEmployees(employees.filter(emp => emp.empNo !== empNo));
    }
  }

  function toggleEmployeeStatus(empNo) {
    setEmployees(employees.map(emp => 
      emp.empNo === empNo 
        ? { ...emp, status: emp.status === "Active" ? "Inactive" : "Active" }
        : emp
    ));
  }

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.empNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || emp.role === filterRole;
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];
  const roles = [...new Set(employees.map(emp => emp.role))];

  return (
    <div>
      {/* Page Header */}
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
          👥 Employee Management
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "var(--secondary-purple)",
          opacity: "0.8"
        }}>
          Manage employee profiles, roles, and organizational structure
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid-3" style={{ marginBottom: "32px" }}>
        <div className="card" style={{ textAlign: "center", padding: "24px" }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, var(--success-green), var(--accent-yellow))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px"
          }}>
            {employees.filter(emp => emp.status === "Active").length}
          </div>
          <div style={{ color: "var(--primary-blue)", fontWeight: "600" }}>
            Active Employees
          </div>
        </div>
        
        <div className="card" style={{ textAlign: "center", padding: "24px" }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, var(--primary-blue), var(--secondary-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px"
          }}>
            {departments.length}
          </div>
          <div style={{ color: "var(--primary-blue)", fontWeight: "600" }}>
            Departments
          </div>
        </div>
        
        <div className="card" style={{ textAlign: "center", padding: "24px" }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, var(--accent-yellow), var(--accent-pink))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px"
          }}>
            {employees.filter(emp => emp.role === "Manager").length}
          </div>
          <div style={{ color: "var(--primary-blue)", fontWeight: "600" }}>
            Managers
          </div>
        </div>
      </div>

      {/* Main Management Card */}
      <div className="card">
        {/* Header with Add Button */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div className="card-title" style={{ margin: 0 }}>
            📋 Employee Directory
          </div>
          <button 
            className="button-primary"
            onClick={() => setShowAddForm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ➕ Add Employee
          </button>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: "var(--light-bg)",
          padding: "20px",
          borderRadius: "var(--btn-radius)",
          marginBottom: "24px",
          border: "1px solid var(--border-color)"
        }}>
          <div className="grid-3" style={{ gap: "16px", alignItems: "end" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                🔍 Search Employees
              </label>
              <input
                className="input"
                type="text"
                placeholder="Search by name, email, or employee ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ margin: 0 }}
              />
            </div>
            
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                👤 Filter by Role
              </label>
              <select
                className="select"
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
                style={{ margin: 0 }}
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                🏢 Filter by Department
              </label>
              <select
                className="select"
                value={filterDepartment}
                onChange={e => setFilterDepartment(e.target.value)}
                style={{ margin: 0 }}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{
          marginBottom: "16px",
          color: "var(--secondary-purple)",
          fontWeight: "600"
        }}>
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
        
        {/* Employee Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>👤 Employee</th>
                <th>📧 Contact</th>
                <th>🏢 Department</th>
                <th>💼 Role</th>
                <th>👨‍💼 Manager</th>
                <th>📍 Location</th>
                <th>📅 Joined</th>
                <th>⚡ Status</th>
                <th>🔧 Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.empNo}>
                  <td>
                    <div>
                      <div style={{ fontWeight: "700", color: "var(--primary-blue)" }}>
                        {employee.name}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--secondary-purple)", opacity: "0.8" }}>
                        {employee.empNo}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: "600" }}>{employee.email}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--secondary-purple)", opacity: "0.8" }}>
                        {employee.designation}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      background: "var(--light-bg)",
                      color: "var(--primary-blue)",
                      fontWeight: "600",
                      border: "1px solid rgba(37, 72, 138, 0.1)"
                    }}>
                      {employee.department}
                    </span>
                  </td>
                  <td>
                    <span className={`status-indicator ${
                      employee.role === 'Admin' ? 'status-blocked' :
                      employee.role === 'Manager' ? 'status-in-progress' : 'status-completed'
                    }`}>
                      {employee.role === 'Admin' ? '⚡' : employee.role === 'Manager' ? '👨‍💼' : '👤'} {employee.role}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{employee.manager}</td>
                  <td>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      background: "rgba(37, 72, 138, 0.05)",
                      color: "var(--text-dark)",
                      fontWeight: "600"
                    }}>
                      📍 {employee.location}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{employee.joiningDate}</td>
                  <td>
                    <button
                      onClick={() => toggleEmployeeStatus(employee.empNo)}
                      className={`status-indicator ${employee.status === 'Active' ? 'status-completed' : 'status-blocked'}`}
                      style={{
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {employee.status === 'Active' ? '✅' : '❌'} {employee.status}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button 
                        className="button-secondary button-small"
                        onClick={() => setEditingEmployee(employee)}
                        title="Edit Employee"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="button-pink button-small"
                        onClick={() => handleDeleteEmployee(employee.empNo)}
                        title="Delete Employee"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--secondary-purple)",
            opacity: "0.7"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <h3>No employees found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      <EmployeeDetailsForm
        open={showAddForm}
        onSave={handleAddEmployee}
        onCancel={() => setShowAddForm(false)}
        addMode={true}
      />

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <EmployeeDetailsForm
          open={true}
          initial={editingEmployee}
          onSave={handleEditEmployee}
          onCancel={() => setEditingEmployee(null)}
          addMode={false}
        />
      )}
    </div>
  );
}

export default EmployeeManagement;
