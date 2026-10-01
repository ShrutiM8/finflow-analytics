import { createContext, useState } from 'react'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
	const [transactions, setTransactions] = useState([
		{
			id: 1,
			description: 'Monthly salary',
			category: 'Income',
			type: 'income',
			amount: 50000,
			date: '2024-01-01',
		},
		{
			id: 2,
			description: 'Freelance project',
			category: 'Income',
			type: 'income',
			amount: 12000,
			date: '2024-02-15',
		},
		{
			id: 3,
			description: 'Grocery shopping',
			category: 'Food',
			type: 'expense',
			amount: 2500,
			date: '2024-01-07',
		},
		{
			id: 4,
			description: 'Rent payment',
			category: 'Housing',
			type: 'expense',
			amount: 18000,
			date: '2024-02-01',
		},
		{
			id: 5,
			description: 'Bus ticket',
			category: 'Transport',
			type: 'expense',
			amount: 500,
			date: '2024-01-18',
		},
		{
			id: 6,
			description: 'Dining out',
			category: 'Food',
			type: 'expense',
			amount: 1800,
			date: '2024-03-10',
		},
		{
			id: 7,
			description: 'Movie tickets',
			category: 'Entertainment',
			type: 'expense',
			amount: 950,
			date: '2024-03-22',
		},
		{
			id: 8,
			description: 'Bonus payout',
			category: 'Income',
			type: 'income',
			amount: 8000,
			date: '2024-04-05',
		},
		{
			id: 9,
			description: 'Electricity bill',
			category: 'Utilities',
			type: 'expense',
			amount: 2200,
			date: '2024-03-28',
		},
		{
			id: 10,
			description: 'Online shopping',
			category: 'Shopping',
			type: 'expense',
			amount: 3600,
			date: '2024-04-12',
		},
	])

	const updateTransaction = (transactionId, updates) => {
		setTransactions((currentTransactions) =>
			currentTransactions.map((transaction) =>
				transaction.id === transactionId
					? { ...transaction, ...updates }
					: transaction
			)
		)
	}

	const income = transactions
		.filter((transaction) => transaction.type === 'income')
		.reduce((total, transaction) => total + transaction.amount, 0)
	const expenses = transactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((total, transaction) => total + transaction.amount, 0)
	const balance = income - expenses
	const savingsRate = income === 0 ? 0 : ((income - expenses) / income) * 100

	const dashboardData = {
		balance,
		income,
		expenses,
		savingsRate,
		transactions,
		updateTransaction,
	}

	return (
		<AppContext.Provider value={dashboardData}>
			{children}
		</AppContext.Provider>
	)
}
