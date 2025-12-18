import React, { useState } from "react";
import { useCart } from "./catcontext";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", address: "", city: "", zip: "", phone: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ CORRECT MATH: Price * Quantity
  const totalPrice = cartItems.reduce((total, item) => {
    const priceString = item.price ? item.price.toString() : "0";
    const priceNumber = parseFloat(priceString.replace(/[₹,]/g, ""));
    const quantity = item.quantity || 1;
    return total + (priceNumber * quantity);
  }, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("Please fill in all shipping details first! 📝");
      return;
    }
    setShowSuccess(true);
  };

  return (
    <div className="checkout-page">
      
      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="glass-modal animate-pop">
            <div className="checkmark-container">
              <div className="checkmark-circle"></div>
              <div className="checkmark draw"></div>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-subtitle">Thank you for shopping with BurnNGlow.</p>
            <div className="order-details-box">
              <div className="detail-row">
                <span>📦 Total Amount:</span>
                <strong>₹{totalPrice.toLocaleString()}</strong>
              </div>
              <div className="detail-row">
                <span>📍 Shipping To:</span>
                <strong>{formData.city}</strong>
              </div>
            </div>
            <button className="continue-btn" onClick={() => navigate('/')}>Continue Shopping 🛍️</button>
          </div>
        </div>
      )}

      <div className="checkout-container">
        <div className="checkout-form">
          <h2>🚚 Shipping Details</h2>
          <form>
            <div className="form-group"><label>Full Name</label><input type="text" name="fullName" required onChange={handleInputChange} /></div>
            <div className="form-group"><label>Phone Number</label><input type="tel" name="phone" required onChange={handleInputChange} /></div>
            <div className="form-group"><label>Address</label><textarea name="address" required onChange={handleInputChange}></textarea></div>
            <div className="form-group"><label>City</label><input type="text" name="city" required onChange={handleInputChange} /></div>
            <div className="form-group"><label>Zip Code</label><input type="text" name="zip" required onChange={handleInputChange} /></div>
          </form>
        </div>

        <div className="order-summary">
          <h2>📦 Order Summary</h2>
          <div className="summary-list">
            {cartItems.map((item, index) => (
              <div key={index} className="summary-item">
                <div className="d-flex align-items-center">
                  {/* Shows "3x" Badge */}
                  <span className="badge bg-secondary me-2 rounded-pill">{item.quantity || 1}x</span>
                  <span>{item.name}</span>
                </div>
                {/* Shows total for that item line */}
                <span>₹{(parseFloat(item.price.replace(/[₹,]/g, "")) * (item.quantity || 1)).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order ✅</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;