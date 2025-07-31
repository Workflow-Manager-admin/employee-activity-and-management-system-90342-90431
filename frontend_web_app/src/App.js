import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import WorkLog from "./pages/WorkLog";
import LeaveRequests from "./pages/LeaveRequests";
import Notifications from "./pages/Notifications";
import TeamReview from "./pages/TeamReview";
import LeaveApprovals from "./pages/LeaveApprovals";
import AdminPanel from "./pages/AdminPanel";
import AuditTrail from "./pages/AuditTrail";
import Reporting from "./pages/Reporting";
import CalendarView from "./pages/CalendarView";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import HierarchyMgmt from "./pages/HierarchyMgmt";
import { UserProvider, useUser } from "./contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Root App component.
 * Handles routing, role-based layouts, and high-level context.
 * All light mode only, no localization or theme switches.
 */
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="app-main-area">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/" element={<RequireAuth />}>
                <Route index element={<Dashboard />} />
                <Route path="work-log" element={<WorkLog />} />
                <Route path="leave-requests" element={<LeaveRequests />} />
                <Route path="notifications" element={<Notifications />} />

                {/* Manager-only */}
                <Route path="team-review" element={<ProtectedRoute role="manager"><TeamReview /></ProtectedRoute>} />
                <Route path="leave-approvals" element={<ProtectedRoute role="manager"><LeaveApprovals /></ProtectedRoute>} />

                {/* Admin-only */}
                <Route path="admin-panel" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
                <Route path="audit-trail" element={<ProtectedRoute role="admin"><AuditTrail /></ProtectedRoute>} />
                <Route path="reporting" element={<ProtectedRoute role="admin"><Reporting /></ProtectedRoute>} />
                <Route path="hierarchy" element={<ProtectedRoute role="admin"><HierarchyMgmt /></ProtectedRoute>} />
              </Route>
              {/* Calendar is visible to all roles */}
              <Route path="/calendar" element={<CalendarView />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

/**
 * PUBLIC_INTERFACE
 * Require user authentication. Redirects to login if not authenticated.
 */
function RequireAuth({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Render sidebar and children for authenticated users
  return (
    <div className="app-content-with-sidebar">
      <Sidebar />
      <div className="app-content-area">{children}</div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Enforces route access for a given role.
 * @param {string} role - Allowed role: 'employee', 'manager', or 'admin'
 */
function ProtectedRoute({ role, children }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
