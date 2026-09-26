import { createContext } from 'react'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
	const dashboardData = {
		balance: 0,
		income: 0,
		expenses: 0,
		transactions: [
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
		],
	}

	return (
		<AppContext.Provider value={dashboardData}>
			{children}
		</AppContext.Provider>
	)
}
