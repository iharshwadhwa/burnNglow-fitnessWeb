import { useState } from "react";
import './DietPlannerStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Calculator() {
  const [allergy, setAllergy] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!allergy || !age || !goal) {
      setError("Please select all fields");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("http://localhost:3000/get-diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allergy, age, goal })
      });

      if (!res.ok) throw new Error("No plan found");

      const data = await res.json();
      setResults(data);
    } catch {
      setError("No diet plan available for selected options");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="diet-planner-page">
    <div className="container">
      <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "700px" }}>
        
        <h2 className="text-center fw-bold mb-4">
          Personalized Diet Recommendations
        </h2>

        <div className="mb-3">
          <select
            className="form-select"
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
          >
            <option value="">Select Allergy</option>
            <option value="Lactose Intolerant">Lactose Intolerant</option>
            <option value="Milk Allergy">Milk Allergy</option>
            <option value="High Cholesterol">High Cholesterol</option>
          </select>
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">Select Age Group</option>
            <option value="15-20 years">15–20 years</option>
            <option value="21-30 years">21–30 years</option>
            <option value="31-40 years">31–40 years</option>
            <option value="41-50 years">41–50 years</option>
            <option value="50+ years">50+ years</option>
          </select>
        </div>

        <div className="mb-4">
          <select
            className="form-select"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select Goal</option>
            <option value="Lean Gain">Lean Gain</option>
            <option value="Bulk Gain">Bulk Gain</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <button
          className="btn btn-success w-100 fw-semibold"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>

        {results.length > 0 && (
          <div className="mt-4">
            <h4 className="fw-bold mb-3">Your Diet Plan</h4>

            {results.map((r, i) => (
              <div
                key={i}
                className="border rounded-3 p-3 mb-3 bg-light"
              >
                <h5 className="fw-semibold">{r.condition_value}</h5>
                <p><strong>Meal 1:</strong> {r.meal_1}</p>
                <p><strong>Meal 3:</strong> {r.meal_3}</p>
                <p><strong>Post Workout:</strong> {r.post_workout}</p>
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
