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
    </aside>
  );
}

export default Sidebar;
