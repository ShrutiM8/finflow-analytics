import React from "react";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Summary Cards */}
      <section className="summary-grid">

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Balance</span>
            <span className="summary-icon balance">=</span>
          </div>

          <h2>₹0</h2>
          <p>0% savings rate</p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Income</span>
            <span className="summary-icon income">+</span>
          </div>

          <h2>₹0</h2>
          <p>0 entries</p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Expenses</span>
            <span className="summary-icon expense">−</span>
          </div>

          <h2>₹0</h2>
          <p>0 entries</p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Transactions</span>
            <span className="summary-icon transactions">#</span>
          </div>

          <h2>0</h2>
          <p>All time</p>
        </div>

      </section>

      {/* Charts */}
      <section className="charts-row">

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Monthly Cash Flow</h3>
            <span>Income vs Expenses</span>
          </div>

          <div className="chart-placeholder">
            <div className="chart-line-placeholder">
              Monthly Cash Flow
            </div>

            <div className="chart-months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Spending by Category</h3>
            <span>Expense breakdown</span>
          </div>

          <div className="pie-placeholder">
            <div className="pie-circle">
              <span>₹0</span>
            </div>

            <div className="pie-legend">
              <div>
                <span className="legend-dot food"></span>
                Food
              </div>

              <div>
                <span className="legend-dot shopping"></span>
                Shopping
              </div>

              <div>
                <span className="legend-dot transport"></span>
                Transport
              </div>

              <div>
                <span className="legend-dot other"></span>
                Other
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;