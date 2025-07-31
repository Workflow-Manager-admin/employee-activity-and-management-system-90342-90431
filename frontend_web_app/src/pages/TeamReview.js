import React from "react";

/**
 * PUBLIC_INTERFACE
 * Managers reviewing logs of their team.
 */
function TeamReview() {
  // Mocked team listing
  return (
    <div>
      <div className="card-title">Team Daily Logs (Today)</div>
      <div className="panel">
        <div className="log-entry">
          <b>A. Smith</b>: Completed Project Alpha (8h) – <span className="log-meta">OK</span>
        </div>
        <div className="log-entry">
          <b>B. Jones</b>: Reviewing Beta testing (7h) – <span className="log-meta">Feedback submitted</span>
        </div>
      </div>
      <div className="card-title">Recent Feedback</div>
      <div className="panel">
        <div className="log-entry"><b>A. Smith</b>: "Great work!"</div>
      </div>
    </div>
  );
}

export default TeamReview;
