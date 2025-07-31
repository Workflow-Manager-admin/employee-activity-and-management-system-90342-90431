import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Branded employee details form for onboarding or editing.
 * Presents all standard HR fields with validation and Save/Cancel controls.
 * - Triggers onSave(formData) with all fields when valid and only when user submits via bottom 'Add Employee' button
 * - Employee Number is only auto-generated if not passed through props (and locked during modal session)
 */
function EmployeeDetailsForm({
  open = false,
  initial = {},
  onSave,
  onCancel,
  genEmpNo = null,   // If provided, lock this as unique employee number for this session (see Onboarding.js)
  addMode = false,   // If true, bottom button says "Add Employee" instead of Save
  departments = ["Engineering", "HR", "Finance", "Sales", "Operations", "IT", "QA"],
  designations = ["Software Engineer", "Manager", "HR Executive", "Director", "Lead", "Intern"],
  roles = ["Employee", "Manager", "Admin"],
  locations = ["Bangalore", "Mumbai", "Delhi", "Remote", "Other"]
}) {
  // Default form initial values
  const [form, setForm] = useState({
    empNo: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    designation: "",
    joiningDate: "",
    role: "",
    dob: "",
    gender: "",
    manager: "",
    location: ""
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // Determine if the employee number should be locked (for add employee/wizard)
  useEffect(() => {
    setForm(f => ({
      ...f,
      ...initial,
      empNo: initial.empNo || genEmpNo || f.empNo || `EMP${Math.floor(100000 + Math.random() * 900000)}`
    }));
    // On open or new genEmpNo supplied, lock the number for the session
    // eslint-disable-next-line
  }, [initial, genEmpNo, open]); // always lock when opened or new empNo passed

  // Validation for each field
  function validate(values) {
    const errs = {};
    if (!values.name) errs.name = "Required";
    if (!values.email) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = "Invalid email format";
    if (!values.phone) errs.phone = "Required";
    else if (!/^\d{10,15}$/.test(values.phone.replace(/\D/g, "")))
      errs.phone = "Enter valid phone number";
    if (!values.department) errs.department = "Select department";
    if (!values.designation) errs.designation = "Select designation";
    if (!values.joiningDate) errs.joiningDate = "Required";
    if (!values.role) errs.role = "Required";
    if (!values.dob) errs.dob = "Required";
    if (!values.gender) errs.gender = "Select";
    if (!values.manager) errs.manager = "Required";
    if (!values.location) errs.location = "Select";
    // Address is optional
    return errs;
  }
  useEffect(() => {
    setErrors(validate(form));
    // eslint-disable-next-line
  }, [form]);

  function onFieldChange(field, value) {
    setForm({ ...form, [field]: value });
    setTouched({ ...touched, [field]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0 && onSave) {
      onSave(form);
    }
  }

  function cancel(e) {
    if (e) e.preventDefault();
    if (onCancel) onCancel();
  }

  // Keyboard: close on ESC
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") cancel();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [open]);

  // If not open, render nothing for modal
  if (!open) return null;

  // --- Enhanced Modal Styling & Button for clarity ---
  return (
    <div style={{
      position: "fixed",
      zIndex: 1500,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      background: "rgba(37,72,138,0.14)"
    }}>
      <div style={{
        maxWidth: 700,
        minWidth: 340,
        margin: "58px auto",
        background: "var(--bg-canvas)",
        borderRadius: 18,
        boxShadow: "0 12px 58px rgba(37,72,138,0.19)",
        padding: "46px 38px 46px 38px",
        position: "relative",
        minHeight: 70,
      }}>
        <button
          style={{
            position: "absolute", right: 20, top: 16, fontSize: 26, border: "none",
            background: "none", color: "var(--accent-pink)", cursor: "pointer", fontWeight: 800
          }}
          aria-label="Close"
          tabIndex={0}
          onClick={cancel}
        >
          &times;
        </button>
        <div className="card-title" style={{
          fontSize: "1.60rem",
          color: "var(--primary-blue)",
          textAlign: "center",
          marginBottom: 22,
          fontWeight: 800,
          letterSpacing: 0.3
        }}>
          Employee Details Entry
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Form fields in two grid columns with extra gap for clarity */}
          <div className="grid-2" style={{ gap: 36, marginBottom: 10 }}>
            {/* Employee Number */}
            <div>
              <label style={{ fontWeight: 700, fontSize: "1.08em" }}>Employee Number</label>
              <input className="input" value={form.empNo} readOnly tabIndex={-1}
                style={{
                  background: "#f8f8f8",
                  color: "gray",
                  fontWeight: 600,
                  letterSpacing: 1,
                  fontSize: "1.11em",
                  marginTop: 9
                }} />
            </div>
            {/* Name */}
            <div>
              <label style={{ fontWeight: 700 }}>Employee Name <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <input
                className="input"
                style={{ marginTop: 9 }}
                type="text"
                value={form.name}
                onChange={e => onFieldChange("name", e.target.value)}
                required
                placeholder="Full Name"
              />
              {errors.name && touched.name &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.name}</div>}
            </div>
            {/* Email */}
            <div>
              <label style={{ fontWeight: 700 }}>Email <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <input
                className="input"
                style={{ marginTop: 9 }}
                type="email"
                value={form.email}
                onChange={e => onFieldChange("email", e.target.value)}
                required
                placeholder="user@domain.com"
              />
              {errors.email && touched.email &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.email}</div>}
            </div>
            {/* Phone */}
            <div>
              <label style={{ fontWeight: 700 }}>Phone Number <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <input
                className="input"
                style={{ marginTop: 9 }}
                type="tel"
                value={form.phone}
                onChange={e => onFieldChange("phone", e.target.value)}
                required
                placeholder="10-15 digit number"
              />
              {errors.phone && touched.phone &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.phone}</div>}
            </div>
            {/* DOB */}
            <div>
              <label style={{ fontWeight: 700 }}>Date of Birth <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <input
                className="input"
                style={{ marginTop: 9 }}
                type="date"
                value={form.dob}
                onChange={e => onFieldChange("dob", e.target.value)}
                required
              />
              {errors.dob && touched.dob &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.dob}</div>}
            </div>
            {/* Gender */}
            <div>
              <label style={{ fontWeight: 700 }}>Gender <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <select className="select"
                style={{ marginTop: 9 }}
                value={form.gender}
                onChange={e => onFieldChange("gender", e.target.value)}
                required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
              {errors.gender && touched.gender &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.gender}</div>}
            </div>
            {/* Department */}
            <div>
              <label style={{ fontWeight: 700 }}>Department <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <select className="select"
                style={{ marginTop: 9 }}
                value={form.department}
                onChange={e => onFieldChange("department", e.target.value)}
                required>
                <option value="">Select</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
              {errors.department && touched.department &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.department}</div>}
            </div>
            {/* Designation */}
            <div>
              <label style={{ fontWeight: 700 }}>Designation <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <select className="select"
                style={{ marginTop: 9 }}
                value={form.designation}
                onChange={e => onFieldChange("designation", e.target.value)}
                required>
                <option value="">Select</option>
                {designations.map(d => <option key={d}>{d}</option>)}
              </select>
              {errors.designation && touched.designation &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.designation}</div>}
            </div>
            {/* Joining Date */}
            <div>
              <label style={{ fontWeight: 700 }}>Joining Date <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <input
                className="input"
                style={{ marginTop: 9 }}
                type="date"
                value={form.joiningDate}
                onChange={e => onFieldChange("joiningDate", e.target.value)}
                required
              />
              {errors.joiningDate && touched.joiningDate &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.joiningDate}</div>}
            </div>
            {/* Role */}
            <div>
              <label style={{ fontWeight: 700 }}>Role <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <select className="select"
                style={{ marginTop: 9 }}
                value={form.role}
                onChange={e => onFieldChange("role", e.target.value)}
                required>
                <option value="">Select</option>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
              {errors.role && touched.role &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.role}</div>}
            </div>
            {/* Manager/Supervisor */}
            <div>
              <label style={{ fontWeight: 700 }}>Manager/Supervisor <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <input
                className="input"
                style={{ marginTop: 9 }}
                type="text"
                value={form.manager}
                onChange={e => onFieldChange("manager", e.target.value)}
                required
                placeholder="Manager name or email"
              />
              {errors.manager && touched.manager &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.manager}</div>}
            </div>
            {/* Work Location */}
            <div>
              <label style={{ fontWeight: 700 }}>Work Location <span style={{ color: "var(--accent-pink)" }}>*</span></label>
              <select className="select"
                style={{ marginTop: 9 }}
                value={form.location}
                onChange={e => onFieldChange("location", e.target.value)}
                required>
                <option value="">Select</option>
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
              {errors.location && touched.location &&
                <div style={{ color: "var(--accent-pink)", fontSize: ".99em", marginTop: -13 }}>{errors.location}</div>}
            </div>
            {/* Address (full width) */}
            <div className="grid-2" style={{ gridColumn: "1/3" }}>
              <div style={{ width: "100%" }}>
                <label style={{ fontWeight: 700 }}>Address</label>
                <textarea
                  className="textarea"
                  rows={2}
                  value={form.address}
                  onChange={e => onFieldChange("address", e.target.value)}
                  placeholder="Address (optional)"
                  style={{ resize: "vertical", minHeight: 36, maxHeight: 80, marginTop: 9 }}
                />
              </div>
            </div>
          </div>
          {/* Save/Cancel - only show 'Add Employee' prominent button at bottom, full width. */}
          <div
            className="card-actions"
            style={{
              marginTop: 48,
              display: 'flex',
              flexDirection: "row",
              justifyContent: "center",
              gap: 22
            }}
          >
            <button
              className="button-secondary"
              type="button"
              onClick={cancel}
              style={{
                minWidth: 105,
                fontSize: "1.08rem",
                fontWeight: 600,
                padding: "13px 34px",
                borderRadius: 9
              }}
            >
              Cancel
            </button>
            <button
              className="button-primary"
              type="submit"
              disabled={Object.keys(errors).length > 0}
              style={{
                minWidth: 220,
                fontSize: "1.21rem",
                padding: "18px 0",
                borderRadius: 12,
                fontWeight: 800,
                background: "var(--accent-yellow)",
                color: "#fff",
                boxShadow: "0 5px 26px rgba(245,196,0,0.13)",
                transition: "box-shadow 0.20s"
              }}
            >
              {addMode ? "Add Employee" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeDetailsForm;
