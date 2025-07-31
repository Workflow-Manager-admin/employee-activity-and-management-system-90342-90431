import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/apiService";

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
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token and get user info
      // For now, we'll use the demo approach but in production,
      // this would validate the token with the backend
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
        }
      }
    }
    setIsLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  async function login(credentials) {
    try {
      // For demo purposes, we'll simulate API login
      // In production, this would call authAPI.login(credentials)
      const userObj = {
        name: credentials.email.split("@")[0] || "Demo User",
        email: credentials.email,
        role: credentials.role
      };
      
      setUser(userObj);
      localStorage.setItem('currentUser', JSON.stringify(userObj));
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
      
      return userObj;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // PUBLIC_INTERFACE
  async function logout() {
    try {
      // In production, would call authAPI.logout()
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoading }}>
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
