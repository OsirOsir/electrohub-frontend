import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ mode, onClose, onAuthChange }) => {
  const [authMode, setAuthMode] = useState(mode);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error message on input change
  };

  // Sign Up function
  const signUp = async (userData) => {
    try {
      const response = await fetch('http://localhost:8001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User signed up:", data);
        setSuccessMessage("Successfully signed up");
        onAuthChange(true); // Set as authenticated
        onClose(); // Close the modal
      } else {
        setErrorMessage("Failed to sign up. User may already exist.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An error occurred while signing up. Please try again.");
    }
  };

  // Sign In function
  const signIn = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:8001/users?email=${email}`);
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        if (user.password === password) {
          console.log("User signed in:", user);
          setSuccessMessage("Successfully logged in");
          onAuthChange(true); // Set as authenticated
          onClose(); // Close the modal
        } else {
          setErrorMessage("Incorrect password. Please try again.");
        }
      } else {
        setErrorMessage("User does not exist.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("An error occurred while signing in. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear error message on submit
    setSuccessMessage(""); // Clear success message on submit

    if (authMode === "signIn") {
      signIn(formData.email, formData.password);
    } else {
      signUp(formData);
    }
  };

  // Toggle between Sign In and Sign Up modes
  const toggleMode = () => {
    setAuthMode(authMode === "signIn" ? "signUp" : "signIn");
    setErrorMessage(""); // Clear any messages when switching modes
    setSuccessMessage("");
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
        {/* Display success or error messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <button onClick={toggleMode}>
          {authMode === "signIn" ? "Need an account? Sign Up" : "Already have an account? Sign In"}
        </button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;

