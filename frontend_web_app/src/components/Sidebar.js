import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Role aware sidebar for secondary navigation.
 */
function Sidebar() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <aside className="sidebar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "sidebar-link-active" : "sidebar-link"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/work-log"
        className={({ isActive }) =>
          isActive ? "sidebar-link-active" : "sidebar-link"
        }
      >
        Daily Log
      </NavLink>
      <NavLink
        to="/leave-requests"
        className={({ isActive }) =>
          isActive ? "sidebar-link-active" : "sidebar-link"
        }
      >
        Leave Requests
      </NavLink>
      {user.role === "manager" && (
        <>
          <NavLink
            to="/team-review"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Team Review
          </NavLink>
          <NavLink
            to="/leave-approvals"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Approvals
          </NavLink>
        </>
      )}
      {user.role === "admin" && (
        <>
          <NavLink
            to="/admin-panel"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Admin Panel
          </NavLink>
          <NavLink
            to="/reporting"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Reporting
          </NavLink>
          <NavLink
            to="/audit-trail"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Audit Trail
          </NavLink>
          <NavLink
            to="/hierarchy"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Hierarchy
          </NavLink>
          <NavLink
            to="/onboarding"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            Onboarding
          </NavLink>
        </>
      )}
      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          isActive ? "sidebar-link-active" : "sidebar-link"
        }
      >
        Calendar
      </NavLink>
      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          isActive ? "sidebar-link-active" : "sidebar-link"
        }
      >
        Notifications
      </NavLink>
      {/* Logout option always last and prominent in sidebar for admin and other roles */}
      <LogoutSidebarButton />
    </aside>
  );
}

/** LogoutSidebarButton - context aware render, button only for authenticated users. */
function LogoutSidebarButton() {
  const { user, logout } = useUser() || {};
  if (!user) return null;
  return (
    <button
      className="button-secondary"
      onClick={logout}
      style={{
        width: "80%",
        margin: "2em 10% 0 10%",
        display: "block",
        background: "var(--accent-yellow)",
        color: "var(--text-white)",
        fontWeight: "bold",
        borderRadius: 8,
        fontSize: "1.04rem",
        border: "none"
      }}
      tabIndex={0}
    >
      Logout
    </button>
  );
}

export default Sidebar;
