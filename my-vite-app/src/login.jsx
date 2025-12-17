import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoImg from './assets/images/01-logo-dark.svg';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  // --- FIX START: Define the API URL correctly ---
  // Use the environment variable, OR fallback to your Render URL directly
  const API_URL = import.meta.env.VITE_API_URL || "https://burnnglow-fitnessweb.onrender.com"; 
  // --- FIX END ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log("Attempting login to:", `${API_URL}/login`); // Debug log

        // --- FIX: Use the API_URL variable instead of localhost ---
        const response = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('userToken', response.data.token);
        setLoginStatus('success');
        
        // Alert to confirm it worked
        alert("Login Successful!"); 
        navigate('/');
        
      } catch (error) {
        setLoginStatus('error');
        console.error('Login failed:', error);
        
        // Optional: Alert the user why it failed
        if(error.response) {
            alert(`Login Failed: ${error.response.data.error}`);
        }
      }
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <img 
                    src={logoImg}
                    alt="My Diet Meal Plan Logo" 
                    className="mb-3"
                    style={{ height: "50px" }}
                  />
                  <h2 className="fw-bold text-success">Welcome Back</h2>
                  <p className="text-secondary">Login to your account</p>
                </div>
                
                {loginStatus === 'error' && (
                  <div className="alert alert-danger">
                    Login failed. Please check your credentials.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="/forgot-password" class="text-success">Forgot Password?</a>
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg rounded-pill shadow-sm">
                      Login
                    </button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <p className="small text-secondary">
                      Don't have an account? <a href="/signup" className="text-success">Sign Up</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;