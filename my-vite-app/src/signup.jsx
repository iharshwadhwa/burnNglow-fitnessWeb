import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    height: '',
    weight: ''
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // ✅ LOGIC KEPT SAFE: Smart API URL Selector
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:3000" 
    : "https://burnnglow-fitnessweb.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      console.log("Attempting signup to:", `${API_URL}/signup`);

      // Logic stays exactly the same
      await axios.post(`${API_URL}/signup`, formData);
      
      setMessage('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      console.error("Signup failed:", error);
      setIsError(true);
      setMessage(error.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    // 👇 STYLE UPDATE: Added Background Image here
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '450px', width: '100%', background: 'rgba(255, 255, 255, 0.95)' }}>
        <h2 className="text-center text-success fw-bold mb-3">Create Your Account</h2>
        
        {message && (
          <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} text-center`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted fw-bold">Full Name</label>
            <input type="text" name="fullName" className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted fw-bold">Email Address</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted fw-bold">Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted fw-bold">Phone Number</label>
            <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label text-muted fw-bold">Height (cm)</label>
              <input type="number" name="height" className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label text-muted fw-bold">Weight (kg)</label>
              <input type="number" name="weight" className="form-control" onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm">
            Create Account
          </button>
        </form>
        
        <p className="text-center mt-3 text-muted">
            Already have an account? <a href="/login" className="text-success fw-bold text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;