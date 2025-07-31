import React, { useState } from "react";
import EmployeeDetailsForm from "../components/EmployeeDetailsForm";

/**
 * PUBLIC_INTERFACE
 * Employee onboarding page: bulk upload and add single employee.
 * "Add one employee" opens modal form for all required HR details.
 */
function Onboarding() {
  const [showForm, setShowForm] = useState(false);
  const [flash, setFlash] = useState({ type: "", msg: "" });

  // Demo save handler (simulate API call)
  function handleSave(data) {
    setShowForm(false);
    setFlash({
      type: "success",
      msg: `Employee ${data.name} added! (Emp No: ${data.empNo})`
    });
    // You would call API to persist employee here
    setTimeout(() => setFlash({type:"",msg:""}), 4200);
  }
  function handleCancel() {
    setShowForm(false);
  }

  return (
    <div className="card">
      <div className="card-title">Bulk Onboarding</div>
      {flash.msg && (
        <div className={`notification ${flash.type}`} style={{marginBottom:14,textAlign:"center"}}>
          {flash.msg}
        </div>
      )}
      <div>
        <input className="input" type="file" accept=".csv" />
        <button className="button-secondary" style={{marginLeft: "12px"}}>Import CSV</button>
      </div>
      <div style={{marginTop: "24px"}}>
        <button className="button-primary" onClick={() => setShowForm(true)}>
          Add One Employee
        </button>
      </div>
      {/* Modal for new employee form */}
      <EmployeeDetailsForm open={showForm} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default Onboarding;
