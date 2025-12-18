// src/shop/checkoutpages.jsx
import React, { useState } from "react";
import { useCart } from "./catcontext";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    phone: ""
  });

  // Calculate Total
  const totalPrice = cartItems.reduce((total, item) => {
    const priceNumber = parseFloat(item.price.replace(/[₹,]/g, ""));
    return total + priceNumber;
  }, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Here we will eventually send data to the backend
    alert(`Order Placed Successfully! 🎉\nTotal: ₹${totalPrice.toLocaleString()}\nShipping to: ${formData.address}`);
    navigate("/"); // Go back to Dashboard
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* Left Side: Shipping Form */}
        <div className="checkout-form">
          <h2>🚚 Shipping Details</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" name="fullName" required 
                placeholder="John Doe"
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" name="phone" required 
                placeholder="+91 98765 43210"
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea 
                name="address" rows="3" required 
                placeholder="Street, House No, Landmark"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" name="city" required 
                placeholder="New Delhi"
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input 
                type="text" name="zip" required 
                placeholder="110001"
                onChange={handleInputChange} 
              />
            </div>
            
            {/* Mobile View Button (Hidden on Desktop usually, but good for access) */}
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="order-summary">
          <h2>📦 Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
          
          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order ✅
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;