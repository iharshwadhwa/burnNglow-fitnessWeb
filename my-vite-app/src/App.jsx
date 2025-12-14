import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Calculate from './Calculator';
import Dashboard from './Dashboard';
import Signup from './signup';
import Login from './login';
import Exercise from './exercise';
import BMICalculator from './BMI';
import CaloriesCalculator from './calorie';
import WaterCalculator from './watercalc';

import Protein from './shop/protein';
import Fatburner from './shop/fatburner';
import Creatine from './shop/creatine';
import Vitamin from './shop/vitamin';
import CartPage from './shop/cartpage'; // ✅ Import CartPage
import CheckoutPage from './shop/checkoutpages'; // ✅ Import CheckoutPage
import { CartProvider } from "./shop/catcontext"; // ✅ Import the CartProvider

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Reverse Protected Route (for login/signup when already authenticated)
const ReverseProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <CartProvider> {/* ✅ Wrap everything inside CartProvider */}
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
          <Route
            path="/shop/protein"
            element={
              <ProtectedRoute>
                <Protein />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/fatburner"
            element={
              <ProtectedRoute>
                <Fatburner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/creatine"
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
                  <WaterCalculator />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <ProtectedRoute>
                <Exercise />
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

          {/* Cart and Checkout Pages */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
