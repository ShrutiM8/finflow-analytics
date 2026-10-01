import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const CATEGORY_COLORS = {
  Income: '#34d399',
  Rent: '#e9a8ff',
  Travel: '#5eead4',
  Shopping: '#fbbf24',
  'Food & Dining': '#f472b6',
  Utilities: '#4ade80',
  Healthcare: '#60a5fa',
  Housing: '#c084fc',
  Transport: '#7dd3fc',
  Entertainment: '#f9a8d4',
  Food: '#fca5a5',
  Other: '#94a3b8',
};

function Transactions() {
  const { transactions } = useContext(AppContext);

  return (
    <div className="transactions-table-wrapper">
      <div className="transactions-card">
        <div className="transactions-header">
          <h3>Transactions</h3>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const categoryColor = CATEGORY_COLORS[transaction.category] || '#94a3b8';

              return (
              <tr key={transaction.id}>
                <td className="transaction-date">{transaction.date}</td>
                <td className="transaction-description">{transaction.description}</td>
                <td>
                  <span
                    className="transaction-category"
                    style={{
                      color: categoryColor,
                      backgroundColor: `${categoryColor}22`,
                    }}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td>
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
