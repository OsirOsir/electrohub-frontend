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
    event.preventDefault();
    const searchTerm = event.target.search.value;
    console.log("Searching for:", searchTerm);
    setShowSearch(false);
  };

  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    console.log("User signed out");
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
            <button className="search-icon" onClick={toggleSearch}>
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
    </nav>
  );
};

export default NavBar;
