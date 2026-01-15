import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import './assets/styles/style.css'
import './assets/styles/stylemain.css'

import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Header from './assets/component/header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={
          <div className='product-style-container'>
            <Products/>
          </div>
        } />
        <Route path="/category/:category" element={
          <div className='product-style-container'>
            <Products/>
          </div>
        } />
        <Route path="/product/:productId" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  )
}

export default App
