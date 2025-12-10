import React, { useState, useMemo } from 'react'
import { products } from "../utils/api"
import { Link } from 'react-router-dom'

export default function Products({ setCart, cart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesRating = product.rating >= minRating;
      return matchesSearch && matchesCategory && matchesRating;
    });

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchTerm, selectedCategory, minRating, sortBy]);

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div>
      <div className="products-section">
        <h2>Our Products</h2>
        <p className="products-subtitle">Discover our amazing collection of premium products</p>
      </div>
      
      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="filter-select"
          >
            <option value={0}>All Ratings</option>
            <option value={4}>4★ & Above</option>
            <option value={3}>3★ & Above</option>
            <option value={2}>2★ & Above</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      <div className="results-info">
        <p>{filteredProducts.length} products found</p>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(p => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <div className="product-rating">
              <span className="stars">{renderStars(p.rating)}</span>
              <span className="rating-text">({p.rating})</span>
            </div>
            <h3>{p.name}</h3>
            <p className="product-category">{p.category}</p>
            <p className="product-price">Rs.{p.price}</p>
            <div className="product-buttons">
              <Link to={`/product/${p._id}`} className="btn btn-secondary">View Details</Link>
              <button onClick={() => addToCart(p)} className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  )
}
