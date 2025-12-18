// src/shop/creatine.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './catcontext';
import { products } from './creatineData';
import './creatine.css';

const Creatine = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="creatine-page">
      <div className="checkout-btn-container">
        <button className="checkout-btn" onClick={() => navigate('/cart')}>
          🛒 Go to Cart
        </button>
      </div>

      <div className="shop-header">
        <h1>⚡ Creatine Monohydrate</h1>
        <p className="subtitle">
          Boost your strength, power, and muscle mass with the world's most researched supplement.
        </p>
      </div>

      {/* 👇 ADD THIS NEW HEADING LINE HERE 👇 */}
      <h2 className="category-heading">Premium Creatine Selection</h2>

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

export default Creatine;