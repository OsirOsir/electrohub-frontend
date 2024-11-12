import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
import ItemDetails from './components/ItemDetails';
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
  // const [searchTerm, setSearchTerm] = useState(''); // To track the search term
  const [showSearchResults, setShowSearchResults] = useState(false); // To toggle between search results and default items
  const [filteredItems, setFilteredItems] = useState([]); // To store the filtered items based on search
  const [categoryItems, setCategoryItems] = useState([]); // Category-specific items


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8001/items");
        const data = await response.json();
        setItems(data);
        setFilteredItems(data); // Initially, show all items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
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

  const handleCategoryClose = () => {
    setCategoryItems([]); // Clear the category items to hide the component
  };

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const handleSearchSubmit = async (searchTerm) => {
    if (!searchTerm) {
      setShowSearchResults(false);
      setFilteredItems(items); // Reset to show all items if search term is empty
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8001/items?item_name_like=${searchTerm}&item_category_like=${searchTerm}`
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setFilteredItems(data);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setFilteredItems([]); // Clear results on error
      setShowSearchResults(false); // Hide search results on error
    }
  };

  const handleSearchClose = () => {
    setShowSearchResults(false); // Hide search results
    setFilteredItems(items); // Reset to show all items
  };

  return (
    <div className="App">
      <Navbar
        addToCart={addToCart}
        cartItems={cart.length}
        onSearchSubmit={handleSearchSubmit}
        onCategoryClick={handleCategoryClick} // Pass function to NavBar
      />
      {/* 2. Render SearchResults based on showSearchResults */}
       {showSearchResults && (
        <SearchResults results={filteredItems} onClose={handleSearchClose} />
      )}
      {/* CategoryItems component to display fetched category-specific items */}
      {categoryItems.length > 0 && (
        <CategoryItems items={categoryItems} onClose={handleCategoryClose} />
      )}
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
