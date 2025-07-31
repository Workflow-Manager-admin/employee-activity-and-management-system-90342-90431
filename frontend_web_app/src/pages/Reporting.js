import React from "react";

/**
 * PUBLIC_INTERFACE
 * Admin reporting, data export.
 */
function Reporting() {
  // Would use charts, table, export logic; here, just skeleton.
  return (
    <div>
      <div className="card">
        <div className="card-title">Reports & Analytics</div>
        <div>
          <button className="button-primary">Export to PDF</button>
          <button className="button-secondary" style={{ marginLeft: "18px" }}>
            Export to Excel
          </button>
          <p style={{marginTop: "12px", color: "var(--secondary-purple)"}}>
            Charts, time & productivity trends, categories (mock: connect to chart/graph libraries)
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Recent Data Exports</div>
        <ul>
          <li>Organization_Report_202406.pdf</li>
          <li>LeavesData_202406.xls</li>
        </ul>
      </div>
    </div>
  );
}

export default Reporting;
