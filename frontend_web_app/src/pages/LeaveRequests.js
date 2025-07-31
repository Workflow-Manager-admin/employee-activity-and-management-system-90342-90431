import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Leave request management page for employees.
 */
function LeaveRequests() {
  const [leave, setLeave] = useState({ date: "", reason: "" });
  const [status, setStatus] = useState(null);

  function submitLeave(e) {
    e.preventDefault();
    // API call to submit leave (mocked)
    setStatus("submitted");
    setLeave({ date: "", reason: "" });
  }

  return (
    <div className="card">
      <div className="card-title">Request Leave</div>
      <form onSubmit={submitLeave}>
        <input
          type="date"
          className="input"
          value={leave.date}
          onChange={e => setLeave({ ...leave, date: e.target.value })}
          required
        />
        <textarea
          rows={2}
          className="textarea"
          value={leave.reason}
          placeholder="Reason (optional)"
          onChange={e => setLeave({ ...leave, reason: e.target.value })}
        />
        <button type="submit" className="button-primary">
          Submit Request
        </button>
      </form>
      {status && (
        <div className="notification success" style={{ marginTop: 16 }}>
          Leave request submitted!
        </div>
      )}
      <div className="card-title" style={{ marginTop: 36 }}>Leave History</div>
      {/* Table - demo past requests */}
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Manager Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-06-10</td>
            <td>Approved</td>
            <td>Enjoy your break!</td>
          </tr>
          <tr>
            <td>2024-05-21</td>
            <td>Rejected</td>
            <td>Project deadline</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequests;
