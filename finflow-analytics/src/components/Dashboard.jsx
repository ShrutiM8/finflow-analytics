import React, { useContext } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppContext } from "./AppContext";

function Dashboard() {
  const { balance, income, expenses, transactions } = useContext(AppContext);
  const savingsRate = income === 0 ? 0 : Math.round((balance / income) * 100);
  const incomeTransactionCount = transactions.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const expenseTransactionCount = transactions.filter(
    (transaction) => transaction.type === "expense"
  ).length;

  const monthlyCashFlowData = [
    { month: "Jan 24", income: 95000, expenses: 30000 },
    { month: "Feb 24", income: 110000, expenses: 32000 },
    { month: "Mar 24", income: 143200, expenses: 34000 },
    { month: "Apr 24", income: 136000, expenses: 31000 },
  ];

  const chartMaxValue = Math.max(
    ...monthlyCashFlowData.flatMap((item) => [item.income, item.expenses])
  );
  const yAxisMax = Math.ceil((chartMaxValue * 1.2) / 10000) * 10000;
  const yAxisTicks = [0, yAxisMax / 4, yAxisMax / 2, (yAxisMax * 3) / 4, yAxisMax];

  const spendingByCategory = Object.values(
    transactions.reduce((acc, transaction) => {
      if (transaction.type !== "expense") return acc;

      const category = transaction.category || "Other";
      acc[category] = acc[category] || { name: category, value: 0 };
      acc[category].value += transaction.amount;
      return acc;
    }, {})
  ).sort((a, b) => b.value - a.value);

  const categoryColors = {
    Rent: "#e9a8ff",
    Travel: "#5eead4",
    Shopping: "#fbbf24",
    "Food & Dining": "#f472b6",
    Utilities: "#4ade80",
    Healthcare: "#60a5fa",
    Housing: "#c084fc",
    Transport: "#7dd3fc",
    Entertainment: "#f9a8d4",
    Food: "#fca5a5",
    Other: "#94a3b8",
  };

  return (
    <div className="dashboard" id="dashboard">

      {/* Summary Cards */}
      <section className="summary-grid">

        <div className="summary-card summary-card-balance">
          <div className="summary-top">
            <span className="summary-label">Balance</span>
            <span className="summary-icon balance">=</span>
          </div>

          <h2>₹{balance}</h2>
          <p>{savingsRate}% savings rate</p>
        </div>

        <div className="summary-card summary-card-income">
          <div className="summary-top">
            <span className="summary-label">Income</span>
            <span className="summary-icon income">+</span>
          </div>

          <h2>₹{income}</h2>
          <p>{incomeTransactionCount} entries</p>
        </div>

        <div className="summary-card summary-card-expenses">
          <div className="summary-top">
            <span className="summary-label">Expenses</span>
            <span className="summary-icon expense">−</span>
          </div>

          <h2>₹{expenses}</h2>
          <p>{expenseTransactionCount} entries</p>
        </div>

        <div className="summary-card summary-card-transactions">
          <div className="summary-top">
            <span className="summary-label">Transactions</span>
            <span className="summary-icon transactions">#</span>
          </div>

          <h2>{transactions.length}</h2>
          <p>All time</p>
        </div>

      </section>

      {/* Charts */}
      <section className="charts-row">

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Monthly Cash Flow</h3>
          </div>

          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={monthlyCashFlowData}
                margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" opacity={0.5} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, yAxisMax]}
                  ticks={yAxisTicks}
                  tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ stroke: "#94a3b8", strokeDasharray: "4 4" }}
                  formatter={(value, name) => [
                    `Rs.${Number(value).toLocaleString()}`,
                    name === "income" ? "Income" : "Expenses",
                  ]}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    borderRadius: "10px",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "#f8fafc", fontWeight: 700 }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  fill="url(#incomeFill)"
                  strokeWidth={2.5}
                  dot={{ r: 0 }}
                  activeDot={{ r: 5, stroke: "#0f172a", strokeWidth: 2, fill: "#22c55e" }}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f87171"
                  fill="url(#expenseFill)"
                  strokeWidth={2.5}
                  dot={{ r: 0 }}
                  activeDot={{ r: 5, stroke: "#0f172a", strokeWidth: 2, fill: "#f87171" }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="chart-legend">
              <div className="chart-legend-item">
                <span className="chart-legend-line income-line"></span>
                <span>Income</span>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-line expense-line"></span>
                <span>Expenses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Spending by Category</h3>
            <span>Expense breakdown</span>
          </div>

          <div className="pie-placeholder">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={92}
                  paddingAngle={3}
                  stroke="rgba(15, 23, 42, 0.9)"
                  strokeWidth={2}
                >
                  {spendingByCategory.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={categoryColors[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>

            <div className="pie-legend">
              {spendingByCategory.map((entry) => (
                <div key={entry.name}>
                  <span className="legend-label">
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: categoryColors[entry.name] || "#94a3b8" }}
                    ></span>
                    {entry.name}
                  </span>
                  <strong>₹{entry.value.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;