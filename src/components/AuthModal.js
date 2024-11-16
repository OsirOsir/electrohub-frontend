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
    setSuccessMessage(""); // Clear success message on input change
  };

   // Sign Up function
   const signUp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Successfully signed up as ${data.name}`);
        onAuthChange(true, data.name, data.role); // Update authentication state
        setTimeout(() => onClose(), 2000); // Close modal after 2 seconds
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Sign-up failed. Try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while signing up. Please try again.");
    }
  };

  // Sign In function
  const signIn = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Welcome back, ${data.user.name}`);
        onAuthChange(true, data.user.name, data.user.role); // Update parent component
        setTimeout(() => onClose(), 2000); // Close modal after 2 seconds
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Login failed. Check your credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in. Please try again.");
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
          {authMode === "signUp" && (
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
          
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

