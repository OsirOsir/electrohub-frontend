import React, { useState } from 'react';
import './Navbar.css';
import AuthModal from './AuthModal';
import Cart from './Cart'; 
import Checkout from './Checkout'; 

const NavBar = ({ addToCart, cartItems }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signIn");
  const [username, setUsername] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleSearch = (event) => {
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
    const searchTerm = event.target.search.value;
    console.log("Searching for:", searchTerm);
    setShowSearch(false);
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

  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUsername("");
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

  const handleCart = () => {
    setShowCart(!showCart);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
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
      <div className="navbar-logo">ElectroHub</div>
      <ul className="navbar-links">
        <li>Smartphones</li>
        <li>PCs</li>
        <li>Tablets</li>
        <li>Smartwatches</li>
        <li>TV & Sound</li>
        <li>Audio</li>
      </ul>

      <div className="navbar-actions">
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

        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="welcome-message">Welcome, {username}</span>
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

        <div className="navbar-icons" onClick={handleCart}>
          <img src="/Icons/shopping-bag.png" alt="Cart Icon" className="cart-icon" />
          <span>{cartItems.length}</span>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuthChange={(status, username) => {
            setIsAuthenticated(status);
            setUsername(username);
          }}
          onAuthChange={handleAuthChange}
        />
      )}

      {showCart && (
        <Cart
          cartItems={cartItems}
          username={username}
          onClose={() => setShowCart(false)}
          onCheckout={() => setShowCheckout(true)}
        />
      )}

      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          username={username}
          handleCheckout={handleCheckout}
        />
      )}

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
      {/* Display Search Results */}
      {showResults && (
        <SearchResults results={searchResults} onClose={closeSearchResults} />
      )}
    </nav>
  );
};

export default NavBar;
