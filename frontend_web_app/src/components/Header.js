import React from "react";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Minimal main header: only shows brand. All nav/log out removed, per admin panel requirements.
 */
function Header() {
  const { user } = useUser();

  return (
    <header className="header-gradient">
      <div className="header-align-center">
        <div className="header-logo">TATA ELXSI</div>
        {/* If NOT logged in, show Employee Management right side title */}
        {!user && (
          <div className="header-title-right">
            Employee Management
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
