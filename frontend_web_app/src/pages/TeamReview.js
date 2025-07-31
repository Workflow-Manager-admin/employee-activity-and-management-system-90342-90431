import React, { useState, useEffect } from "react";
import { teamAPI } from "../services/apiService";

/**
 * PUBLIC_INTERFACE
 * Managers reviewing logs of their team.
 */
function TeamReview() {
  const [teamLogs, setTeamLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedLogId, setSelectedLogId] = useState(null);

  // Load team logs on component mount
  useEffect(() => {
    loadTeamLogs();
  }, []);

  async function loadTeamLogs() {
    try {
      setIsLoading(true);
      const logs = await teamAPI.getTeamLogs();
      setTeamLogs(logs);
    } catch (error) {
      console.error('Error loading team logs:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitFeedback(logId) {
    if (!feedbackText.trim()) {
      alert('Please enter feedback before submitting.');
      return;
    }

    try {
      await teamAPI.submitFeedback(logId, feedbackText);
      setFeedbackText('');
      setSelectedLogId(null);
      await loadTeamLogs(); // Refresh the logs
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  }

  return (
    <div>
      <div className="card">
        <div className="card-title">Team Daily Logs (Today)</div>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div className="loading-spinner"></div>
            <div style={{ marginTop: "10px" }}>Loading team logs...</div>
          </div>
        ) : teamLogs.length > 0 ? (
          <div className="panel">
            {teamLogs.map((log, index) => (
              <div key={log.id || index} className="log-entry" style={{ marginBottom: "20px", padding: "15px", background: "var(--light-bg)", borderRadius: "8px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <b>{log.employee_name || log.user?.name}</b>: {log.description} ({log.hours}h)
                  <span className={`log-meta status-indicator status-${log.status.toLowerCase().replace(' ', '-')}`} style={{ marginLeft: "10px" }}>
                    {log.status}
                  </span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--medium-gray)", marginBottom: "10px" }}>
                  Project: {log.project} | Category: {log.category} | Date: {new Date(log.date || log.created_at).toLocaleDateString()}
                </div>
                {log.feedback && (
                  <div style={{ fontSize: "0.9rem", color: "var(--primary-blue)", fontStyle: "italic", marginBottom: "10px" }}>
                    Your feedback: "{log.feedback}"
                  </div>
                )}
                {selectedLogId === log.id ? (
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      className="textarea"
                      rows={2}
                      placeholder="Enter your feedback..."
                      value={feedbackText}
                      onChange={e => setFeedbackText(e.target.value)}
                      style={{ marginBottom: "10px" }}
                    />
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        className="button-primary button-small"
                        onClick={() => submitFeedback(log.id)}
                      >
                        Submit Feedback
                      </button>
                      <button 
                        className="button-secondary button-small"
                        onClick={() => {
                          setSelectedLogId(null);
                          setFeedbackText('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="button-secondary button-small"
                    onClick={() => setSelectedLogId(log.id)}
                    style={{ marginTop: "8px" }}
                  >
                    💬 Add Feedback
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📝</div>
            <h3>No team logs today</h3>
            <p>Your team members haven't submitted any logs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamReview;
