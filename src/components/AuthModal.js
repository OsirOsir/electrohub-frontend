import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ mode, onClose, onAuthChange }) => {
  const [authMode, setAuthMode] = useState(mode);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${authMode} with`, formData);

    // Simulate authentication
    if (authMode === "signIn") {
      // Perform sign-in logic
      onAuthChange(true); // Set as authenticated
    } else {
      // Perform sign-up logic
      console.log("Sign-up successful");
      onAuthChange(true); // Set as authenticated after sign-up
    }
    onClose(); // Close modal after authentication
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
