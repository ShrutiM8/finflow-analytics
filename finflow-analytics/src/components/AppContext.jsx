import { createContext } from 'react'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
	const transactions = [
		{
			id: 1,
			description: 'Monthly salary',
			category: 'Income',
			type: 'income',
			amount: 50000,
		},
		{
			id: 2,
			description: 'Freelance project',
			category: 'Income',
			type: 'income',
			amount: 12000,
		},
		{
			id: 3,
			description: 'Grocery shopping',
			category: 'Food',
			type: 'expense',
			amount: 2500,
		},
		{
			id: 4,
			description: 'Rent payment',
			category: 'Housing',
			type: 'expense',
			amount: 18000,
		},
		{
			id: 5,
			description: 'Bus ticket',
			category: 'Transport',
			type: 'expense',
			amount: 500,
		},
		{
			id: 6,
			description: 'Dining out',
			category: 'Food',
			type: 'expense',
			amount: 1800,
		},
		{
			id: 7,
			description: 'Movie tickets',
			category: 'Entertainment',
			type: 'expense',
			amount: 950,
		},
		{
			id: 8,
			description: 'Bonus payout',
			category: 'Income',
			type: 'income',
			amount: 8000,
		},
		{
			id: 9,
			description: 'Electricity bill',
			category: 'Utilities',
			type: 'expense',
			amount: 2200,
		},
		{
			id: 10,
			description: 'Online shopping',
			category: 'Shopping',
			type: 'expense',
			amount: 3600,
		},
	]

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
	}

	return (
		<AppContext.Provider value={dashboardData}>
			{children}
		</AppContext.Provider>
	)
}
