import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../utils/api';

export default function Product() {
    const {id} = useParams();
    const product = products.find(p => String(p._id) === id);
    if(!product) return <p>Product not found !</p>
  return (
    <div>
        <img src = {product.image} alt = {product.name} width = "150"/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Rs.{product.price}</p>
        <Link to={`/buynow/${product._id}`}>
        <button>Buy Now</button>
        </Link>
    </div>
  )
}