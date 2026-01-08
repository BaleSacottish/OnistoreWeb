import { useState } from 'react'
import './App.css'

import './assets/styles/style.css'
import './assets/styles/stylemain.css'

import Products from "./Products";
import Header from './assets/component/header';
function App() {
  

  return (
    <>
    <Header/>
    <div className='product-style-container '>
      <Products/>
    </div>
    </>
  )
}

export default App
