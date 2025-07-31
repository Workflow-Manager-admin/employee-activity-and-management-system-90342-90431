import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Enhanced sign-in form component with proper field alignment and responsive design.
 * Ensures email and password fields fit properly within container with correct spacing.
 */
function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "", role: "employee" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  function doLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      login({
        name: form.email.split("@")[0] || "Demo User",
        email: form.email,
        role: form.role
      });
      navigate("/");
      setIsLoading(false);
    }, 800);
  }

  const roleOptions = [
    { value: "employee", label: "👤 Employee", description: "Access personal dashboard and work logs" },
    { value: "manager", label: "👨‍💼 Manager", description: "Manage team and approve requests" },
    { value: "admin", label: "⚡ Administrator", description: "Full system administration access" }
  ];

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

          {/* Role Selection */}
          <div className="signin-role-group">
            <label className="signin-field-label">
              👥 Select Your Role
            </label>
            <div className="signin-role-options">
              {roleOptions.map((option) => (
                <label 
                  key={option.value}
                  className={`signin-role-option ${form.role === option.value ? 'signin-role-option-active' : ''}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={form.role === option.value}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    disabled={isLoading}
                    className="signin-role-radio"
                  />
                  <div className="signin-role-content">
                    <div className="signin-role-title">
                      {option.label}
                    </div>
                    <div className="signin-role-description">
                      {option.description}
                    </div>
                  </div>
                  {form.role === option.value && (
                    <div className="signin-role-check">
                      ✓
                    </div>
                  )}
                </label>
              ))}
            </div>
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

        {/* Demo Information */}
        <div className="signin-demo-info">
          <div className="signin-demo-header">
            <span className="signin-demo-icon">ℹ️</span>
            <strong className="signin-demo-title">Demo Mode</strong>
          </div>
          <p className="signin-demo-text">
            This is a demonstration system. Select any role above and use any email/password combination to explore the different user interfaces and features available in the system.
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
