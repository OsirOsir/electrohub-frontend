import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ mode, onClose, onAuthChange }) => {
  const [authMode, setAuthMode] = useState(mode);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Sign Up function
  const signUp = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log("User signed up:", data);
      onAuthChange(true); // Set as authenticated
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // Sign In function
  const signIn = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
      const data = await response.json();
      if (data.length > 0) {
        console.log("User signed in:", data[0]);
        onAuthChange(true); // Set as authenticated
        onClose(); // Close the modal
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === "signIn") {
      signIn(formData.email, formData.password);
    } else {
      signUp(formData);
    }
  };

  // Toggle between Sign In and Sign Up modes
  const toggleMode = () => {
    setAuthMode(authMode === "signIn" ? "signUp" : "signIn");
  };

  return (
    <div className="auth-modal">
      <div className="modal-content">
        <h2>{authMode === "signIn" ? "Sign In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Show username field only in Sign Up mode */}
          {authMode === "signUp" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{authMode === "signIn" ? "Sign In" : "Sign Up"}</button>
        </form>
        <button onClick={toggleMode}>
          {authMode === "signIn" ? "Need an account? Sign Up" : "Already have an account? Sign In"}
        </button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;

