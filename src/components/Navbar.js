import React, { useState, useEffect } from 'react';
import './Navbar.css';
import AuthModal from './AuthModal';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';

const NavBar = ({ onCategoryClick, cartItems, onSearchSubmit, onSearchChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signIn");
  const [role, setRole] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser.username);
      setRole(storedUser.role);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const userData = { username, role };
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, username, role]);

const NavBar = ({ onCategoryClick, addToCart, cartItems, onSearchSubmit, onSearchChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [username, setUsername] = useState(""); // Store logged-in user's name
  const [showAuthModal, setShowAuthModal] = useState(false); // Show/hide auth modal
  const [authMode, setAuthMode] = useState("signIn"); // Toggle between 'signIn' and 'signUp'
  const [role, setRole] = useState(""); // Store logged-in user's role
  const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility
  const [searchTerm, setSearchTerm] = useState(''); // Controlled search term state
  const [showCart, setShowCart] = useState(false); // Toggle visibility of cart
  const [showCheckout, setShowCheckout] = useState(false); // Toggle visibility of checkout
  const [orderDetails, setOrderDetails] = useState(null); // Store order details
  const [categoryItems, setCategoryItems] = useState([]); // State for items in selected category


  // Update search term state on input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearchChange) onSearchChange(event.target.value);
  };
    console.log(event); // Log the event to inspect its structure
    if (event && event.target) {
      setSearchTerm(event.target.value);
      if (onSearchChange) onSearchChange(event.target.value); // Trigger onSearchChange prop if passed
    }
  };
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   onSearchSubmit(searchTerm);
  // };

  const handleSearch = (event) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    if (onSearchSubmit) onSearchSubmit(term);
    setShowSearch(false);

    if (!term) {
      console.log("Please enter a search term");
      return;
    }

    if (onSearchSubmit) onSearchSubmit(term); // Trigger onSearchSubmit prop to fetch data in App.js
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

  // const closeSearchResults = () => {
  //   setShowResults(false);
  //   setSearchResults([]); // Clear search results when closing
  // };

  // Function to toggle the Auth Modal
  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
  };

  const handleAuthChange = (status, username, role) => {
    setIsAuthenticated(status);
    setUsername(username);
    setRole(role);
  };

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const addToCart = (item) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.item_name === item.item_name);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    console.log('Updated Cart:', updatedCart);
  };

  const proceedToCheckout = (updatedCartItems, totalAmount) => {
    console.log('Proceeding to checkout with:', updatedCartItems, totalAmount);
    setShowCartModal(false); 
    setShowCheckoutModal(true); 
  };

  const closeCheckoutModal = () => {
    setShowCheckoutModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" className="logo-link">ElectroHub</a>
      </div>

      <ul className="navbar-links">
        <li onClick={() => onCategoryClick('Smartphones')}>Smartphones</li>
        <li onClick={() => onCategoryClick('PCs')}>PCs</li>
        <li onClick={() => onCategoryClick('Tablets')}>Tablets</li>
        <li onClick={() => onCategoryClick('Smartwatches')}>Smartwatches</li>
        <li onClick={() => onCategoryClick('TV & Sound')}>TV & Sound</li>
        <li onClick={() => onCategoryClick('Audio')}>Audio</li>
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

        <div className="navbar-icons" onClick={toggleCartModal}>
          <img src="/Icons/shopping-bag.png" alt="Cart Icon" className="cart-icon" />
          <span>{cartItems.length}</span>
        </div>
      </div>

      {showCartModal && (
        <CartModal
          cartItems={cartItems}
          onClose={toggleCartModal}
          username={username}
          proceedToCheckout={proceedToCheckout}
        />
      )}

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuthChange={handleAuthChange}
        />
      )}

      {showCheckoutModal && (
        <CheckoutModal
          onClose={closeCheckoutModal}
        />
      )}
    </nav>
  );
};

export default NavBar;
