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
    <div className="card" style={{ maxWidth: 760, margin: "0 auto", padding: "40px 36px" }}>
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
