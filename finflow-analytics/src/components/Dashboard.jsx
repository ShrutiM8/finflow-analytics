import Navigation from './Navigation'

function Dashboad() {
  return (
    <div className="dashboard-page">

      <section className="summary-grid">
        <div className="summary-card">
          <h2>Balance</h2>
          <p>0</p>
        </div>

        <div className="summary-card">
          <h2>Income</h2>
          <p>0</p>
        </div>

        <div className="summary-card">
          <h2>Expenses</h2>
          <p>0</p>
        </div>

        <div className="summary-card">
          <h2>Transaction</h2>
          <p>0</p>
        </div>
      </section>

      <section className="chart-grid">
        <div className="chart-card">
          <h3>Monthly Cash Flow</h3>
          <p>Placeholder chart area</p>
        </div>

        <div className="chart-card">
          <h3>Spending by Category</h3>
          <p>Placeholder chart area</p>
        </div>
      </section>
    </div>
  )
}

export default Dashboad
