// src/shop/cartpage.jsx
import React from "react";
import { useCart } from "./catcontext";
import { useNavigate } from "react-router-dom";
import "./cart.css"; // Import the new beautiful styles

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate Total Price
  const totalPrice = cartItems.reduce((total, item) => {
    // Remove the "₹" symbol and commas to do math
    const priceNumber = parseFloat(item.price.replace(/[₹,]/g, ""));
    return total + priceNumber;
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛍️ Your Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-msg">
            <p>Your cart is empty. Time to fuel up! 💪</p>
            <button className="back-btn" onClick={() => navigate("/shop/protein")}>
              Back to Shop
            </button>
          </div>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{item.price}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove ❌
                </button>
              </div>
            ))}

            <div className="cart-total">
              <h2>Total: ₹{totalPrice.toLocaleString()}</h2>
              <button 
                className="back-btn" 
                onClick={() => navigate("/shop/protein")}
              >
                Continue Shopping
              </button>
              <button 
                className="checkout-btn"
                onClick={() => navigate("/shop/checkout")}
              >
                Proceed to Checkout 💳
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;