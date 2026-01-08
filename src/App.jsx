import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import './assets/styles/style.css'

import Products from "./Products";
import Header from './assets/component/header';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Products/>
    
      
    </>
  )
}

export default App
