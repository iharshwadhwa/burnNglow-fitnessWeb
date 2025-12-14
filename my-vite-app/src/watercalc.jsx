import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WaterCalculator() {
  const [form, setForm] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: 'moderate',
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateWater = () => {
    const { weight, age, activity } = form;

    if (!weight || weight <= 0 || !age || age <= 0) {
      alert('Please enter valid values');
      return;
    }

    // Base intake: 35ml per kg of body weight
    let baseMl = weight * 35;

    // Modify based on activity level
    const activityModifiers = {
      sedentary: 1.0,
      moderate: 1.15,
      active: 1.25,
    };

    baseMl *= activityModifiers[activity];

    // Modify slightly based on age
    if (age > 55) {
      baseMl *= 0.9; // reduce by 10% for older individuals
    }

    const litres = baseMl / 1000;
    const glasses = Math.round(baseMl / 240);

    setResults({
      ml: Math.round(baseMl),
      litres: litres.toFixed(1),
      glasses,
    });
  };

  return (
    <div className="card p-5 rounded-4 shadow mx-auto mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center fw-bold text-success mb-4">Water Intake Calculator</h2>

      <div className="mb-3">
        <label className="form-label">Weight (kg)</label>
        <input
          type="number"
          className="form-control"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="Enter your weight"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Height (cm)</label>
        <input
          type="number"
          className="form-control"
          name="height"
          value={form.height}
          onChange={handleChange}
          placeholder="Enter your height"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age (years)</label>
        <input
          type="number"
          className="form-control"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Enter your age"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <select
          className="form-select"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label">Activity Level</label>
        <select
          className="form-select"
          name="activity"
          value={form.activity}
          onChange={handleChange}
        >
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="moderate">Moderate (exercise 3-5 days/week)</option>
          <option value="active">Active (intense exercise 6-7 days/week)</option>
        </select>
      </div>

      <div className="d-grid mb-4">
        <button
          onClick={calculateWater}
          className="btn btn-success btn-lg rounded-pill"
        >
          Calculate Water Intake
        </button>
      </div>

      {results && (
        <div className="alert alert-success text-center">
          <p className="mb-1">💧 <strong>Daily Water Intake:</strong></p>
          <p className="mb-1">{results.ml} ml ({results.litres} L)</p>
          <p className="mb-0">🥛 <strong>Glasses:</strong> {results.glasses} (240ml each)</p>
        </div>
      )}
    </div>
  );
}

export default WaterCalculator;
