import React, { useState } from "react";

function Navbar() {
  const [role, setRole] = useState("admin");

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">₹</div>
        <div>
          <h2>FinFlow</h2>
          <span>Finance Dashboard</span>
        </div>
      </div>

      <div className="nav-tabs">
        <a className="nav-tab" href="#dashboard">
          <span>▦</span>
          <span>Dashboard</span>
        </a>

        <button className="nav-tab active">
          <span>☷</span>
          <span>Transactions</span>
        </button>

        <button className="nav-tab">
          <span>◉</span>
          <span>Insights</span>
        </button>
      </div>

      <div className="nav-right">
        <select
          className="role-select"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="admin">👤 Admin</option>
          <option value="viewer">👁 Viewer</option>
        </select>

        <span className={`role-badge ${role}`}>
          {role === "admin" ? "Admin" : "Viewer"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;