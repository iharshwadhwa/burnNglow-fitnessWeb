import React from "react";

const Vitamin = () => {
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

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #76c7a7, #3fa96d)",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Bootstrap CDN */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />

      <h1 className="text-center mb-4" style={{ color: "#fff" }}>
        💊 Vitamin Supplements
      </h1>
      <p
        className="text-center mb-5"
        style={{ maxWidth: "600px", margin: "0 auto", color: "#f0f0f0" }}
      >
        Shop our range of premium vitamin supplements to support your health and
        well-being every day.
      </p>

      <div className="container">
        <div className="row">
          {vitaminProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div
                className="card h-100"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ fontWeight: "600" }}>
                    {product.name}
                  </h5>
                  <p className="card-text" style={{ color: "#666", fontSize: "14px" }}>
                    {product.description}
                  </p>
                  <h6 className="mt-auto text-success" style={{ fontWeight: "bold" }}>
                    {product.price}
                  </h6>
                  <button
                    className="btn btn-success mt-3"
                    style={{
                      backgroundColor: "#28a745",
                      border: "none",
                      fontWeight: "500",
                    }}
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