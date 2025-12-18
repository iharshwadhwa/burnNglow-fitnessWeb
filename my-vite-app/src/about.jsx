// src/about.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-vh-100 py-5" 
      style={{ 
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', // Soft elegant background
        fontFamily: "'Poppins', sans-serif" 
      }}
    >
      <div className="container">
        {/* Back Button */}
        <button 
          className="btn btn-outline-success mb-4 rounded-pill px-4"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* Main Card */}
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-success text-white text-center py-5">
                <h1 className="fw-bold display-4">About BurnNGlow</h1>
                <p className="lead opacity-75">Fueling your ambition, one meal at a time.</p>
              </div>

              <div className="card-body p-5">
                <div className="row g-5 align-items-center">
                  <div className="col-md-6">
                    <h2 className="text-success fw-bold mb-3">Our Mission</h2>
                    <p className="text-secondary lead">
                      At BurnNGlow, we believe that fitness isn't just about hitting the gym—it's about fueling your body with intelligence. 
                    </p>
                    <p className="text-secondary">
                      Our goal is to simplify nutrition. Whether you are looking to build muscle, lose weight, or just eat healthier, our algorithmic meal planner does the heavy lifting for you.
                    </p>
                  </div>
                  <div className="col-md-6 text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" 
                      alt="Healthy Food" 
                      className="img-fluid rounded-3 shadow-sm"
                    />
                  </div>
                </div>

                <hr className="my-5" />

                <div className="row text-center">
                  <h3 className="fw-bold mb-4">Why Choose Us?</h3>
                  <div className="col-md-4 mb-3">
                    <div className="p-3 border rounded-3 h-100 bg-light">
                      <h1 className="display-4">🥗</h1>
                      <h5 className="fw-bold">Smart Planning</h5>
                      <p className="text-muted small">AI-driven calorie and macro calculations tailored to your body.</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="p-3 border rounded-3 h-100 bg-light">
                      <h1 className="display-4">🛍️</h1>
                      <h5 className="fw-bold">Premium Shop</h5>
                      <p className="text-muted small">Curated supplements to accelerate your results.</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="p-3 border rounded-3 h-100 bg-light">
                      <h1 className="display-4">💪</h1>
                      <h5 className="fw-bold">Real Results</h5>
                      <p className="text-muted small">Proven strategies for weight loss and muscle gain.</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5">
                  <p className="text-muted">
                    Created with ❤️ by the BurnNGlow Team. <br />
                    © 2025 All Rights Reserved.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;