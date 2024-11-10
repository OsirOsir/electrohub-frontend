import React, { useState } from 'react';
import './Navbar.css';
import AuthModal from './AuthModal';
import SearchResults from './SearchResults';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [cartItems, setCartItems] = useState(0); // Cart item count
  const [showAuthModal, setShowAuthModal] = useState(false); // Show/hide auth modal
  const [authMode, setAuthMode] = useState("signIn"); // Toggle between 'signIn' and 'signUp'
  const [username, setUsername] = useState(""); // Store logged-in user's name
  const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility
  const [role, setRole] = useState(""); // Store logged-in user's role
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [showResults, setShowResults] = useState(false);

  // Placeholder function for handling search
  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value.trim(); // Get and trim the search term
  
    // If the search term is empty, do not make the fetch request
    if (!searchTerm) {
      console.log("Please enter a search term");
      return; // Prevent fetching data if search term is empty
    }
  
    try {
      // Fetch items from db.json with the search term
      const response = await fetch(
        `http://localhost:8001/items?item_name_like=${searchTerm}&item_category_like=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data); // Store search results
      setShowResults(true); // Show search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  
    setShowSearch(false); // Hide the search input after submit
  };

  const closeSearchResults = () => {
    setShowResults(false);
    setSearchResults([]); // Clear search results when closing
  };

  // Function to toggle the Auth Modal
  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Function to handle Sign Out
  const handleSignOut = () => {
    setIsAuthenticated(false); // Reset authentication status
    setUsername(""); // Reset username
    setRole(""); // Clear role
    console.log("User signed out");
  };
  // Function to handle successful authentication (sign-in or sign-up)
  const handleAuthChange = (status, username, role) => {
    setIsAuthenticated(status);
    setUsername(username);
    setRole(role);
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
      {/* Site Logo or Name */}
      <div className="navbar-logo">ElectroHub</div>

      {/* Categories */}
      <ul className="navbar-links">
        <li>Smartphones</li>
        <li>PCs</li>
        <li>Tablets</li>
        <li>Smartwatches</li>
        <li>TV & Sound</li>
        <li>Audio</li>
      </ul>

      <div className="navbar-actions">
        {/* Search Bar */}
        <div className="search-bar-container">
          {!showSearch && (
            <button className="search-icon" onClick={() => setShowSearch(true)}>
              <img src="/Icons/search.png" alt="Search Icon" className="search-icon-img" />
            </button>
          )}
          {showSearch && (
            <form className="search-bar" onSubmit={handleSearch}>
              <input type="text" name="search" placeholder="Search Items..." />
              <button type="submit">
                <img src="/Icons/search.png" alt="Search Icon" className="search-icon-img" />
              </button>
            </form>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="welcome-message">{role === "admin" ? "Admin" : username}</span>
              <button onClick={handleSignOut} className="auth-button">
                {/* <img src="/Icons/user.png" alt="User Icon" className="user-icon" />  */}
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => toggleAuthModal("signIn")} className="auth-button">
              <img src="/Icons/user.png" alt="User Icon" className="user-icon" /> {/* Icon only */}
            </button>
          )}
        </div>

        {/* Cart Icon with Checkout and Payment */}
        <div className="navbar-icons" onClick={handleCart}>
          <img src="/Icons/shopping-bag.png" alt="Cart Icon" className="cart-icon" /> <span>{cartItems}</span>
        </div>
      </div>


      {/* Show Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuthChange={handleAuthChange}
        />
      )}
      {/* Display Search Results */}
      {showResults && (
        <SearchResults results={searchResults} onClose={closeSearchResults} />
      )}
    </nav>
  );
};

export default NavBar;
