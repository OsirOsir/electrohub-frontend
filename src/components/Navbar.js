import React, { useState } from 'react';
import './Navbar.css';
import AuthModal from './AuthModal';
import Cart from './Cart';
import Checkout from './Checkout';
// import SearchResults from './SearchResults';
// import CategoryItems from './CategoryItems';

const NavBar = ({ onCategoryClick, addToCart, cartItems, onSearchSubmit, onSearchChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [username, setUsername] = useState(""); // Store logged-in user's name
  const [showAuthModal, setShowAuthModal] = useState(false); // Show/hide auth modal
  const [authMode, setAuthMode] = useState("signIn"); // Toggle between 'signIn' and 'signUp'
  const [role, setRole] = useState(""); // Store logged-in user's role
  const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility
  const [searchTerm, setSearchTerm] = useState(''); // Controlled search term state
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [showResults, setShowResults] = useState(false); // Toggle visibility of search results
  const [showCart, setShowCart] = useState(false); // Toggle visibility of cart
  const [showCheckout, setShowCheckout] = useState(false); // Toggle visibility of checkout
  const [orderDetails, setOrderDetails] = useState(null); // Store order details
  const [categoryItems, setCategoryItems] = useState([]); // State for items in selected category


  // Update search term state on input change
  const handleSearchChange = (event) => {
    console.log(event); // Log the event to inspect its structure
    setSearchTerm(event.target.value);
    if (onSearchChange) onSearchChange(event.target.value); // Trigger onSearchChange prop if passed
};

  // Handle Search Submit
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const term = searchTerm.trim();

    if (!term) {
      console.log("Please enter a search term");
      return;
    }

    if (onSearchSubmit) onSearchSubmit(term); // Trigger onSearchSubmit prop to fetch data in App.js
    setShowSearch(false); // Hide the search input after submit
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(`http://localhost:8001/items?main_category=${category}`);
      const data = await response.json();
      setCategoryItems(data); // Store items of selected category
    } catch (error) {
      console.error("Error fetching items by category:", error);
    }
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
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
    console.log("User signed out");
  };

  // Function to handle successful authentication
  const handleAuthChange = (status, username, role) => {
    setIsAuthenticated(status);
    setUsername(username);
    setRole(role);
  };

  // Toggle visibility of search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Handle Cart and Checkout
  const handleCart = () => {
    setShowCart(!showCart);
  };

  const handleCheckout = (billingInfo) => {
    const paymentInfo = {
      ...billingInfo,
      paymentStatus: 'Success',
      transactionId: Math.random().toString(36).substring(7),
      totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    const invoice = {
      transactionId: paymentInfo.transactionId,
      items: cartItems,
      totalAmount: paymentInfo.totalAmount,
      billingInfo,
    };

    setOrderDetails(invoice);
    setShowCheckout(false);
    alert(`Payment Successful! Order ID: ${paymentInfo.transactionId}`);
  };

  return (
    <nav className="navbar">
      {/* Site Logo or Name */}
      <div className="navbar-logo">
        <a href="/" className="logo-link">ElectroHub</a> {/* Navigates to the root path */}
      </div>

      {/* Categories */}
      <ul className="navbar-links">
        <li onClick={() => onCategoryClick('Smartphones')}>Smartphones</li>
        <li onClick={() => onCategoryClick('PCs')}>PCs</li>
        <li onClick={() => onCategoryClick('Tablets')}>Tablets</li>
        <li onClick={() => onCategoryClick('Smartwatches')}>Smartwatches</li>
        <li onClick={() => onCategoryClick('TV & Sound')}>TV & Sound</li>
        <li onClick={() => onCategoryClick('Audio')}>Audio</li>
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
              <input
                type="text"
                name="search"
                placeholder="Search Items..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
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
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => toggleAuthModal("signIn")} className="auth-button">
              <img src="/Icons/user.png" alt="User Icon" className="user-icon" />
            </button>
          )}
        </div>

        {/* Cart Icon with Checkout and Payment */}
        <div className="navbar-icons" onClick={handleCart}>
          <img src="/Icons/shopping-bag.png" alt="Cart Icon" className="cart-icon" />
          <span>{cartItems.length}</span>
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

      {/* Show Cart */}
      {showCart && (
        <Cart
          cartItems={cartItems}
          username={username}
          onClose={() => setShowCart(false)}
          onCheckout={() => setShowCheckout(true)}
        />
      )}

      {/* Show Checkout */}
      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          username={username}
          handleCheckout={handleCheckout}
        />
      )}

      {/* Show Order Invoice */}
      {orderDetails && (
        <div className="invoice">
          <h2>Invoice</h2>
          <p>Order ID: {orderDetails.transactionId}</p>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
          <p>Total: ${orderDetails.totalAmount}</p>
          <p>Billing Address: {orderDetails.billingInfo.address}, {orderDetails.billingInfo.city}, {orderDetails.billingInfo.country}</p>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
