import React, { useState, useRef } from "react";
import EmployeeDetailsForm from "../components/EmployeeDetailsForm";

/**
 * PUBLIC_INTERFACE
 * Employee onboarding page: bulk upload and add single employee.
 * "Add one employee" opens modal form for all required HR details.
 * UX:
 *  - Employee number is generated/locked when opening the modal (not on every re-render)
 *  - Larger modal/form UX & prominent 'Add Employee' button
 *  - Employee is NOT created until user clicks the bottom 'Add Employee' action button
 */
function Onboarding() {
  const [showForm, setShowForm] = useState(false);
  const [flash, setFlash] = useState({ type: "", msg: "" });
  // Lock the generated empNo per modal open session via ref
  const genEmpNo = useRef(null);

  function openForm() {
    // Generate and lock a unique employee number only once per modal open
    if (!showForm) {
      genEmpNo.current =
        `EMP${Math.floor(100000 + Math.random() * 900000)}`;
    }
    setShowForm(true);
  }

  // Demo save handler (simulate API call)
  function handleSave(data) {
    setShowForm(false);
    setFlash({
      type: "success",
      msg: `Employee ${data.name} added! (Emp No: ${data.empNo})`
    });
    // You would call API to persist employee here
    setTimeout(() => setFlash({ type: "", msg: "" }), 4200);
    // Reset empNo lock for next session
    genEmpNo.current = null;
  }
  function handleCancel() {
    setShowForm(false);
    // Reset empNo lock on cancel
    genEmpNo.current = null;
  }

  return (
    <div
      className="card"
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "40px 8vw 40px 8vw",
        boxSizing: "border-box"
      }}
    >
      <div className="card-title" style={{ fontSize: "1.45rem" }}>Bulk Onboarding</div>
      {flash.msg && (
        <div className={`notification ${flash.type}`} style={{ marginBottom: 18, textAlign: "center" }}>
          {flash.msg}
        </div>
      )}
      <div>
        <input className="input" type="file" accept=".csv" style={{ maxWidth: 260 }} />
        <button className="button-secondary" style={{ marginLeft: "16px", minWidth: 140 }}>Import CSV</button>
      </div>
      {/* CSV Import instructions/info box for admins */}
      <div
        style={{
          background: "var(--light-bg)",
          border: "1.5px solid var(--border-color, #e9ecef)",
          borderRadius: 10,
          marginTop: 18,
          padding: "18px 22px",
          color: "var(--primary-blue)",
          fontSize: ".99em",
          boxShadow: "0 2px 16px rgba(37,72,138,0.05)",
          maxWidth: 640
        }}
        aria-live="polite"
      >
        <div style={{fontWeight: 700, marginBottom: 3, fontSize: "1.03em"}}>
          <span style={{color:"var(--accent-yellow)"}}>ℹ️</span> CSV Import Format Instructions:
        </div>
        <ul style={{paddingLeft:20, margin: "7px 0 4px 0"}}>
          <li>
            The <span style={{fontWeight:600}}>first row must be a header</span> with the following columns (order required):
          </li>
        </ul>
        <div style={{ fontFamily: "monospace, monospace", background: "#f8f8f8", borderRadius: 6, padding: "10px 14px", margin: "7px 0" }}>
          employee_number, name, email, department, designation, role, joining_date, phone, address, dob, gender, manager, location
        </div>
        <ul style={{paddingLeft:20,marginBottom:6}}>
          <li>All fields are <b>mandatory</b> except <i>address</i>. Use <b>YYYY-MM-DD</b> for <b>joining_date</b> and <b>dob</b>.</li>
          <li><b>employee_number</b>: Unique for each employee (e.g., <i>EMP000183</i>).</li>
          <li><b>role</b>: Must be one of <span style={{ fontFamily: "monospace", fontWeight: 600 }}>Employee</span>, <span style={{ fontFamily: "monospace", fontWeight: 600 }}>Manager</span>, or <span style={{ fontFamily: "monospace", fontWeight: 600 }}>Admin</span>.</li>
          <li><b>gender</b>: Acceptable values: Male, Female, Other, Prefer not to say.</li>
          <li>Manager can be name or email (must match as existing or new entry).</li>
        </ul>
        <div style={{marginTop:10}}>
          <span style={{fontWeight:600, color:"var(--secondary-purple)"}}>Sample row:</span>
          <pre
            style={{
              background: "#fffbe3",
              border: "1px solid #f5c400",
              borderRadius: 6,
              fontFamily: "monospace",
              fontSize: "0.98em",
              margin: "7px 0 0 0",
              padding: "10px 14px",
              overflowX: "auto"
            }}
          >{`EMP000183, Alex Lee, alex.lee@email.com, Engineering, Software Engineer, Employee, 2024-04-12, 9123456789, "Bangalore, India", 1997-08-21, Male, B. Jones, Bangalore`}</pre>
        </div>
        <div style={{marginTop:8, lineHeight:"1.5", color:"var(--accent-pink)", fontWeight:600}}>
          ⚠️ Ensure there are no blank header or missing fields in any row. Use comma separation only; do not use Excel formulas or merged cells. Save as UTF-8 encoded CSV.
        </div>
      </div>
      <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button
          className="button-primary"
          style={{
            fontSize: "1.2rem",
            padding: "18px 60px",
            minWidth: 240,
            borderRadius: 10,
            margin: "0 auto",
            boxShadow: "0 3px 16px rgba(37,72,138,0.09)"
          }}
          onClick={openForm}
          tabIndex={0}
        >
          + Add Employee
        </button>
        <div style={{ fontSize: ".95em", marginTop: 8, color: "var(--secondary-purple)", opacity: 0.85 }}>
          Add a single employee via the detailed entry form.
        </div>
      </div>
      {/* Modal for new employee form */}
      <EmployeeDetailsForm
        open={showForm}
        onSave={handleSave}
        onCancel={handleCancel}
        genEmpNo={genEmpNo.current}
        addMode={true}
      />
    </div>
  );
}

export default Onboarding;
