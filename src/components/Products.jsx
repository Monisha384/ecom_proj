import React from 'react'
import { products } from "../utils/api"
import { Link } from 'react-router-dom'

export default function Products({ setCart, cart }) {

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <div className="products-section">
        <h2>Our Products</h2>
        <p className="products-subtitle">Discover our amazing collection of premium products</p>
      </div>
      <div className="products-grid">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Rs.{p.price}</p>
            <div className="product-buttons">
              <Link to={`/product/${p._id}`} className="btn btn-secondary">View Details</Link>
              <button onClick={() => addToCart(p)} className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
