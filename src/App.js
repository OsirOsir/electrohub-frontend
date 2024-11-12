import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
import FAQsPage from './components/FAQsPage';
import FeedbackPage from './components/FeedbackPage';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';
import Support from './components/Support'; // import Support as the customer support card
import Warranty from './components/Warranty';
import OrderSupport from './components/OrderSupport';
import CredibilitySection from './components/CredibilitySection';
import SearchResults from './components/SearchResults'; // Import the SearchResults component
import CategoryItems from './components/CategoryItems';

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // To track the search term
  const [filteredItems, setFilteredItems] = useState([]); // To store the filtered items based on search
  const [showSearchResults, setShowSearchResults] = useState(false); // To toggle between search results and default items
  const [categoryItems, setCategoryItems] = useState([]); // Category-specific items


  useEffect(() => {
    fetch("http://localhost:8001/items")
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data); // Initially, show all items
      });
  }, []);

  const handleCategoryClick = async (category) => {
    try {
      // Fetch items by category
      const response = await fetch(`http://localhost:8001/items?main_category=${category}`);
      const data = await response.json();
      setCategoryItems(data); // Update the categoryItems state
    } catch (error) {
      console.error("Error fetching items by category:", error);
    }
  };

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filtered = items.filter(item =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setShowSearchResults(true); // Show search results when search is performed
  };

  const handleSearchClose = () => {
    setShowSearchResults(false); // Hide search results
    setSearchTerm(''); // Clear the search term
    setFilteredItems(items); // Reset to show all items
  };

  return (
    <div className="App">
      <Navbar
        addToCart={addToCart}
        cartItems={cart.length}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onCategoryClick={handleCategoryClick} // Pass function to NavBar
      />
      {/* CategoryItems component to display fetched category-specific items */}
      <CategoryItems items={categoryItems} addToCart={addToCart} />
      <CredibilitySection />

      {/* Main content */}
      <main className="main-content">
        <Routes>
          {/* Shopping Pages (Route for homepage) */}
          <Route path="/" element={
            <div>
              <OfferSection items={items} />
              {!showSearchResults ? (
                <ItemsAll items={filteredItems} addToCart={addToCart} />
              ) : (
                <SearchResults results={filteredItems} onClose={handleSearchClose} />
              )}
            </div>
          } />

          {/* Customer Support Pages */}
          <Route path="/FAQs" element={<FAQsPage />} />
          <Route path="/Customer-Feedback" element={<FeedbackPage />} />
          <Route path="/support" element={<Support />} /> {/* keep this route for standalone access */}
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/order-support" element={<OrderSupport />} />

          {/* Other Pages */}
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Customer Support Card */}
        <Support />
      </main>

      <Footer />
    </div>
  );
};

export default App;
