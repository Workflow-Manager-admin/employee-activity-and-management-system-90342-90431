import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * App header with brand display and integrated navigation for all user roles.
 */
function Header() {
  const { user, logout } = useUser();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <header className="header-gradient">
      <div className="header-align-center">
        <div className="header-flex-container">
          <div className="header-logo">TATA ELXSI</div>
          
          {user ? (
            <>
              {/* Mobile hamburger menu */}
              <button 
                className="mobile-nav-toggle"
                onClick={toggleNav}
                aria-label="Toggle navigation"
              >
                {isNavOpen ? '✕' : '☰'}
              </button>
              
              {/* Desktop navigation */}
              <nav className="header-nav desktop-nav">
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/work-log"
                  className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                >
                  Daily Log
                </NavLink>
                <NavLink
                  to="/leave-requests"
                  className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                >
                  Leave Requests
                </NavLink>
                {user.role === "manager" && (
                  <>
                    <NavLink
                      to="/team-review"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Team Review
                    </NavLink>
                    <NavLink
                      to="/leave-approvals"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Approvals
                    </NavLink>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <NavLink
                      to="/admin-panel"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Admin Panel
                    </NavLink>
                    <NavLink
                      to="/reporting"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Reporting
                    </NavLink>
                    <NavLink
                      to="/audit-trail"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Audit Trail
                    </NavLink>
                    <NavLink
                      to="/hierarchy"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Hierarchy
                    </NavLink>
                    <NavLink
                      to="/onboarding"
                      className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                    >
                      Onboarding
                    </NavLink>
                  </>
                )}
                <NavLink
                  to="/calendar"
                  className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                >
                  Calendar
                </NavLink>
                <NavLink
                  to="/notifications"
                  className={({ isActive }) => isActive ? "header-link-active" : "header-link"}
                >
                  Notifications
                </NavLink>
                <button
                  className="header-cta"
                  onClick={logout}
                >
                  Logout
                </button>
              </nav>

              {/* Mobile navigation dropdown */}
              {isNavOpen && (
                <nav className="mobile-nav-dropdown">
                  <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                    onClick={() => setIsNavOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/work-log"
                    className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                    onClick={() => setIsNavOpen(false)}
                  >
                    Daily Log
                  </NavLink>
                  <NavLink
                    to="/leave-requests"
                    className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                    onClick={() => setIsNavOpen(false)}
                  >
                    Leave Requests
                  </NavLink>
                  {user.role === "manager" && (
                    <>
                      <NavLink
                        to="/team-review"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Team Review
                      </NavLink>
                      <NavLink
                        to="/leave-approvals"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Approvals
                      </NavLink>
                    </>
                  )}
                  {user.role === "admin" && (
                    <>
                      <NavLink
                        to="/admin-panel"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Admin Panel
                      </NavLink>
                      <NavLink
                        to="/reporting"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Reporting
                      </NavLink>
                      <NavLink
                        to="/audit-trail"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Audit Trail
                      </NavLink>
                      <NavLink
                        to="/hierarchy"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Hierarchy
                      </NavLink>
                      <NavLink
                        to="/onboarding"
                        className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Onboarding
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    to="/calendar"
                    className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                    onClick={() => setIsNavOpen(false)}
                  >
                    Calendar
                  </NavLink>
                  <NavLink
                    to="/notifications"
                    className={({ isActive }) => isActive ? "mobile-nav-link-active" : "mobile-nav-link"}
                    onClick={() => setIsNavOpen(false)}
                  >
                    Notifications
                  </NavLink>
                  <button
                    className="mobile-nav-logout"
                    onClick={() => {
                      logout();
                      setIsNavOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="header-title-right">Employee Management</div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
