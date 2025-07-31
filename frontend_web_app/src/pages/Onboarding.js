import React from "react";

/**
 * PUBLIC_INTERFACE
 * Employee onboarding page (bulk upload and new user creation).
 */
function Onboarding() {
  return (
    <div className="card">
      <div className="card-title">Bulk Onboarding</div>
      <div>
        <input className="input" type="file" accept=".csv" />
        <button className="button-secondary" style={{marginLeft: "12px"}}>Import CSV</button>
      </div>
      <div style={{marginTop: "24px"}}>
        <button className="button-primary">Add One Employee</button>
      </div>
    </div>
  );
}

export default Onboarding;
