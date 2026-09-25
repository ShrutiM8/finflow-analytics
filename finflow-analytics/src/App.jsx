import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboad from './components/Dashboard'
import Navbar from './components/Navbar'
import { AppProvider } from './components/AppContext'
function App() {

  return (
   <AppProvider>
    <div>
      <Navbar/>
      <Dashboad/>
    </div>
   </AppProvider>
  );
  
}

export default App
