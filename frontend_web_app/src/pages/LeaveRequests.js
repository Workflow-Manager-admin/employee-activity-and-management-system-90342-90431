import React, { useState, useEffect } from "react";
import { leaveAPI } from "../services/apiService";

/**
 * PUBLIC_INTERFACE
 * Leave request management page for employees.
 */
function LeaveRequests() {
  const [leave, setLeave] = useState({ date: "", reason: "" });
  const [status, setStatus] = useState(null);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load leave requests on component mount
  useEffect(() => {
    loadLeaveHistory();
  }, []);

  async function loadLeaveHistory() {
    try {
      setIsLoading(true);
      const requests = await leaveAPI.getRequests();
      setLeaveHistory(requests);
    } catch (error) {
      console.error('Error loading leave history:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitLeave(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await leaveAPI.submitRequest(leave);
      setStatus("submitted");
      setLeave({ date: "", reason: "" });
      
      // Refresh leave history
      await loadLeaveHistory();
      
      // Hide success message after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <button 
          type="submit" 
          className="button-primary"
          disabled={isSubmitting}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner" style={{ 
                width: "16px", 
                height: "16px",
                borderWidth: "2px"
              }}></div>
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
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
          {isLoading ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "40px" }}>
                <div className="loading-spinner"></div>
                <div style={{ marginTop: "10px" }}>Loading leave history...</div>
              </td>
            </tr>
          ) : leaveHistory.length > 0 ? (
            leaveHistory.map((request, index) => (
              <tr key={request.id || index}>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-indicator status-${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </td>
                <td>{request.manager_note || request.reason || 'No note'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🏖️</div>
                <div>No leave requests found. Submit your first request above!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequests;
