import React from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../utils/api'

export default function BuyNow() {
  const { id } = useParams();

  // FIX: use _id instead of id
  const product = products.find(p => String(p._id) === id);

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="buy-now-container">
      <h2>Order Confirmation</h2>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Rs.{product.price}</p>
      <div className="success-message">
        Order has been placed successfully!
      </div>
    </div>
  )
}
