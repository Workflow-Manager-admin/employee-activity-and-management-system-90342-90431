import React from "react";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Dashboard, role-aware overview.
 */
function Dashboard() {
  const { user } = useUser();
  if (!user) return <div>Loading…</div>;

  if (user.role === "employee") {
    return (
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Your Daily Work Logs</div>
          <div>See and edit today's report, submit a new one, or review past history.</div>
        </div>
        <div className="card">
          <div className="card-title">Leave Status</div>
          <div>Any pending approvals or recent leave requests will show here.</div>
        </div>
      </div>
    );
  }

  if (user.role === "manager") {
    return (
      <div className="grid-3">
        <div className="card">
          <div className="card-title">Team Log Summary</div>
          <div>Review today's log submissions, feedback actions, and blockers by your team.</div>
        </div>
        <div className="card">
          <div className="card-title">Pending Leave Requests</div>
          <div>Approve or review team leave requests.</div>
        </div>
        <div className="card">
          <div className="card-title">Visual Reports</div>
          <div>See productivity and activity trends, graphical views.</div>
        </div>
      </div>
    );
  }

  if (user.role === "admin") {
    return (
      <div className="grid-3">
        <div className="card">
          <div className="card-title">Organization Overview</div>
          <div>Summary of users, departments, pending onboarding actions.</div>
        </div>
        <div className="card">
          <div className="card-title">Audit/Audit Trail</div>
          <div>See latest admin or system actions across platform.</div>
        </div>
        <div className="card">
          <div className="card-title">System Reporting</div>
          <div>Access reporting, export tools and admin analytics.</div>
        </div>
      </div>
    );
  }

  return <div>Welcome to the Employee Activity & Management System</div>;
}

export default Dashboard;
