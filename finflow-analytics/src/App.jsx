import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboad from './components/Dashboard'
import Navbar from './components/Navbar'
function App() {

  return (
   <div>
    <Navbar/>
    <Dashboad/>
   </div> 
  );
  
}

export default App
