import { useState } from 'react'
import './App.css'
import './components/component.scss'
import Dashboad from './components/Dashboard'
import Navbar from './components/Navbar'
import Transactions from './components/Transactions'
import { AppProvider } from './components/AppContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <AppProvider>
      <div>
        <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />
        {activeTab === 'transactions' ? <Transactions /> : <Dashboad />}
      </div>
    </AppProvider>
  )
}

export default App
