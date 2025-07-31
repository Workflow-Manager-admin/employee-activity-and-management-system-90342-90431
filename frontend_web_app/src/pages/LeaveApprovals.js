import React, { useState, useEffect } from "react";
import { leaveAPI } from "../services/apiService";

/**
 * PUBLIC_INTERFACE
 * Managers - Approve or reject leave requests from team members.
 */
function LeaveApprovals() {
  const [teamRequests, setTeamRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingRequest, setProcessingRequest] = useState(null);

  // Load team leave requests on component mount
  useEffect(() => {
    loadTeamRequests();
  }, []);

  async function loadTeamRequests() {
    try {
      setIsLoading(true);
      const requests = await leaveAPI.getTeamRequests();
      setTeamRequests(requests);
    } catch (error) {
      console.error('Error loading team requests:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleApproval(requestId, action) {
    const note = prompt(`Please provide a note for this ${action}:`);
    if (note === null) return; // User cancelled
    
    try {
      setProcessingRequest(requestId);
      await leaveAPI.processRequest(requestId, action, note);
      
      // Refresh the list
      await loadTeamRequests();
      alert(`Leave request ${action}d successfully!`);
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      alert(`Failed to ${action} leave request. Please try again.`);
    } finally {
      setProcessingRequest(null);
    }
  }

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
          {isLoading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                <div className="loading-spinner"></div>  
                <div style={{ marginTop: "10px" }}>Loading team requests...</div>
              </td>
            </tr>
          ) : teamRequests.length > 0 ? (
            teamRequests.map((request, index) => (
              <tr key={request.id || index}>
                <td style={{ fontWeight: "600" }}>{request.employee_name || request.employee?.name || 'Unknown'}</td>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>{request.reason || 'No reason provided'}</td>
                <td>
                  <span className={`status-indicator status-${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.status === 'Pending' ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        className="button-primary"
                        onClick={() => handleApproval(request.id, 'approve')}
                        disabled={processingRequest === request.id}
                        style={{ fontSize: "0.9rem", padding: "6px 12px" }}
                      >
                        {processingRequest === request.id ? '...' : 'Approve'}
                      </button>
                      <button 
                        className="button-secondary"
                        onClick={() => handleApproval(request.id, 'reject')}
                        disabled={processingRequest === request.id}
                        style={{ fontSize: "0.9rem", padding: "6px 12px" }}
                      >
                        {processingRequest === request.id ? '...' : 'Reject'}
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: "var(--medium-gray)", fontSize: "0.9rem" }}>
                      {request.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>✅</div>
                <div>No pending leave requests from your team.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveApprovals;
