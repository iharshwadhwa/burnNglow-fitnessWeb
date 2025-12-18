// src/shop/protein.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import { useCart } from './catcontext';         // Import the Cart Logic
import { products } from './proteinData';       // Import the Product Data
import './protein.css';                         // Import Styles

const Protein = () => {
  const navigate = useNavigate(); // Helper to switch pages
  const { addToCart } = useCart(); // Get the addToCart function from context

  // Function to handle the click safely
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart! 🛒`); // Simple feedback for now
  };

  return (
    <div className="protein-page">
      {/* Checkout Button - Navigates to the Cart Page */}
      <div className="checkout-btn-container">
        <button 
          className="checkout-btn" 
          onClick={() => navigate('/cart')}
        >
          🛒 Go to Cart
        </button>
      </div>

      <div className="protein-header">
        <h1>💪 Protein Supplements</h1>
        <p className="subtitle">
          Explore high quality protein supplements from Isolate, Concentrate, and Plant Based sources to support your fitness journey.
        </p>
      </div>

      <h2 className="section-title">Isolate Proteins</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.img} alt={item.name} className="product-img" />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <span className="price">{item.price}</span>
              
              {/* The Active Button */}
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

export default Protein;