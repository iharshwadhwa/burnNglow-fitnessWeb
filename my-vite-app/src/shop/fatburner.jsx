// src/shop/fatburner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './catcontext';
import { products } from './fatburnerData'; // Import the new data
import './fatburner.css'; // Import the styles

const Fatburner = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart! 🔥`);
  };

  return (
    <div className="fatburner-page">
      <div className="checkout-btn-container">
        <button className="checkout-btn" onClick={() => navigate('/cart')}>
          🛒 Go to Cart
        </button>
      </div>

      <div className="shop-header">
        <h1>🔥 Fat Burners</h1>
        <p className="subtitle">
          Accelerate your weight loss journey with our premium thermogenic and metabolism-boosting formulas.
        </p>
      </div>

      {/* 👇 ADD THIS HEADING 👇 */}
      <h2 className="category-heading">Advanced Weight Loss Formulas</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
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

export default Fatburner;