import React from 'react'

export default function Cart({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.map((item, index) => (
        <div key={`${item._id}-${index}`} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>Rs.{item.price}</p>
          </div>
          <button onClick={() => removeFromCart(item._id)} className="btn btn-danger">Remove</button>
        </div>
      ))}
      <div className="cart-total">Total: Rs.{getTotalPrice()}</div>
    </div>
  )
}
