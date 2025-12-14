import React from "react";
import { useCart } from "./catcontext"; // Import the useCart hook
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useCart(); // Access cartItems and removeFromCart from CartContext

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace("₹", "")), 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty. Please add items to your cart.
        </div>
      ) : (
        <div>
          <div className="row">
            {/* Display cart items */}
            {cartItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text font-weight-bold">{item.price}</p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)} // Pass item.id to correctly remove the item
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <h3>Total: ₹{calculateTotal()}</h3>
            <Link to="/protein" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>

          <div className="mt-4 text-center">
            <button className="btn btn-success btn-lg">
              Complete Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
