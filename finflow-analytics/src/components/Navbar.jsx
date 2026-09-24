import React from "react";

function Navbar() {
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
        <button className="nav-tab active">
          <span>▦</span>
          <span>Dashboard</span>
        </button>

        <button className="nav-tab">
          <span>☷</span>
          <span>Transactions</span>
        </button>

        <button className="nav-tab">
          <span>◉</span>
          <span>Insights</span>
        </button>
      </div>

      <div className="nav-right">
        <select className="role-select" defaultValue="admin">
          <option value="admin">👤 Admin</option>
          <option value="viewer">👁 Viewer</option>
        </select>

        <span className="role-badge admin">Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;