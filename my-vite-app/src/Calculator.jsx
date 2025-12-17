import React, { useState } from "react";
// import './DietPlannerStyles.css'; // Uncomment if you use this file
import "bootstrap/dist/css/bootstrap.min.css";

function Calculator() {
  const [allergy, setAllergy] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // 1. Basic Validation
    if (!allergy || !age || !goal) {
      setError("Please select all fields to get the best results.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      // 2. DYNAMIC URL HANDLING (Crucial for Deployment)
      // Uses the Vercel/Render URL if available, otherwise falls back to localhost
      const base_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const clean_url = base_url.endsWith('/') ? base_url.slice(0, -1) : base_url;

      const res = await fetch(`${clean_url}/get-diet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allergy, age, goal })
      });

      if (!res.ok) throw new Error("No specific plan found for these options.");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch diet plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to pick a color for the badge based on category
  const getBadgeColor = (val) => {
    if (val.includes("years")) return "bg-info"; // Blue for Age
    if (val.includes("Gain")) return "bg-warning text-dark"; // Yellow for Goal
    return "bg-danger"; // Red for Allergy
  };

  return (
    <div className="diet-planner-page min-vh-100 d-flex align-items-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "700px" }}>
          
          <h2 className="text-center fw-bold mb-4 text-success">
            Personalized Diet Recommendations
          </h2>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold small">Allergy / Condition</label>
              <select
                className="form-select"
                value={allergy}
                onChange={(e) => setAllergy(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Lactose Intolerant">Lactose Intolerant</option>
                <option value="Milk Allergy">Milk Allergy</option>
                <option value="High Cholesterol">High Cholesterol</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold small">Age Group</label>
              <select
                className="form-select"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="15-20 years">15–20 years</option>
                <option value="21-30 years">21–30 years</option>
                <option value="31-40 years">31–40 years</option>
                <option value="41-50 years">41–50 years</option>
                <option value="50+ years">50+ years</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold small">Fitness Goal</label>
              <select
                className="form-select"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Lean Gain">Lean Gain</option>
                <option value="Bulk Gain">Bulk Gain</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <button
            className="btn btn-success w-100 py-2 fw-bold shadow-sm rounded-pill"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
               <>
                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                 Generating Plan...
               </>
            ) : "Get Recommendations"}
          </button>

          {/* RESULTS SECTION */}
          {results.length > 0 && (
            <div className="mt-5">
              <h4 className="fw-bold mb-4 border-bottom pb-2">Your Custom Plan</h4>
              
              {results.map((r, i) => (
                <div key={i} className="card border-0 shadow-sm mb-4 overflow-hidden">
                  <div className="card-header bg-white border-bottom-0 pt-3">
                    <span className={`badge ${getBadgeColor(r.condition_value)} mb-2`}>
                      {r.condition_value} Recommendation
                    </span>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-3 h-100">
                          <small className="text-muted d-block text-uppercase fw-bold mb-1">Meal 1</small>
                          <p className="mb-0 fw-medium">{r.meal_1}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-3 h-100">
                          <small className="text-muted d-block text-uppercase fw-bold mb-1">Meal 3</small>
                          <p className="mb-0 fw-medium">{r.meal_3}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-3 h-100">
                          <small className="text-muted d-block text-uppercase fw-bold mb-1">Post-Workout</small>
                          <p className="mb-0 fw-medium">{r.post_workout}</p>
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
  );
}

export default Calculator;