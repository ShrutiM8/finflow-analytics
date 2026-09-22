import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboad from './components/Dashboard'
import Navigation from './components/Navigation'
function App() {

  return (
   <div>
    <Navigation/>
    <Dashboad/>
   </div> 
  );
  
}

export default App
