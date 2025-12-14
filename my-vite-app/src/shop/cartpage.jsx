import React from "react";
import { useCart } from "./catcontext"; // Import the useCart hook
import { Link } from "react-router-dom"; // For navigation to Checkout

const CartPage = () => {
  const { cartItems } = useCart(); // Access cartItems from CartContext

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <h5>{item.name}</h5>
                <p>Price: {item.price}</p>
              </li>
            ))}
          </ul>
          <Link to="/checkout">
            <button className="btn btn-primary">Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
