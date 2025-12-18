import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Calculator() {
  const [allergy, setAllergy] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState([]); // This will now hold our single merged plan
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!allergy || !age || !goal) {
      setError("Please select all fields to get the best results.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const base_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const clean_url = base_url.endsWith('/') ? base_url.slice(0, -1) : base_url;

      const res = await fetch(`${clean_url}/get-diet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allergy, age, goal })
      });

      if (!res.ok) throw new Error("No specific plan found.");

      const data = await res.json();
      setResults(data); // Backend now returns an array with just 1 smart object
    } catch (err) {
      console.error(err);
      setError("Unable to fetch diet plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .calc-page {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          .custom-select-style {
            border: 2px solid #eee;
            border-radius: 12px;
            padding: 12px;
            font-size: 1rem;
            background-color: #f9f9f9;
            cursor: pointer;
          }
          .custom-select-style:focus {
            border-color: #38ef7d;
            box-shadow: 0 0 0 4px rgba(56, 239, 125, 0.15);
            outline: none;
          }
          .label-style {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            display: block;
          }
        `}
      </style>

      <div className="calc-page d-flex align-items-center py-5">
        <div className="container">
          <button 
            className="btn btn-light rounded-pill mb-4 shadow-sm fw-bold text-success"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>

          <div className="glass-card p-5 mx-auto" style={{ maxWidth: "800px" }}>
            
            <div className="text-center mb-5">
              <h1 className="fw-bold mb-2" style={{ color: "#11998e" }}>🥗 Diet Recommender</h1>
              <p className="text-muted">
                AI-Powered Smart Plan: Combines your Goal, Age, and Dietary needs.
              </p>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <label className="label-style">🚫 Allergy / Condition</label>
                <select className="form-select custom-select-style" value={allergy} onChange={(e) => setAllergy(e.target.value)}>
                  <option value="">Select Option...</option>
                  <option value="Lactose Intolerant">Lactose Intolerant</option>
                  <option value="Milk Allergy">Milk Allergy</option>
                  <option value="High Cholesterol">High Cholesterol</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="label-style">🎂 Age Group</label>
                <select className="form-select custom-select-style" value={age} onChange={(e) => setAge(e.target.value)}>
                  <option value="">Select Age...</option>
                  <option value="15-20 years">15–20 years</option>
                  <option value="21-30 years">21–30 years</option>
                  <option value="31-40 years">31–40 years</option>
                  <option value="41-50 years">41–50 years</option>
                  <option value="50+ years">50+ years</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="label-style">💪 Fitness Goal</label>
                <select className="form-select custom-select-style" value={goal} onChange={(e) => setGoal(e.target.value)}>
                  <option value="">Select Goal...</option>
                  <option value="Lean Gain">Lean Gain</option>
                  <option value="Bulk Gain">Bulk Gain</option>
                </select>
              </div>
            </div>

            {error && <div className="alert alert-danger text-center rounded-3 shadow-sm">{error}</div>}

            <button
              className="btn w-100 py-3 fw-bold text-white shadow rounded-pill mt-2"
              style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", border: "none", fontSize: "1.1rem" }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating your plan..." : "✨ Generate My Custom Plan"}
            </button>

            {/* SINGLE RESULT CARD */}
            {results.length > 0 && (
              <div className="mt-5 animate__animated animate__fadeIn">
                <h4 className="fw-bold mb-4 text-center text-dark">
                  Your Personalized Blueprint
                </h4>
                
                {/* We map here but there is only 1 item now! */}
                {results.map((r, i) => (
                  <div key={i} className="card border-0 shadow-sm mb-4 overflow-hidden bg-white">
                    <div className="card-header border-bottom-0 pt-3 text-center" style={{backgroundColor: '#f8f9fa'}}>
                      <span className="badge bg-success rounded-pill px-3 py-2 fs-6">
                         {r.condition_value}
                      </span>
                    </div>
                    <div className="card-body pt-4">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="p-3 rounded-3 h-100 text-center" style={{ backgroundColor: "#f0fdf4" }}>
                            <div className="fs-1 mb-2">🍳</div>
                            <small className="text-success d-block text-uppercase fw-bold mb-2">Breakfast (Goal)</small>
                            <p className="mb-0 fw-medium text-dark">{r.meal_1}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 rounded-3 h-100 text-center" style={{ backgroundColor: "#eff6ff" }}>
                            <div className="fs-1 mb-2">🥗</div>
                            <small className="text-primary d-block text-uppercase fw-bold mb-2">Lunch (Age Optimized)</small>
                            <p className="mb-0 fw-medium text-dark">{r.meal_3}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 rounded-3 h-100 text-center" style={{ backgroundColor: "#fff7ed" }}>
                            <div className="fs-1 mb-2">⚡</div>
                            <small className="text-warning d-block text-uppercase fw-bold mb-2">Post-Workout (Safe)</small>
                            <p className="mb-0 fw-medium text-dark">{r.post_workout}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;