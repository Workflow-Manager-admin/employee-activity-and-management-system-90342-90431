import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Enhanced employee daily work log with improved visual design.
 */
function WorkLog() {
  const { user } = useUser();
  const [log, setLog] = useState({ 
    description: "", 
    hours: "", 
    status: "In Progress", 
    attachment: null,
    project: "",
    category: "Development"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!user) {
    return (
      <div className="loading-text">
        <div className="loading-spinner"></div>
        Loading your work log...
      </div>
    );
  }

  function submitLog(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitSuccess(true);
      setLog({ 
        ...log, 
        description: "", 
        hours: "", 
        project: "",
        attachment: null 
      });
      setIsSubmitting(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1200);
  }

  const statusOptions = [
    { value: "In Progress", icon: "🔄", color: "var(--warning-orange)" },
    { value: "Completed", icon: "✅", color: "var(--success-green)" },
    { value: "Blocked", icon: "🚫", color: "var(--danger-red)" },
    { value: "On Hold", icon: "⏸️", color: "var(--info-cyan)" }
  ];

  const categoryOptions = [
    { value: "Development", icon: "💻" },
    { value: "Testing", icon: "🧪" },
    { value: "Documentation", icon: "📝" },
    { value: "Meeting", icon: "🤝" },
    { value: "Training", icon: "📚" },
    { value: "Support", icon: "🛠️" }
  ];

  const mockLogs = [
    {
      date: "2024-06-13",
      hours: 7,
      project: "Project Alpha",
      status: "Completed",
      description: "Implemented user authentication module and wrote unit tests",
      category: "Development"
    },
    {
      date: "2024-06-12",
      hours: 6,
      project: "Project Beta",
      status: "Blocked",
      description: "Working on API integration - waiting for backend team",
      category: "Development"
    },
    {
      date: "2024-06-11",
      hours: 8,
      project: "Project Gamma",
      status: "Completed",
      description: "Sprint planning and code review session",
      category: "Meeting"
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{
        marginBottom: "32px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          background: "linear-gradient(135deg, var(--primary-blue), var(--secondary-purple))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "8px"
        }}>
          📋 Daily Work Log
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "var(--secondary-purple)",
          opacity: "0.8"
        }}>
          Track your daily activities and progress
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="notification success" style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ fontSize: "1.2rem" }}>🎉</span>
          Work log submitted successfully! Keep up the great work.
        </div>
      )}

      {/* Log Entry Form */}
      <div className="card">
        <div className="card-title">
          ✏️ Today's Work Entry
        </div>
        
        <form onSubmit={submitLog}>
          {/* Project and Category Row */}
          <div className="grid-2" style={{ marginBottom: "20px" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                🎯 Project Name
              </label>
              <input
                className="input"
                type="text"
                placeholder="e.g., Project Alpha, Client Dashboard"
                value={log.project}
                onChange={e => setLog({ ...log, project: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                📂 Category
              </label>
              <select
                className="select"
                value={log.category}
                onChange={e => setLog({ ...log, category: e.target.value })}
                disabled={isSubmitting}
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "var(--text-dark)"
            }}>
              📝 Task Description
            </label>
            <textarea
              className="textarea"
              rows={5}
              placeholder="Describe your tasks, accomplishments, and any blockers you encountered today..."
              value={log.description}
              onChange={e => setLog({ ...log, description: e.target.value })}
              required
              disabled={isSubmitting}
              style={{
                resize: "vertical",
                minHeight: "120px"
              }}
            />
          </div>

          {/* Hours, Status, and Attachment */}
          <div className="flex-row" style={{ marginBottom: "20px", alignItems: "flex-end" }}>
            <div style={{ flex: "0 0 150px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                ⏰ Hours Worked
              </label>
              <input
                type="number"
                className="input"
                value={log.hours}
                placeholder="8"
                min={0}
                max={16}
                step={0.5}
                onChange={e => setLog({ ...log, hours: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div style={{ flex: "1", marginLeft: "16px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                📊 Status
              </label>
              <select
                className="select"
                value={log.status}
                onChange={e => setLog({ ...log, status: e.target.value })}
                disabled={isSubmitting}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.value}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ flex: "1", marginLeft: "16px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "var(--text-dark)"
              }}>
                📎 Attachment (Optional)
              </label>
              <input
                type="file"
                className="input"
                onChange={e => setLog({ ...log, attachment: e.target.files[0] })}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="card-actions">
            <button 
              type="submit" 
              className="button-primary"
              disabled={isSubmitting}
              style={{
                minWidth: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner" style={{ 
                    width: "18px", 
                    height: "18px",
                    borderWidth: "2px"
                  }}></div>
                  Submitting...
                </>
              ) : (
                <>
                  🚀 Submit Log
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="button-secondary"
              onClick={() => setLog({ 
                description: "", 
                hours: "", 
                status: "In Progress", 
                attachment: null,
                project: "",
                category: "Development"
              })}
              disabled={isSubmitting}
            >
              🗑️ Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Past Logs */}
      <div className="card">
        <div className="card-title">
          📈 Your Recent Work History
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>📅 Date</th>
                <th>🎯 Project</th>
                <th>📂 Category</th>
                <th>⏰ Hours</th>
                <th>📊 Status</th>
                <th>📝 Description</th>
                <th>⚡ Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((entry, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "600" }}>{entry.date}</td>
                  <td style={{ fontWeight: "600", color: "var(--primary-blue)" }}>
                    {entry.project}
                  </td>
                  <td>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      background: "var(--light-bg)",
                      color: "var(--text-dark)",
                      fontWeight: "600"
                    }}>
                      {categoryOptions.find(c => c.value === entry.category)?.icon} {entry.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: "700" }}>{entry.hours}h</td>
                  <td>
                    <span className={`status-indicator status-${entry.status.toLowerCase().replace(' ', '-')}`}>
                      {statusOptions.find(s => s.value === entry.status)?.icon} {entry.status}
                    </span>
                  </td>
                  <td style={{ 
                    maxWidth: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {entry.description}
                  </td>
                  <td>
                    <button 
                      className="button-secondary button-small"
                      style={{ marginRight: "8px" }}
                      onClick={() => alert("Edit functionality would be implemented here")}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="button-secondary button-small"
                      onClick={() => alert("View details functionality would be implemented here")}
                    >
                      👁️ View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary Stats */}
        <div style={{
          marginTop: "24px",
          padding: "20px",
          background: "linear-gradient(135deg, var(--light-bg), rgba(245, 246, 251, 0.5))",
          borderRadius: "var(--btn-radius)",
          border: "1px solid var(--border-color)"
        }}>
          <div className="grid-3">
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "2rem", 
                fontWeight: "800", 
                color: "var(--success-green)",
                marginBottom: "8px"
              }}>
                21
              </div>
              <div style={{ 
                color: "var(--secondary-purple)", 
                fontWeight: "600",
                fontSize: "0.95rem"
              }}>
                Total Hours This Week
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "2rem", 
                fontWeight: "800", 
                color: "var(--accent-yellow)",
                marginBottom: "8px"
              }}>
                5
              </div>
              <div style={{ 
                color: "var(--secondary-purple)", 
                fontWeight: "600",
                fontSize: "0.95rem"
              }}>
                Tasks Completed
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "2rem", 
                fontWeight: "800", 
                color: "var(--primary-blue)",
                marginBottom: "8px"
              }}>
                92%
              </div>
              <div style={{ 
                color: "var(--secondary-purple)", 
                fontWeight: "600",
                fontSize: "0.95rem"
              }}>
                Completion Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkLog;
