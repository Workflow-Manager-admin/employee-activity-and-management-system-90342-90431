import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/apiService";

/**
 * PUBLIC_INTERFACE
 * Enhanced sign-up form component with role selection and proper field alignment.
 * Allows new users to register with admin, employee, or manager roles.
 */
function SignUpForm() {
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "employee",
    department: "",
    position: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function doSignUp(e) {
    e.preventDefault();
    
    // Validate password confirmation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare registration data
      const registrationData = {
        email: form.email,
        password: form.password,
        first_name: form.firstName,
        last_name: form.lastName,
        role: form.role,
        department: form.department || null,
        position: form.position || null,
        hire_date: new Date().toISOString().split('T')[0] // Current date
      };

      await authAPI.register(registrationData);
      
      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
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
          Join Our Team
        </h1>
        <p className="signin-subtitle">
          Create your TATA ELXSI Employee Management account
        </p>
      </div>

      {/* Signup Card */}
      <div className="signin-card">
        {/* Card Header Accent */}
        <div className="signin-card-accent"></div>

        <div className="signin-card-title">
          📝 Sign Up
        </div>

        <form onSubmit={doSignUp} className="signin-form">
          {/* First Name Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              👤 First Name
            </label>
            <input
              className="signin-field-input"
              type="text"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          {/* Last Name Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              👤 Last Name
            </label>
            <input
              className="signin-field-input"
              type="text"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

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

          {/* Role Selection Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              🎯 Role
            </label>
            <select
              className="signin-field-input"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              required
              disabled={isLoading}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Department Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              🏢 Department (Optional)
            </label>
            <input
              className="signin-field-input"
              type="text"
              placeholder="Enter your department"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
              disabled={isLoading}
            />
          </div>

          {/* Position Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              💼 Position (Optional)
            </label>
            <input
              className="signin-field-input"
              type="text"
              placeholder="Enter your position"
              value={form.position}
              onChange={e => setForm({ ...form, position: e.target.value })}
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

          {/* Confirm Password Field */}
          <div className="signin-field-group">
            <label className="signin-field-label">
              🔒 Confirm Password
            </label>
            <input
              className="signin-field-input"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          {/* Sign Up Button */}
          <button 
            className="signin-submit-btn" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner signin-spinner"></div>
                Creating your account...
              </>
            ) : (
              <>
                🚀 Sign Up
              </>
            )}
          </button>
        </form>

        {/* Role Information */}
        <div className="signin-demo-info">
          <div className="signin-demo-header">
            <span className="signin-demo-icon">ℹ️</span>
            <strong className="signin-demo-title">Role Information</strong>
          </div>
          <p className="signin-demo-text">
            <strong>Employee:</strong> Can log daily work, submit leave requests<br/>
            <strong>Manager:</strong> Can review team logs, approve leave requests<br/>
            <strong>Admin:</strong> Full system access and management capabilities
          </p>
        </div>

        {/* Additional Links */}
        <div className="signin-help-links">
          <button
            type="button"
            className="signin-help-link"
            onClick={() => navigate("/login")}
          >
            🔐 Already have an account? Sign In
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

export default SignUpForm;
