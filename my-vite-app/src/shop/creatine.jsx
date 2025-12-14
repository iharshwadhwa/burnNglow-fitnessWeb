import React, { useState } from "react";
import { useCart } from "./catcontext";
import { Link } from "react-router-dom";

const Creatine = () => {
  const { addToCart } = useCart();
  const [addedMessage, setAddedMessage] = useState("");

  const monohydrateProducts = [
    {
      id: 1,
      name: "Wellcore Nutrition Creatine Monohydrate",
      description: "Micronized creatine for maximum absorption.",
      price: "₹1499",
      image: "/creatinepic/wellcore.png",
    },
    {
      id: 2,
      name: "Optimum Nutrition (ON) Creatine",
      description: "Unflavored pure creatine monohydrate powder.",
      price: "₹1099",
      image: "/creatinepic/on.jpg",
    },
    {
      id: 3,
      name: "GNC Creatine",
      description: "100% pure creatine for faster recovery.",
      price: "₹1299",
      image: "/creatinepic/gnc.jpg",
    },
  ];

  const hclProducts = [
    {
      id: 4,
      name: "Ripped Up Creatine HCL",
      description: "Creatine HCL for better solubility & performance.",
      price: "₹1699",
      image: "/creatinepic/ripped.jpg",
    },
    {
      id: 5,
      name: "MuscleTech Creactor Creatine HCL",
      description: "Enhanced strength and endurance with HCL.",
      price: "₹1599",
      image: "https://m.media-amazon.com/images/I/71rybwMBemL.AC_UL1000.jpg",
    },
  ];

  const blendProducts = [
    {
      id: 6,
      name: "Nutrabay Creatine Blend",
      description: "Micronized creatine and performance boosters.",
      price: "₹1199",
      image: "/creatinepic/nutrabay.jpg",
    },
    {
      id: 7,
      name: "BPI Sports Creatine",
      description: "Advanced creatine formula for muscle strength.",
      price: "₹1399",
      image: "https://m.media-amazon.com/images/I/71rybwMBemL.AC_UL1000.jpg",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMessage(`${product.name} has been added to your cart!`);
    setTimeout(() => setAddedMessage(""), 3000);
  };

  const renderProducts = (products) =>
    products.map((product) => (
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
            style={{
              height: "320px",
              objectFit: "cover",
            }}
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
    ));

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
        ⚡ Creatine Supplements
      </h2>
      <p className="text-center mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        Enhance your strength, recovery, and endurance with premium creatine monohydrate, HCL, and advanced blends.
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
        {/* Monohydrate */}
        <div className="mb-5">
          <h3 className="text-white text-center mb-4">Creatine Monohydrate</h3>
          <div className="row">
            {renderProducts(monohydrateProducts)}
          </div>
        </div>

        {/* Creatine HCL */}
        <div className="mb-5">
          <h3 className="text-white text-center mb-4">Creatine HCL</h3>
          <div className="row">
            {renderProducts(hclProducts)}
          </div>
        </div>

        {/* Creatine Blends */}
        <div className="mb-5">
          <h3 className="text-white text-center mb-4">Creatine Blends</h3>
          <div className="row">
            {renderProducts(blendProducts)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creatine;
