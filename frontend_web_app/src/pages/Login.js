import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

/**
 * PUBLIC_INTERFACE
 * Mock login page for demonstration.
 */
function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "employee" });
  const { login } = useUser();
  const navigate = useNavigate();

  function doLogin(e) {
    e.preventDefault();
    // Role selection for demo purposes
    login({
      name: form.email.split("@")[0] || "Demo User",
      email: form.email,
      role: form.role
    });
    navigate("/");
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center",
      minHeight: "63vh"
    }}>
      <div className="card" style={{maxWidth: 420, margin: "3rem 0"}}>
        <div className="card-title">Sign in</div>
        <form onSubmit={doLogin}>
          <input
            className="input"
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="select"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={{marginBottom: "16px"}}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Administrator</option>
          </select>
          <button className="button-primary" type="submit">Login</button>
        </form>
        <div style={{
          textAlign: "center", fontSize: "0.97em", color: "var(--secondary-purple)",
          marginTop: "18px"
        }}>
          Demo: Select a role above to sign in as different user type.
        </div>
        {/* Removed language selection dropdown from login page as per requirements */}
      </div>
    </div>
  );
}

export default Login;
