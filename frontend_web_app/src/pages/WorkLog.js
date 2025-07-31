import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Employee daily work log (with attachments).
 */
function WorkLog() {
  const { user } = useUser();
  const [log, setLog] = useState({ description: "", hours: "", status: "In Progress", attachment: null });

  if (!user) return <div>Loading…</div>;

  // Sample submit
  function submitLog(e) {
    e.preventDefault();
    // Add API call here
    alert("Log submitted:\n" + JSON.stringify(log, null, 2));
    setLog({ ...log, description: "", hours: "" });
  }

  return (
    <div>
      <div className="card">
        <div className="card-title">Daily Work Log</div>
        <form onSubmit={submitLog}>
          <textarea
            className="textarea"
            rows={5}
            placeholder="Describe your tasks for today"
            value={log.description}
            onChange={e => setLog({ ...log, description: e.target.value })}
            required
          />
          <div className="flex-row">
            <input
              type="number"
              className="input"
              style={{ maxWidth: 120 }}
              value={log.hours}
              placeholder="Hours"
              min={0}
              max={16}
              onChange={e => setLog({ ...log, hours: e.target.value })}
            />
            <select
              className="select"
              value={log.status}
              onChange={e => setLog({ ...log, status: e.target.value })}
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>Blocked</option>
            </select>
            <input
              type="file"
              className="input"
              onChange={e => setLog({ ...log, attachment: e.target.files[0] })}
            />
          </div>
          <div className="card-actions">
            <button type="submit" className="button-primary">
              Submit Log
            </button>
          </div>
        </form>
      </div>
      {/* List of past logs (mocked) */}
      <div className="panel">
        <div className="card-title">Your Past Logs</div>
        <div>
          {/* Mock entries */}
          <div className="log-entry">
            <span className="log-meta">2024-06-13</span> – 7h, Project Alpha, <strong>Completed</strong>
          </div>
          <div className="log-entry">
            <span className="log-meta">2024-06-12</span> – 6h, Project Beta, <strong>Blocked</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkLog;
