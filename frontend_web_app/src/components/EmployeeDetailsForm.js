import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Branded employee details form for onboarding or editing.
 * Presents all standard HR fields with validation and Save/Cancel controls.
 * - Triggers onSave(formData) with all fields when valid.
 * - Triggers onCancel() on cancel.
 * - Employee Number is auto-generated and readonly.
 */
function EmployeeDetailsForm({
  open = false,
  initial = {},
  onSave,
  onCancel,
  genEmpNo = null,
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
  // Field order for accessibility
  const fieldOrder = [
    "empNo", "name", "email", "phone", "dob",
    "address", "department", "designation", "joiningDate", 
    "role", "gender", "manager", "location"
  ];

  // Generate Employee Number if not provided (6 digits, EMP prefix)
  useEffect(() => {
    setForm(f => ({
      ...f,
      ...initial,
      empNo:
        initial.empNo ||
        genEmpNo ||
        `EMP${Math.floor(100000 + Math.random() * 900000)}`
    }));
  }, [initial, genEmpNo, open]);

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

  // Branded Modal - full width on mobile, centered card on desktop
  return (
    <div style={{
      position: "fixed", zIndex: 1500, left: 0, top: 0, width: "100%", height: "100%",
      background: "rgba(37,72,138,0.09)"
    }}>
      <div style={{
        maxWidth: 550, margin: "35px auto", background: "var(--bg-canvas)", borderRadius: 14,
        boxShadow: "0 8px 38px rgba(37,72,138,0.18)",
        padding: "36px 24px 24px 24px", position: "relative"
      }}>
        <button
          style={{
            position: "absolute", right: 18, top: 16, fontSize: 23, border: "none",
            background: "none", color: "var(--accent-pink)", cursor: "pointer", fontWeight: 700
          }}
          aria-label="Close"
          tabIndex={0}
          onClick={cancel}
        >
          &times;
        </button>
        <div className="card-title" style={{
          fontSize: "1.35rem",
          color: "var(--primary-blue)", textAlign: "center", marginBottom: 16
        }}>
          Employee Details Entry
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Form fields grouped for desktop (2 columns) */}
          <div className="grid-2">
            {/* Employee Number */}
            <div>
              <label style={{fontWeight:600}}>Employee Number</label>
              <input className="input" value={form.empNo} readOnly tabIndex={-1}
                style={{background: "#f8f8f8", color: "gray"}}/>
            </div>
            {/* Name */}
            <div>
              <label style={{fontWeight:600}}>Employee Name <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <input
                className="input"
                type="text"
                value={form.name}
                onChange={e => onFieldChange("name", e.target.value)}
                required
                placeholder="Full Name"
              />
              {errors.name && touched.name &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.name}</div>}
            </div>
            {/* Email */}
            <div>
              <label style={{fontWeight:600}}>Email <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={e => onFieldChange("email", e.target.value)}
                required
                placeholder="user@domain.com"
              />
              {errors.email && touched.email &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.email}</div>}
            </div>
            {/* Phone */}
            <div>
              <label style={{fontWeight:600}}>Phone Number <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <input
                className="input"
                type="tel"
                value={form.phone}
                onChange={e => onFieldChange("phone", e.target.value)}
                required
                placeholder="10-15 digit number"
              />
              {errors.phone && touched.phone &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.phone}</div>}
            </div>
            {/* DOB */}
            <div>
              <label style={{fontWeight:600}}>Date of Birth <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <input
                className="input"
                type="date"
                value={form.dob}
                onChange={e => onFieldChange("dob", e.target.value)}
                required
              />
              {errors.dob && touched.dob &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.dob}</div>}
            </div>
            {/* Gender */}
            <div>
              <label style={{fontWeight:600}}>Gender <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <select className="select" value={form.gender}
                onChange={e => onFieldChange("gender", e.target.value)}
                required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
              {errors.gender && touched.gender &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.gender}</div>}
            </div>
            {/* Department */}
            <div>
              <label style={{fontWeight:600}}>Department <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <select className="select" value={form.department}
                onChange={e => onFieldChange("department", e.target.value)}
                required>
                <option value="">Select</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
              {errors.department && touched.department &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.department}</div>}
            </div>
            {/* Designation */}
            <div>
              <label style={{fontWeight:600}}>Designation <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <select className="select" value={form.designation}
                onChange={e => onFieldChange("designation", e.target.value)}
                required>
                <option value="">Select</option>
                {designations.map(d => <option key={d}>{d}</option>)}
              </select>
              {errors.designation && touched.designation &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.designation}</div>}
            </div>
            {/* Joining Date */}
            <div>
              <label style={{fontWeight:600}}>Joining Date <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <input
                className="input"
                type="date"
                value={form.joiningDate}
                onChange={e => onFieldChange("joiningDate", e.target.value)}
                required
              />
              {errors.joiningDate && touched.joiningDate &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.joiningDate}</div>}
            </div>
            {/* Role */}
            <div>
              <label style={{fontWeight:600}}>Role <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <select className="select" value={form.role}
                onChange={e => onFieldChange("role", e.target.value)}
                required>
                <option value="">Select</option>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
              {errors.role && touched.role &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.role}</div>}
            </div>
            {/* Manager/Supervisor */}
            <div>
              <label style={{fontWeight:600}}>Manager/Supervisor <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <input
                className="input"
                type="text"
                value={form.manager}
                onChange={e => onFieldChange("manager", e.target.value)}
                required
                placeholder="Manager name or email"
              />
              {errors.manager && touched.manager &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.manager}</div>}
            </div>
            {/* Work Location */}
            <div>
              <label style={{fontWeight:600}}>Work Location <span style={{color:"var(--accent-pink)"}}>*</span></label>
              <select className="select" value={form.location}
                onChange={e => onFieldChange("location", e.target.value)}
                required>
                <option value="">Select</option>
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
              {errors.location && touched.location &&
                <div style={{color: "var(--accent-pink)", fontSize:".95em", marginTop:-13}}>{errors.location}</div>}
            </div>
            {/* Address (full width) */}
            <div className="grid-2" style={{gridColumn: "1/3"}}>
              <div style={{width:"100%"}}>
                <label style={{fontWeight:600}}>Address</label>
                <textarea
                  className="textarea"
                  rows={2}
                  value={form.address}
                  onChange={e => onFieldChange("address", e.target.value)}
                  placeholder="Address (optional)"
                  style={{resize: "vertical", minHeight: 36, maxHeight: 80}}
                />
              </div>
            </div>
          </div>
          {/* Save/Cancel */}
          <div className="card-actions" style={{marginTop:24, justifyContent:"flex-end"}}>
            <button className="button-secondary" type="button" onClick={cancel} style={{marginRight:8}}>Cancel</button>
            <button
              className="button-primary"
              type="submit"
              disabled={Object.keys(errors).length > 0}
              style={{minWidth:96}}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeDetailsForm;
