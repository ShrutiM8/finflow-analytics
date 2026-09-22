function Navigation() {
  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav__brand">
        <span>Logo</span>
        <h2>Finflow</h2>
      </div>

      <div className="dashboard-nav__menu">
        <span>Overview</span>
        <span>Reports</span>
        <span>Settings</span>
      </div>

      <div className="dashboard-nav__user">
        <span>Admin User</span>
      </div>
    </nav>
  )
}

export default Navigation
