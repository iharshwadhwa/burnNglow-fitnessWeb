import React, { useState } from "react";
import { useCart } from "./catcontext";
import { Link } from "react-router-dom";

const Vitamin = () => {
  const { addToCart } = useCart();
  const [addedMessage, setAddedMessage] = useState("");

  const vitaminProducts = [
    {
      id: 1,
      name: "Vitamin C 1000mg",
      description: "Boosts immunity and supports skin health.",
      price: "₹499",
      image: "/vitaminpic/vitaminc.jpg",
    },
    {
      id: 2,
      name: "Vitamin D3 5000 IU",
      description: "Supports bone strength and immune system.",
      price: "₹599",
      image: "/vitaminpic/d3.jpg",
    },
    {
      id: 3,
      name: "Multivitamin for Men",
      description: "Daily nutrition support for active lifestyle.",
      price: "₹899",
      image: "/vitaminpic/multi.jpg",
    },
    {
      id: 4,
      name: "Multivitamin for Women",
      description: "Tailored for women's health and energy.",
      price: "₹849",
      image: "/vitaminpic/multiwo.jpg",
    },
    {
      id: 5,
      name: "Vitamin B Complex",
      description: "Supports energy, metabolism, and brain health.",
      price: "₹699",
      image: "/vitaminpic/b-complex.jpg",
    },
    {
      id: 6,
      name: "Zinc with Vitamin C",
      description: "Immune booster with antioxidant support.",
      price: "₹399",
      image: "/vitaminpic/zinc.jpg",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMessage(`${product.name} has been added to your cart!`);
    setTimeout(() => setAddedMessage(""), 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />

      <h2 className="text-center text-white special-gothic-expanded-one-regular">
        💊 Vitamin Supplements
      </h2>
      <p className="text-center mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        Shop our range of premium vitamin supplements to support your health and well-being every day.
      </p>

      {addedMessage && (
        <div className="alert alert-success text-center" role="alert">
          {addedMessage}
        </div>
      )}

      <div className="position-fixed" style={{ top: "10px", right: "10px", zIndex: "1000" }}>
        <Link to="/shop/checkout" className="btn btn-warning btn-sm">
          🛒 Go to Checkout
        </Link>
      </div>

      <div className="container">
        <div className="row">
          {vitaminProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div
                className="card h-100"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "320px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <h6 className="mt-auto">{product.price}</h6>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vitamin;