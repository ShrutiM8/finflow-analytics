import { createContext } from 'react'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
	const dashboardData = {
		balance: 0,
		income: 0,
		expenses: 0,
		transactions: [],
	}

	return (
		<AppContext.Provider value={dashboardData}>
			{children}
		</AppContext.Provider>
	)
}
