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
			description: 'Grocery shopping',
			category: 'Food',
			type: 'expense',
			amount: 2500,
		},
		{
			id: 3,
			description: 'Bus ticket',
			category: 'Transport',
			type: 'expense',
			amount: 500,
		},
	]

	const income = transactions
		.filter((transaction) => transaction.type === 'income')
		.reduce((total, transaction) => total + transaction.amount, 0)
	const expenses = transactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((total, transaction) => total + transaction.amount, 0)
	const balance = income - expenses

	const dashboardData = {
		balance,
		income,
		expenses,
		transactions,
	}

	return (
		<AppContext.Provider value={dashboardData}>
			{children}
		</AppContext.Provider>
	)
}
