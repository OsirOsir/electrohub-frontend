import React, { useState } from 'react';
import './Navbar.css';
import AuthModal from './AuthModal'; 

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [cartItems, setCartItems] = useState(0); // Cart item count
  const [showAuthModal, setShowAuthModal] = useState(false); // Show/hide auth modal
  const [authMode, setAuthMode] = useState("signIn"); // Toggle between 'signIn' and 'signUp'
  const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility

  // Placeholder function for handling search
  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    console.log("Searching for:", searchTerm);
  };

  // Function to toggle the Auth Modal
  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Function to handle Sign Out
  const handleSignOut = () => {
    setIsAuthenticated(false); // Reset authentication status
    console.log("User signed out");
  };

  // Placeholder for handling cart actions
  const handleCart = () => {
    console.log("Navigating to cart and checkout");
  };

  // Toggle the visibility of the search input
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">ELECTROHUB</div>

      {/* Categories */}
      <ul className="navbar-links">
        <li>Smartphones</li>
        <li>PCs</li>
        <li>Tablets</li>
        <li>Smartwatches</li>
        <li>TV & Sound</li>
        <li>Audio</li>
      </ul>

      {/* Search Bar with Icon */}
      <div className="search-bar-container">
        {!showSearch && (
          <button className="search-icon" onClick={toggleSearch}>🔍</button>
        )}
        {showSearch && (
          <form className="search-bar" onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Search Items..." />
            <button type="submit">🔍</button>
          </form>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <button onClick={() => toggleAuthModal("signIn")}>Sign In / Sign Up</button>
        )}
      </div>

      {/* Cart Icon with Checkout and Payment */}
      <div className="navbar-icons" onClick={handleCart}>
        🛒 <span>{cartItems}</span>
      </div>

      {/* Show Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuthChange={(status) => setIsAuthenticated(status)}
        />
      )}
    </nav>
  );
};

export default NavBar;
