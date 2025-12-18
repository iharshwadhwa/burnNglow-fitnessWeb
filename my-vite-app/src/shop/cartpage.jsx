import React from "react";
import { useCart } from "./catcontext";
import { useNavigate } from "react-router-dom";
import "./cart.css";
const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // ✅ CORRECT MATH: Multiply Price * Quantity
  const totalPrice = cartItems.reduce((total, item) => {
    const priceString = item.price ? item.price.toString() : "0";
    const priceNumber = parseFloat(priceString.replace(/[₹,]/g, ""));
    const quantity = item.quantity || 1;
    return total + (priceNumber * quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2>Your Cart is Empty 🛒</h2>
        <button className="btn btn-success mt-3" onClick={() => navigate('/shop/protein')}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="text-center mb-4 fw-bold">🛍️ Your Shopping Cart</h2>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 border-0 shadow-sm">
              <div className="row g-0 align-items-center p-3">
                <div className="col-md-2 text-center">
                  <img src={item.img} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '100px' }} />
                </div>
                <div className="col-md-6">
                  <h5 className="card-title mb-1">{item.name}</h5>
                  <p className="text-muted small mb-0">{item.description}</p>
                </div>
                <div className="col-md-2 text-center">
                   {/* SHOW QUANTITY BADGE */}
                   <span className="badge bg-secondary rounded-pill px-3 py-2">
                     Qty: {item.quantity || 1}
                   </span>
                </div>
                <div className="col-md-2 text-end">
                  <h5 className="text-success fw-bold">
                    ₹{(parseFloat(item.price.replace(/[₹,]/g, "")) * (item.quantity || 1)).toLocaleString()}
                  </h5>
                  <button 
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => navigate('/shop/protein')}>
            ← Continue Shopping
          </button>
          
          <div className="text-end">
            <h3 className="fw-bold">Total: ₹{totalPrice.toLocaleString()}</h3>
            <button 
              className="btn btn-warning btn-lg rounded-pill px-5 mt-2 fw-bold text-dark shadow-sm"
              onClick={() => navigate('/shop/checkout')}
            >
              Proceed to Checkout 💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;