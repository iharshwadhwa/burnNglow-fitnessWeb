import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoImg from './assets/images/01-logo-dark.svg';
import Swal from 'sweetalert2'; // <--- NEW IMPORT

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  // ✅ LOGIC KEPT SAFE: Smart API URL Selector
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:3000" 
    : "https://burnnglow-fitnessweb.onrender.com";

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
        console.log("Attempting login to:", `${API_URL}/login`); 

        const response = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('userToken', response.data.token);
        setLoginStatus('success');
        
        // 👇 UPDATED: Replaced alert with SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Login Successful',
          icon: 'success',
          confirmButtonText: 'Great!',
          timer: 2000, // Auto close after 2 seconds
          timerProgressBar: true
        }).then(() => {
           navigate('/');
        });
        
      } catch (error) {
        setLoginStatus('error');
        console.error('Login failed:', error);
        
        // 👇 UPDATED: Replaced error alert with SweetAlert2
        const errorMessage = error.response ? error.response.data.error : 'Something went wrong';
        
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
          confirmButtonColor: '#d33', // Red color for error
          confirmButtonText: 'Try Again'
        });
      }
    }
  };

  return (
    // 👇 STYLE UPDATE: Added Background Image here
    <div 
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            {/* Added a slight transparency to the card so the bg shows through barely */}
            <div className="card border-0 shadow-lg rounded-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <img 
                    src={logoImg}
                    alt="Logo" 
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
                    <label htmlFor="email" className="form-label fw-bold">Email Address</label>
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
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
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
                    <a href="/forgot-password" class="text-success text-decoration-none">Forgot Password?</a>
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg rounded-pill shadow-sm fw-bold">
                      Login
                    </button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <p className="small text-secondary">
                      Don't have an account? <a href="/signup" className="text-success fw-bold text-decoration-none">Sign Up</a>
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