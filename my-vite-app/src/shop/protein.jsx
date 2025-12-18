import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './catcontext'; // Import new logic
import { products } from './proteinData';
import './protein.css';

const Protein = () => {
  const navigate = useNavigate();
  // Get all our new tools from the context
  const { addToCart, decreaseQuantity, getItemQuantity } = useCart();

  return (
    <div className="protein-page">
      {/* Checkout Button */}
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
          Explore high quality protein supplements from Isolate, Concentrate, and Plant Based sources.
        </p>
      </div>

      <h2 className="section-title">Isolate Proteins</h2>

      <div className="products-grid">
        {products.map((item) => {
          // Find out how many of THIS item are in the cart
          const quantity = getItemQuantity(item.id);

          return (
            <div key={item.id} className="product-card">
              <img src={item.img} alt={item.name} className="product-img" />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <span className="price">{item.price}</span>
                
                {/* THE SMART BUTTON LOGIC */}
                {quantity === 0 ? (
                  // State 1: Item not in cart -> Show "Add to Cart"
                  <button 
                    className="add-btn" 
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  // State 2: Item in cart -> Show Quantity Controls
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-2">
                    <button 
                      className="btn btn-outline-danger btn-sm rounded-circle"
                      style={{ width: '35px', height: '35px' }}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      {quantity === 1 ? '🗑️' : '➖'}
                    </button>
                    
                    <span className="fw-bold fs-5">{quantity}</span>
                    
                    <button 
                      className="btn btn-success btn-sm rounded-circle"
                      style={{ width: '35px', height: '35px' }}
                      onClick={() => addToCart(item)}
                    >
                      ➕
                    </button>
                  </div>
                )}
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Protein;