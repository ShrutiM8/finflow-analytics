import React, { useContext, useMemo, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [...new Set(transactions.map((transaction) => transaction.category))]
    .sort((left, right) => left.localeCompare(right));
  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch = !query || [
        transaction.date,
        transaction.description,
        transaction.category,
        transaction.type,
        transaction.amount,
      ].some((value) => String(value).toLocaleLowerCase().includes(query));
      const matchesCategory = selectedCategory === 'all'
        || transaction.category === selectedCategory;
      const matchesType = selectedType === 'all' || transaction.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, searchQuery, selectedCategory, selectedType]);

  return (
    <div className="transactions-table-wrapper tx-page">
      <div className="transactions-card">
        <div className="transactions-header">
          <h3>Transactions</h3>
        </div>

        <div className="filter-bar">
          <input
            type="search"
            className="transaction-search"
            placeholder="Search transactions..."
            aria-label="Search transactions"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <select
            className="transaction-filter"
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="transaction-filter"
            aria-label="Filter by type"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button
            type="button"
            className="filter-clear"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
          >
            Clear filters
          </button>
          <span className="results-count">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
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
            {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => {
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
            }) : (
              <tr>
                <td className="transactions-empty" colSpan="5">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
