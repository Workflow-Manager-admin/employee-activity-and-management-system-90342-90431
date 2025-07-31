import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
// A React context for user (auth/role) state for the app.
const UserContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provides logged-in user and role for downstream consumers.
 * Handles login/logout.
 */
export function UserProvider({ children }) {
  // Example user state: { name, email, role: 'employee'|'manager'|'admin' }
  const [user, setUser] = useState(null);

  // PUBLIC_INTERFACE
  function login(userObj) {
    setUser(userObj);
  }
  // PUBLIC_INTERFACE
  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * Hook for accessing user context object.
 */
export function useUser() {
  return useContext(UserContext);
}
