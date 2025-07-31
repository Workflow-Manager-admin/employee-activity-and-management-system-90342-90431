import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Enhanced login page with modern visual design.
 */
function Login() {
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
    <div style={{
      display: "flex", 
      alignItems: "center", 
      flexDirection: "column", 
      justifyContent: "center",
      minHeight: "75vh",
      background: "linear-gradient(135deg, rgba(37, 72, 138, 0.02) 0%, rgba(164, 43, 141, 0.02) 100%)",
      padding: "20px"
    }}>
      {/* Welcome Section */}
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
        maxWidth: "500px"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          background: "linear-gradient(135deg, var(--primary-blue), var(--secondary-purple), var(--accent-pink))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "12px",
          letterSpacing: "0.5px"
        }}>
          Welcome Back
        </h1>
        <p style={{
          fontSize: "1.2rem",
          color: "var(--secondary-purple)",
          opacity: "0.8",
          lineHeight: "1.6"
        }}>
          Sign in to access your TATA ELXSI Employee Management dashboard
        </p>
      </div>

      {/* Login Card */}
      <div className="card" style={{
        maxWidth: 480,
        width: "100%",
        margin: "0 auto",
        background: "var(--bg-canvas)",
        boxShadow: "var(--shadow-strong)",
        border: "1px solid rgba(37, 72, 138, 0.08)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Card Header Accent */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, var(--primary-blue), var(--secondary-purple), var(--accent-pink))"
        }}></div>

        <div className="card-title" style={{
          textAlign: "center",
          fontSize: "1.8rem",
          marginBottom: "32px",
          color: "var(--primary-blue)"
        }}>
          🔐 Sign In
        </div>

        <form onSubmit={doLogin} style={{ position: "relative" }}>
          {/* Email Field */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "var(--text-dark)",
              fontSize: "1rem"
            }}>
              📧 Email Address
            </label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              disabled={isLoading}
              style={{
                fontSize: "1.1rem",
                padding: "16px 20px",
                background: isLoading ? "var(--light-bg)" : "var(--bg-canvas)"
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "var(--text-dark)",
              fontSize: "1rem"
            }}>
              🔒 Password
            </label>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              disabled={isLoading}
              style={{
                fontSize: "1.1rem",
                padding: "16px 20px",
                background: isLoading ? "var(--light-bg)" : "var(--bg-canvas)"
              }}
            />
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{
              display: "block",
              marginBottom: "12px",
              fontWeight: "600",
              color: "var(--text-dark)",
              fontSize: "1rem"
            }}>
              👥 Select Your Role
            </label>
            <div style={{ 
              display: "grid", 
              gap: "12px" 
            }}>
              {roleOptions.map((option) => (
                <label 
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px 20px",
                    border: `2px solid ${form.role === option.value ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                    borderRadius: "var(--btn-radius)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: form.role === option.value 
                      ? "linear-gradient(135deg, rgba(37, 72, 138, 0.05), rgba(37, 72, 138, 0.02))" 
                      : "var(--bg-canvas)",
                    transform: form.role === option.value ? "scale(1.02)" : "scale(1)"
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={form.role === option.value}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    disabled={isLoading}
                    style={{ display: "none" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: "700",
                      fontSize: "1.1rem",
                      color: form.role === option.value ? "var(--primary-blue)" : "var(--text-dark)",
                      marginBottom: "4px"
                    }}>
                      {option.label}
                    </div>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "var(--secondary-purple)",
                      opacity: "0.8"
                    }}>
                      {option.description}
                    </div>
                  </div>
                  {form.role === option.value && (
                    <div style={{
                      color: "var(--primary-blue)",
                      fontSize: "1.2rem",
                      marginLeft: "12px"
                    }}>
                      ✓
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <button 
            className="button-primary" 
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              fontSize: "1.2rem",
              padding: "18px",
              borderRadius: "var(--btn-radius)",
              background: isLoading 
                ? "linear-gradient(45deg, rgba(245, 196, 0, 0.6), rgba(216, 29, 109, 0.6))"
                : "linear-gradient(45deg, var(--accent-yellow), var(--accent-pink))",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px"
            }}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner" style={{ 
                  width: "20px", 
                  height: "20px",
                  borderWidth: "2px"
                }}></div>
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
        <div style={{
          marginTop: "32px",
          padding: "20px",
          background: "linear-gradient(135deg, var(--light-bg), rgba(245, 246, 251, 0.5))",
          borderRadius: "var(--btn-radius)",
          border: "1px solid var(--border-color)"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "12px"
          }}>
            <span style={{
              fontSize: "1.5rem",
              marginRight: "8px"
            }}>
              ℹ️
            </span>
            <strong style={{
              color: "var(--primary-blue)",
              fontSize: "1.1rem"
            }}>
              Demo Mode
            </strong>
          </div>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--secondary-purple)",
            lineHeight: "1.5",
            margin: "0",
            textAlign: "center"
          }}>
            This is a demonstration system. Select any role above and use any email/password combination to explore the different user interfaces and features available in the system.
          </p>
        </div>

        {/* Additional Features */}
        <div style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap"
        }}>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "var(--secondary-purple)",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.95rem",
              padding: "4px"
            }}
            onClick={() => {
              alert("This is a demo system. Password reset functionality would be implemented in a production environment.");
            }}
          >
            🔑 Forgot Password?
          </button>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "var(--secondary-purple)",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.95rem",
              padding: "4px"
            }}
            onClick={() => {
              alert("This is a demo system. User registration would be handled by administrators in a production environment.");
            }}
          >
            📝 Need Help?
          </button>
        </div>
      </div>

      {/* Footer Information */}
      <div style={{
        marginTop: "40px",
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <p style={{
          fontSize: "0.9rem",
          color: "var(--secondary-purple)",
          opacity: "0.7",
          lineHeight: "1.5"
        }}>
          Secure employee management platform powered by TATA ELXSI technology.
          <br />
          For support, contact your system administrator.
        </p>
      </div>
    </div>
  );
}

export default Login;
