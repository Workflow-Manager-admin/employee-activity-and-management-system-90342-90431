import React from "react";

/**
 * PUBLIC_INTERFACE
 * Admin: Audit trail of all changes.
 */
function AuditTrail() {
  // Mocked log
  return (
    <div className="card">
      <div className="card-title">Audit Trail</div>
      <div className="log-entry">
        [2024-06-10, 14:30] Admin changed role of employee <b>B. Jones</b> from Employee to Manager.
      </div>
      <div className="log-entry">
        [2024-06-11, 11:10] User <b>A. Smith</b> updated work log for 2024-06-11.
      </div>
      <div className="log-entry">
        [2024-06-12, 08:59] Manager approved leave for <b>A. Smith</b> (2024-06-13).
      </div>
    </div>
  );
}
export default AuditTrail;
