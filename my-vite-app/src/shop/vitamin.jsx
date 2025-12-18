// src/shop/vitamin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './catcontext';
import { products } from './vitaminData'; // Importing the data we just made
import './vitamin.css'; // Importing the beautiful styles

const Vitamin = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="vitamin-page">
      <div className="checkout-btn-container">
        <button className="checkout-btn" onClick={() => navigate('/cart')}>
          🛒 Go to Cart
        </button>
      </div>

      <div className="shop-header">
        <h1>💊 Vitamin Supplements</h1>
        <p className="subtitle">
          Shop our range of premium vitamin supplements to support your health and well-being every day.
        </p>
      </div>

      {/* 👇 ADD THIS HEADING 👇 */}
      <h2 className="category-heading">Daily Health Essentials</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            {/* Note: Ensure these images exist in your public/vitaminpic folder */}
            <img src={item.img} alt={item.name} className="product-img" />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <span className="price">{item.price}</span>
              <button 
                className="add-btn" 
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vitamin;