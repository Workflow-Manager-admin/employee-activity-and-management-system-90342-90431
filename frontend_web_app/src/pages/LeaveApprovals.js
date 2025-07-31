import React from "react";

/**
 * PUBLIC_INTERFACE
 * Managers - Approve or reject leave requests from team members.
 */
function LeaveApprovals() {
  // Table of requests (mocked)
  return (
    <div className="card">
      <div className="card-title">Team Leave Requests</div>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A. Smith</td>
            <td>2024-06-16</td>
            <td>Medical</td>
            <td>Pending</td>
            <td>
              <button className="button-primary">Approve</button>
              <button className="button-secondary">Reject</button>
            </td>
          </tr>
          <tr>
            <td>B. Jones</td>
            <td>2024-06-17</td>
            <td>Family</td>
            <td>Pending</td>
            <td>
              <button className="button-primary">Approve</button>
              <button className="button-secondary">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LeaveApprovals;
