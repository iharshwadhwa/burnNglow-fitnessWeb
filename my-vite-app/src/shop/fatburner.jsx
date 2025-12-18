import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './catcontext'; 
import { products } from './fatburnerData'; // Import Fatburner data
import './fatburner.css';

const Fatburner = () => {
  const navigate = useNavigate();
  const { addToCart, decreaseQuantity, getItemQuantity } = useCart();

  return (
    <div className="fatburner-page">
      <div className="checkout-btn-container">
        <button 
          className="checkout-btn" 
          onClick={() => navigate('/cart')}
        >
          🛒 Go to Cart
        </button>
      </div>

      <div className="shop-header">
        <h1>🔥 Fat Burners</h1>
        <p className="subtitle">
          Accelerate your weight loss journey with our premium thermogenic and metabolism-boosting formulas.
        </p>
      </div>

      <h2 className="category-heading">Advanced Weight Loss Formulas</h2>

      <div className="products-grid">
        {products.map((item) => {
          const quantity = getItemQuantity(item.id);

          return (
            <div key={item.id} className="product-card">
              <img src={item.img} alt={item.name} className="product-img" />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <span className="price">{item.price}</span>

                {/* SMART BUTTON LOGIC */}
                {quantity === 0 ? (
                  <button 
                    className="add-btn" 
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
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

export default Fatburner;