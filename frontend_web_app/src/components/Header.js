import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * The main branded header navigation component.
 * Only supports light mode (no theme/dark mode) and no localization.
 */
function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Visually center "TATA ELXSI" (left) and "Employee Management" (right) within banner
  return (
    <header className="header-gradient">
      <div className="header-align-center">
        <div className="header-logo">TATA ELXSI</div>
        <nav className="header-nav">
          {user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "header-link-active" : "header-link"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/work-log"
                className={({ isActive }) =>
                  isActive ? "header-link-active" : "header-link"
                }
              >
                Daily Log
              </NavLink>
              <NavLink
                to="/leave-requests"
                className={({ isActive }) =>
                  isActive ? "header-link-active" : "header-link"
                }
              >
                Leave
              </NavLink>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive ? "header-link-active" : "header-link"
                }
              >
                Notifications
              </NavLink>
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  isActive ? "header-link-active" : "header-link"
                }
              >
                Calendar
              </NavLink>
              {user.role === "manager" && (
                <>
                  <NavLink
                    to="/team-review"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Team Review
                  </NavLink>
                  <NavLink
                    to="/leave-approvals"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Leave Approvals
                  </NavLink>
                </>
              )}
              {user.role === "admin" && (
                <>
                  <NavLink
                    to="/admin-panel"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Admin Panel
                  </NavLink>
                  <NavLink
                    to="/reporting"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Reporting
                  </NavLink>
                  <NavLink
                    to="/audit-trail"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Audit Trail
                  </NavLink>
                  <NavLink
                    to="/hierarchy"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Hierarchy
                  </NavLink>
                  <NavLink
                    to="/onboarding"
                    className={({ isActive }) =>
                      isActive ? "header-link-active" : "header-link"
                    }
                  >
                    Onboarding
                  </NavLink>
                </>
              )}
              <button
                type="button"
                className="header-cta"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
          {/* Intentionally removed public Sign In/Register button for admin-only onboarding. */}
        </nav>
        <div className="header-title-right">
          Employee Management
        </div>
      </div>
    </header>
  );
}

export default Header;
