import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import EmployeeDetailsForm from "../components/EmployeeDetailsForm";

/**
 * PUBLIC_INTERFACE
 * Employee Management page for admins.
 * Handles CRUD operations for employee records.
 */
function EmployeeManagement() {
  const { user } = useUser() || {};
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    {
      empNo: "EMP001",
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      designation: "Software Engineer",
      role: "Employee",
      manager: "Jane Doe",
      location: "Bangalore"
    },
    {
      empNo: "EMP002", 
      name: "Jane Doe",
      email: "jane.doe@company.com",
      department: "Engineering",
      designation: "Manager",
      role: "Manager",
      manager: "Admin User",
      location: "Mumbai"
    }
  ]);

  if (!user || (user.role !== "admin" && user.role !== "Administrator")) {
    return (
      <div style={{
        padding: "3em", minHeight: "32vh", color: "var(--accent-pink)",
        fontWeight: 700, fontSize: "1.26em", textAlign: "center"
      }}>
        Admin access required.<br />
        You are not authorized to view this page.
      </div>
    );
  }

  function handleAddEmployee(employeeData) {
    setEmployees([...employees, employeeData]);
    setShowAddForm(false);
  }

  function handleEditEmployee(employeeData) {
    setEmployees(employees.map(emp => 
      emp.empNo === employeeData.empNo ? employeeData : emp
    ));
    setEditingEmployee(null);
  }

  function handleDeleteEmployee(empNo) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.empNo !== empNo));
    }
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div className="card-title" style={{ margin: 0 }}>Employee Management</div>
          <button 
            className="button-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Add Employee
          </button>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Employee No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Role</th>
                <th>Manager</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.empNo}>
                  <td>{employee.empNo}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.role}</td>
                  <td>{employee.manager}</td>
                  <td>{employee.location}</td>
                  <td>
                    <button 
                      className="button-secondary button-small"
                      onClick={() => setEditingEmployee(employee)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </button>
                    <button 
                      className="button-pink button-small"
                      onClick={() => handleDeleteEmployee(employee.empNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
