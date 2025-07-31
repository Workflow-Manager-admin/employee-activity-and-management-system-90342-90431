import React from "react";

/**
 * PUBLIC_INTERFACE
 * Real-time notification and reminder wall.
 */
function Notifications() {
  // Would fetch real notifications via websocket or API in real product
  return (
    <div className="card">
      <div className="card-title">Your Notifications</div>
      <div className="notification success">Manager approved your leave for 2024-06-10.</div>
      <div className="notification info">It’s time to submit your Daily Log!</div>
      <div className="notification error">One of your logs was edited by admin (see audit trail).</div>
    </div>
  );
}

export default Notifications;
