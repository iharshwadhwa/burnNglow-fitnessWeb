import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phone: '',
    height: '',
    weight: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.height) newErrors.height = 'Height is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // --- FIX START ---
        // Fallback to localhost:3000 if the .env variable is missing
        const base_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
        
        // Remove trailing slash if it exists to prevent //signup
        const clean_url = base_url.endsWith('/') ? base_url.slice(0, -1) : base_url;

        console.log("🚀 Attempting request to:", `${clean_url}/signup`);

        const response = await axios.post(`${clean_url}/signup`, {        
          email: formData.email,
          name: formData.name,
          password: formData.password,
          phone: formData.phone,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight)
        });
        // --- FIX END ---

        if (response.status === 200 || response.status === 201) {
            setSubmitStatus('success');
            // Reset form on success
            setFormData({ email: '', name: '', password: '', phone: '', height: '', weight: '' });
        }
      } catch (error) {
        setSubmitStatus('error');
        // This log is crucial for debugging the 404
        console.error('Signup failed details:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-5">
                <h2 className="text-center fw-bold text-success mb-4">Create Your Account</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success">Account created successfully!</div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-danger">Signup failed. Check console for details.</div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name" name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email" name="email"
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
                      id="password" name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone" name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="height" className="form-label">Height (cm)</label>
                      <input 
                        type="number" step="0.1"
                        className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                        id="height" name="height"
                        value={formData.height}
                        onChange={handleChange}
                      />
                      {errors.height && <div className="invalid-feedback">{errors.height}</div>}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="weight" className="form-label">Weight (kg)</label>
                      <input 
                        type="number" step="0.1"
                        className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                        id="weight" name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                      {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
                    </div>
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg rounded-pill shadow-sm">
                      Create Account
                    </button>
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

export default Signup;