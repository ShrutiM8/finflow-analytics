import React, { useState } from "react";
import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  UserRound,
  X,
} from "lucide-react";

function Navbar({ activeTab, onSelectTab }) {
  const [role, setRole] = useState("admin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <span aria-hidden="true">₹</span>
        </div>
        <div>
          <h2>FinFlow</h2>
          <span>Analytics</span>
        </div>
      </div>

      <div
        className={`nav-tabs${isMenuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
      >
        <button
          type="button"
          className={`nav-tab${activeTab === "dashboard" ? " active" : ""}`}
          onClick={() => onSelectTab("dashboard")}
        >
          <LayoutDashboard size={16} aria-hidden="true" />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className={`nav-tab${activeTab === "transactions" ? " active" : ""}`}
          onClick={() => onSelectTab("transactions")}
        >
          <ArrowLeftRight size={16} aria-hidden="true" />
          <span>Transactions</span>
        </button>

        <button
          type="button"
          className={`nav-tab${activeTab === "insights" ? " active" : ""}`}
          onClick={() => onSelectTab("insights")}
        >
          <ChartNoAxesCombined size={16} aria-hidden="true" />
          <span>Insights</span>
        </button>
      </div>

      <div className="nav-right">
        <button
          className="nav-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <UserRound className="role-user-icon" size={16} aria-hidden="true" />
        <select
          className="role-select"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <span className={`role-badge ${role}`}>
          {role === "admin" ? "Admin" : "Viewer"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;