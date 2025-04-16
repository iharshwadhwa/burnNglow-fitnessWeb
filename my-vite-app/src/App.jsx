import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Calculate from './Calculator';
import Dashboard from './Dashboard';
import Signup from './signup';
import Login from './login';
import BMICalculator from './BMI';
import CaloriesCalculator from './calorie'; 

import Protein from './shop/protein';
import Fatburner from './shop/fatburner';
import Creatine from './shop/creatine';
import Vitamin from './shop/vitamin';
  // Import the Protein component

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  
  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Reverse Protected Route (for login/signup when already authenticated)
const ReverseProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  
  if (token) {
    // Redirect to dashboard if token exists
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <ReverseProtectedRoute>
              <Login />
            </ReverseProtectedRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <ReverseProtectedRoute>
              <Signup />
            </ReverseProtectedRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Add the Protein Route */}
        <Route 
          path="/shop/protein"  // Define the path for Protein
          element={
            <ProtectedRoute>
              <Protein />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shop/fatburner"  // Define the path for Protein
          element={
            <ProtectedRoute>
              <Fatburner />
            </ProtectedRoute>
          } 
        />

          <Route 
          path="/shop/creatine"  // Define the path for Protein
          element={
            <ProtectedRoute>
              <Creatine />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shop/vitamin"  
          element={
            <ProtectedRoute>
              <Vitamin />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/bmi-calculator" 
          element={
            <ProtectedRoute>
              <div>
                <BMICalculator />
                <CaloriesCalculator />
              </div>
            </ProtectedRoute>
          } 
        />
        

        <Route 
          path="/calculate" 
          element={
            <ProtectedRoute>
              <Calculate />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
