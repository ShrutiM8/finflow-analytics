import React, { useContext, useMemo, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
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

function Transactions({ role }) {
  const { transactions, updateTransaction, deleteTransaction } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    category: '',
    amount: '',
    type: 'income',
    date: '',
  });

  const formatDateForDisplay = (value) => {
    if (!value) return '';

    const dateParts = String(value).split('-');
    if (dateParts.length !== 3) return value;

    const [year, month, day] = dateParts;
    return `${day}-${month}-${year}`;
  };

  const normalizeDateInput = (value) => {
    if (!value) return '';

    const cleanedValue = String(value).trim();
    if (cleanedValue.includes('-')) {
      const [year, month, day] = cleanedValue.split('-');
      if (year && month && day) {
        return `${year}-${month}-${day}`;
      }
    }

    const digits = cleanedValue.replace(/\D/g, '');
    if (digits.length === 8) {
      const day = digits.slice(0, 2);
      const month = digits.slice(2, 4);
      const year = digits.slice(4, 8);
      return `${year}-${month}-${day}`;
    }

    return cleanedValue;
  };

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

  const openEditForm = (transaction) => {
    setEditingTransaction(transaction);
    setEditForm({
      description: transaction.description,
      category: transaction.category,
      amount: String(transaction.amount),
      type: transaction.type,
      date: transaction.date,
    });
  };

  const saveTransaction = (event) => {
    event.preventDefault();
    if (!editingTransaction || !editForm.description.trim() || !editForm.category.trim()) return;

    const amount = Number(editForm.amount);
    const normalizedDate = normalizeDateInput(editForm.date);
    if (!Number.isFinite(amount) || amount < 0 || !normalizedDate) return;

    updateTransaction(editingTransaction.id, {
      description: editForm.description.trim(),
      category: editForm.category.trim(),
      amount,
      type: editForm.type,
      date: normalizedDate,
    });
    setEditingTransaction(null);
  };

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

        <div className="transactions-table-scroll" role="region" aria-label="Transactions table" tabIndex="0">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === 'admin' && <th>Actions</th>}
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
                {role === 'admin' && (
                  <td className="transaction-actions">
                    <button
                      type="button"
                      className="transaction-action edit"
                      aria-label={`Edit ${transaction.description}`}
                      onClick={() => openEditForm(transaction)}
                    >
                      <Pencil size={14} aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="transaction-action delete"
                      aria-label={`Delete ${transaction.description}`}
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      <span>Del</span>
                    </button>
                  </td>
                )}
              </tr>
              );
            }) : (
              <tr>
                <td className="transactions-empty" colSpan={role === 'admin' ? 6 : 5}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {editingTransaction && (
        <div className="transaction-modal-backdrop" onClick={() => setEditingTransaction(null)}>
          <form
            className="transaction-edit-form"
            onSubmit={saveTransaction}
            onClick={(event) => event.stopPropagation()}
            aria-label="Edit transaction"
          >
            <div className="transaction-edit-header">
              <h3>Edit Transaction</h3>
              <button
                type="button"
                className="transaction-close-button"
                aria-label="Close transaction editor"
                onClick={() => setEditingTransaction(null)}
              >
                ×
              </button>
            </div>

            <div className="transaction-type-toggle" role="tablist" aria-label="Transaction type">
              <button
                type="button"
                className={`expense${editForm.type === 'expense' ? ' is-active' : ''}`}
                onClick={() => setEditForm({ ...editForm, type: 'expense' })}
              >
                Expense
              </button>
              <button
                type="button"
                className={`income${editForm.type === 'income' ? ' is-active' : ''}`}
                onClick={() => setEditForm({ ...editForm, type: 'income' })}
              >
                Income
              </button>
            </div>

            <label className="transaction-field">
              <span>DESCRIPTION</span>
              <input
                type="text"
                value={editForm.description}
                onChange={(event) => setEditForm({ ...editForm, description: event.target.value })}
                required
              />
            </label>

            <div className="transaction-inline-row">
              <label className="transaction-field">
                <span>AMOUNT (RS.)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editForm.amount}
                  onChange={(event) => setEditForm({ ...editForm, amount: event.target.value })}
                  required
                />
              </label>

              <label className="transaction-field">
                <span>DATE</span>
                <div className="transaction-date-input-wrap">
                  <input
                    type="text"
                    value={formatDateForDisplay(editForm.date)}
                    onChange={(event) => setEditForm({ ...editForm, date: normalizeDateInput(event.target.value) })}
                    placeholder="dd-mm-yyyy"
                    required
                  />
                  <span className="transaction-date-icon" aria-hidden="true">🗓</span>
                </div>
              </label>
            </div>

            <label className="transaction-field">
              <span>CATEGORY</span>
              <select
                value={editForm.category}
                onChange={(event) => setEditForm({ ...editForm, category: event.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <div className="transaction-edit-actions">
              <button type="button" className="transaction-cancel-button" onClick={() => setEditingTransaction(null)}>
                Cancel
              </button>
              <button type="submit" className={`transaction-save-button ${editForm.type}`}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Transactions;
