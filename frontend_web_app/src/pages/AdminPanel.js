import React, { useState } from "react";
import Navbar from "../components/Navbar";

// PUBLIC_INTERFACE
// Admin Dashboard: All controls and views clearly visible (TATA ELXSI branded).
function AdminPanel() {
  // Nav menu (mobile/hamburger)
  const [menuOpen, setMenuOpen] = useState(false);

  // Demo employees (start with sample for demonstration/UI visibility)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      empNo: "EMP001",
      name: "A. Smith",
      email: "asmith@email.com",
      role: "Manager",
      status: "Active"
    }
  ]);
  const [addForm, setAddForm] = useState({ name: "", email: "", role: "Employee", status: "Active" });
  const [adding, setAdding] = useState(false);

  // Metrics (safe for zero-emps)
  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const inactive = total - active;
  const managers = employees.filter(e => e.role === "Manager").length;
  const admins = employees.filter(e => e.role === "Admin").length;
  const empRoles = {
    Manager: managers,
    Admin: admins,
    Employee: Math.max(0, total - managers - admins)
  };

  // Quick action: add
  const handleAdd = e => {
    e.preventDefault();
    setEmployees([
      ...employees,
      {
        ...addForm,
        id: Date.now(),
        empNo: `EMP${String(total+1).padStart(3,"0")}`
      }
    ]);
    setAddForm({ name: "", email: "", role: "Employee", status: "Active" });
    setAdding(false);
  };
  // Edit/delete stub
  const handleDelete = id => setEmployees(employees.filter(e => e.id !== id));
  // Pie chart for roles
  function RolePie() {
    // crude pie slices (not accessible for screen-readers, use colorblind safe colors in real app)
    const tot = Object.values(empRoles).reduce((a,b) => a + b, 0) || 1;
    let startAngle = 0, i = 0;
    const colors = ["var(--primary-blue)","var(--secondary-purple)","var(--accent-yellow)"];
    return (
      <svg width={75} height={75} viewBox="0 0 32 32" aria-label="Employee roles pie">
        {Object.entries(empRoles).map(([k, v], idx) => {
          const angle = (v / tot) * 360;
          const x1 = 16 + 16 * Math.cos(Math.PI * (startAngle)/180), y1 = 16 + 16 * Math.sin(Math.PI * (startAngle)/180);
          const x2 = 16 + 16 * Math.cos(Math.PI * (startAngle + angle)/180), y2 = 16 + 16 * Math.sin(Math.PI * (startAngle + angle)/180);
          const largeArc = angle > 180 ? 1 : 0;
          const d = `M16,16 L${x1},${y1} A16,16 0 ${largeArc},1 ${x2},${y2} z`;
          const res = <path key={k} d={d} fill={colors[idx]} opacity={0.88} />;
          startAngle += angle;
          return res;
        })}
      </svg>
    );
  }

  // Responsive drawer for employee add
  function EmployeeAddDrawer() {
    if (!adding) return null;
    return (
      <div
        style={{
          position:"fixed", right:0, top:0, bottom:0, width:"100%", maxWidth:350, background:"var(--light-bg)",
          boxShadow:"-2px 0 28px rgba(37,72,138,0.13)", zIndex:1400, padding:"32px 24px"
        }}>
        <button style={{
          position:"absolute", top:13,left:9,fontSize:22,background:"none",border:"none",color:"var(--accent-pink)",cursor:"pointer"
        }} onClick={()=>setAdding(false)} aria-label="Close drawer">&larr;</button>
        <div className="card-title" style={{marginTop:12}}>Add Employee</div>
        <form style={{marginTop:15}} onSubmit={handleAdd} autoComplete="off">
          <input className="input" required value={addForm.name} style={{marginBottom:13}}
            placeholder="Full Name" onChange={e=>setAddForm({...addForm, name:e.target.value})}/>
          <input className="input" required value={addForm.email} style={{marginBottom:13}}
            placeholder="Email" type="email" onChange={e=>setAddForm({...addForm, email:e.target.value})}/>
          <select className="select" value={addForm.role} style={{marginBottom:13}} onChange={e=>setAddForm({...addForm,role:e.target.value})}>
            <option>Employee</option><option>Manager</option><option>Admin</option>
          </select>
          <select className="select" value={addForm.status} onChange={e=>setAddForm({...addForm,status:e.target.value})}>
            <option>Active</option><option>Inactive</option>
          </select>
          <button className="button-primary" type="submit" style={{marginTop:16,width:"100%"}}>Add</button>
        </form>
      </div>
    );
  }

  // Main dashboard UI --- navigation is via menu/hamburger, so all content always visible except for mobile
  return (
    <div style={{position:"relative"}}>
      <Navbar open={menuOpen} onToggle={()=>setMenuOpen(m=>!m)} onNavigate={()=>setMenuOpen(false)} />
      <div style={{filter:menuOpen?"blur(2px)":"none", pointerEvents: menuOpen?"none":"auto", transition:"filter .2s"}}>
      <h2 style={{
        marginTop:32,marginBottom:24,letterSpacing:"0.7px",fontWeight:800,
        color:"var(--primary-blue)",fontSize:"2rem"}}>Admin Dashboard</h2>
      {/* Summary widgets */}
      <div className="grid-3" style={{marginBottom:24}}>
        <div className="card" style={{minWidth:235,paddingTop:20}}>
          <div className="card-title" style={{marginBottom:10, color:"var(--primary-blue)"}}>Employees</div>
          <div style={{fontSize:"2.1rem",fontWeight:800, color:"var(--primary-blue)"}}>{total}</div>
          <div>
            <span style={{color:"var(--accent-yellow)",fontWeight:600}}>{active} Active</span> /
            <span style={{color:"var(--accent-pink)",marginLeft:6}}>{inactive} Inactive</span>
          </div>
        </div>
        <div className="card" style={{minWidth:235,display:"flex",alignItems:"center",flexDirection:"row",gap:22,paddingTop:15, justifyContent:"flex-start"}}>
          <RolePie />
          <div>
            <div style={{fontWeight:700,marginBottom:4}}>Roles</div>
            <div style={{color:"var(--primary-blue)",fontWeight:600}}>{empRoles.Manager} Manager(s)</div>
            <div style={{color:"var(--secondary-purple)"}}>{empRoles.Employee} Employee(s)</div>
            <div style={{color:"var(--accent-pink)"}}>{empRoles.Admin} Admin</div>
          </div>
        </div>
        <div className="card" style={{minWidth:235,paddingTop:20}}>
          <div className="card-title" style={{ color:"var(--secondary-purple)"}}>Quick Actions</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button className="button-primary" onClick={()=>setAdding(true)}>Add Employee</button>
            <a href="#bulk_onboard" onClick={e=>{e.preventDefault();window.scrollTo({top:1000,behavior:"smooth"});}} className="button-secondary">Bulk Onboard / CSV</a>
            <a href="#settings" onClick={e=>{e.preventDefault();window.scrollTo({top:1800,behavior:"smooth"});}} className="button-secondary">Settings</a>
            <a href="#audit" onClick={e=>{e.preventDefault();window.scrollTo({top:2400,behavior:"smooth"});}} className="button-secondary">Audit Trail</a>
            <a href="#reports" onClick={e=>{e.preventDefault();window.scrollTo({top:3200,behavior:"smooth"});}} className="button-secondary">Reports</a>
          </div>
        </div>
      </div>
      {/* EMPLOYEE LIST/TABLE */}
      <section aria-label="Employee list" style={{marginBottom:60}}>
        <div className="card" style={{paddingTop:16}}>
          <div className="card-title" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:0}}>
            <span>Employee List</span>
            <button className="button-primary" style={{fontSize:"1.05em",padding:"10px 18px"}} onClick={()=>setAdding(true)}>Add</button>
          </div>
          <div style={{overflowX:"auto"}}>
            <table className="table" style={{marginTop:20,minWidth:610}}>
              <thead>
                <tr>
                  <th>Employee No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th style={{textAlign:"center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.empNo}</td>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                      <td>{emp.status}</td>
                      <td style={{textAlign:"center"}}>
                        <button className="button-small button-secondary" style={{marginRight:8}} onClick={()=>{
                          // Could open inline edit drawer here (not demoed)
                        }}>Edit</button>
                        <button className="button-small button-pink" onClick={()=>handleDelete(emp.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{textAlign:"center", color:"var(--secondary-purple)", fontWeight: 500, fontSize:"1.08em", padding:"32px 6px"}}>
                      <span style={{opacity:0.67}}>No employees yet. <span role="img" aria-label="sparkles">✨</span> Use <span style={{color:"var(--accent-yellow)",fontWeight:"bold"}}>Add Employee</span> above or bulk import to get started.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Bulk Onboarding */}
      <section id="bulk_onboard" style={{margin:"48px 0"}}>
        <div className="card" style={{paddingTop:18}}>
          <div className="card-title">Bulk Onboarding/Import</div>
          <form style={{display:"flex",alignItems:"center",gap:15,flexWrap:"wrap",marginBottom:13}}>
            <input className="input" type="file" accept=".csv" style={{maxWidth:230}}/>
            <button className="button-secondary" type="button">Import CSV</button>
          </form>
          <div style={{fontSize:".95em",color:"var(--secondary-purple)",marginTop:6,marginBottom:6}}>
            Download <a href="#" style={{color:"var(--accent-yellow)"}}>CSV template</a> • Add employees in bulk via upload
          </div>
        </div>
      </section>
      {/* System Settings */}
      <section id="settings" style={{margin:"48px 0"}}>
        <div className="card">
          <div className="card-title">System Settings</div>
          <div style={{marginBottom:10}}>
            <label><input type="checkbox" defaultChecked style={{marginRight:7}}/>Enable notifications for all users</label>
          </div>
          <div style={{marginTop:10}}>
            <label>
              <b>Require log submission confirmation</b>
              <input type="checkbox" style={{marginLeft:12}}/>
            </label>
          </div>
          <div style={{marginTop:18,fontSize:".97em"}}><span style={{color:"var(--accent-pink)"}}>Note:</span> Changes are audit-logged.</div>
        </div>
      </section>
      {/* Audit Trail */}
      <section id="audit" style={{margin:"48px 0"}}>
        <div className="card">
          <div className="card-title">Audit Trail</div>
          <div className="log-entry">[2024-06-10 14:30] Admin changed B. Jones from Employee to Manager.</div>
          <div className="log-entry">[2024-06-11 10:49] Imported 5 new users via onboarding CSV.</div>
          <div className="log-entry">[2024-06-12 12:02] A. Smith marked B. Jones as Inactive.</div>
        </div>
      </section>
      {/* Reporting */}
      <section id="reports" style={{marginBottom:40}}>
        <div className="card">
          <div className="card-title">Reports & Export</div>
          <div>
            <button className="button-primary">Export to PDF</button>
            <button className="button-secondary" style={{marginLeft:18}}>Export to Excel</button>
          </div>
          <div style={{marginTop:12, fontSize:".97em"}}>Charts, activity trends and compliance reports for download.</div>
          {/* Tiny sample bar */}
          <div style={{marginTop:22}}>
            <svg width={170} height={44}>
              <rect x={16} y={18} width={20} height={25} fill="var(--accent-yellow)" />
              <rect x={52} y={7} width={20} height={36} fill="var(--primary-blue)" />
              <rect x={88} y={18} width={20} height={25} fill="var(--secondary-purple)" />
              <rect x={124} y={13} width={20} height={30} fill="var(--accent-pink)" />
            </svg>
          </div>
        </div>
      </section>
      </div>
      <EmployeeAddDrawer />
    </div>
  );
}

export default AdminPanel;
