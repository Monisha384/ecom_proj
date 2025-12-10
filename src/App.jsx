import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import BuyNow from './components/BuyNow';
import Login from './components/Login';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const[cart,setCart]=useState([]);
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart));
  },[cart]);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <>
     <div className="app">
      <header className="navbar">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🛍️</span>
            <span className="brand-text">ShopEase</span>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
        </nav>
        
        <div className="nav-actions">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
          
          {localStorage.getItem("user") ? (
            <button onClick={logout} className="btn btn-outline">Logout</button>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Products cart={cart} setCart={setCart}/>}/>
          <Route path="/products" element={<Products cart={cart} setCart={setCart}/>}/>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={
            <ProtectedRoute>
            <Cart cart={cart} setCart={setCart}/> 
            </ProtectedRoute>
            }  />
          <Route path="/buynow/:id" element={
            <ProtectedRoute>
            <BuyNow />
            </ProtectedRoute>
          }
             />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ShopEase</h3>
            <p>Your trusted online shopping destination</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: monisha@shopease.com</p>
            <p>Phone: 919345528492</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ShopEase. All rights reserved.</p>
        </div>
      </footer>
     </div>
    </>
  )
}

export default App