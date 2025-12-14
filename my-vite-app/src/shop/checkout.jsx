import React from "react";
import { useCart } from "./catcontext";

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price.replace("₹", "")),
      0
    );
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">🧾 Checkout</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">Your cart is empty.</div>
      ) : (
        <div className="card p-4 bg-dark text-white">
          <h4>Items in Cart:</h4>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <h5>Total: ₹{calculateTotal().toFixed(2)}</h5>
          <button className="btn btn-success mt-3">Complete Purchase</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
