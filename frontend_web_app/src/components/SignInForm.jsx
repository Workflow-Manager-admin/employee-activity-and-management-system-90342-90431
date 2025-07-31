import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Enhanced sign-in form component with proper field alignment and responsive design.
 * Ensures email and password fields fit properly within container with correct spacing.
 */
function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  async function doLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login({
        email: form.email,
        password: form.password
      });
      
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials and try again.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signin-form-container">
      {/* Welcome Section */}
      <div className="signin-welcome">
        <h1 className="signin-title">
          Welcome Back
        </h1>
        <p className="signin-subtitle">
          Sign in to access your TATA ELXSI Employee Management dashboard
        </p>
      </div>

      {/* Login Card */}
      <div className="signin-card">
        {/* Card Header Accent */}
        <div className="signin-card-accent"></div>

        <div className="signin-card-title">
          🔐 Sign In
        </div>

        <form onSubmit={doLogin} className="signin-form">
          {/* Email Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              📧 Email Address
            </label>
            <input
              className="signin-field-input"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              🔒 Password
            </label>
            <input
              className="signin-field-input"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          {/* Login Button */}
          <button 
            className="signin-submit-btn" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner signin-spinner"></div>
                Signing you in...
              </>
            ) : (
              <>
                🚀 Sign In
              </>
            )}
          </button>
        </form>

        {/* Login Information */}
        <div className="signin-demo-info">
          <div className="signin-demo-header">
            <span className="signin-demo-icon">ℹ️</span>
            <strong className="signin-demo-title">Login Information</strong>
          </div>
          <p className="signin-demo-text">
            Use your assigned credentials to access the system. For demo purposes, try:
            <br/>
            <strong>Admin:</strong> admin@company.com / admin123
            <br/>
            Contact your system administrator for additional accounts.
          </p>
        </div>

        {/* Additional Features */}
        <div className="signin-help-links">
          <button
            type="button"
            className="signin-help-link"
            onClick={() => {
              alert("This is a demo system. Password reset functionality would be implemented in a production environment.");
            }}
          >
            🔑 Forgot Password?
          </button>
          <button
            type="button"
            className="signin-help-link"
            onClick={() => {
              alert("This is a demo system. User registration would be handled by administrators in a production environment.");
            }}
          >
            📝 Need Help?
          </button>
        </div>
      </div>

      {/* Footer Information */}
      <div className="signin-footer">
        <p className="signin-footer-text">
          Secure employee management platform powered by TATA ELXSI technology.
          <br />
          For support, contact your system administrator.
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
