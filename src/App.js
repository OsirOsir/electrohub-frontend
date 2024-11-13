import React, { useState, useEffect } from 'react';
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
import Support from './components/Support';
import Warranty from './components/Warranty';
import OrderSupport from './components/OrderSupport';
import CredibilitySection from './components/CredibilitySection';
import SearchResults from './components/SearchResults';
import CategoryItems from './components/CategoryItems';

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch items from server on initial load
  // const [searchTerm, setSearchTerm] = useState(''); // To track the search term
  const [showSearchResults, setShowSearchResults] = useState(false); // To toggle between search results and default items
  const [filteredItems, setFilteredItems] = useState([]); // To store the filtered items based on search
  const [categoryItems, setCategoryItems] = useState([]); // Category-specific items


  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8001/items");
        const data = await response.json();
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8001/items");
        const data = await response.json();
        setItems(data);
        setFilteredItems(data); // Show all items initially
      } catch (error) {
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };
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

    fetchItems();
  }, []);

  // Add item to cart and ensure quantity is valid
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item already in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = updatedCart[existingItemIndex].quantity + 1;
        return updatedCart;
      } else {
        // Add item to cart with quantity of 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search submission to filter items
  const handleSearchSubmit = async (searchTerm) => {
    if (!searchTerm) {
      setShowSearchResults(false);
      setFilteredItems(items); // Reset to show all items if search term is empty
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8001/items`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setFilteredItems(data);
      setShowSearchResults(true); // Show search results
  
      // Filter items based on search term
      const filtered = data.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.item_category.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setFilteredItems(filtered);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching items:', error);
      setFilteredItems([]); // Clear results on error
      setShowSearchResults(false); // Hide search results on error
    }
  };

  // Reset search results and show all items
  const handleSearchClose = () => {
    setShowSearchResults(false);
    setSearchTerm('');
    setShowSearchResults(false); // Hide search results
    setFilteredItems(items); // Reset to show all items
  };

  return (
    <div className="App">
      <Navbar
        addToCart={addToCart}
        cartItems={cart}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        cartItems={cart.length}
        onSearchSubmit={handleSearchSubmit}
      />
      <CategoryItems items={categoryItems} addToCart={addToCart} />
      {/* 2. Render SearchResults based on showSearchResults */}
       {showSearchResults && (
        <SearchResults results={filteredItems} onClose={handleSearchClose} />
      )}
      {/* CategoryItems component to display fetched category-specific items */}
      {categoryItems.length > 0 && (
        <CategoryItems items={categoryItems} onClose={handleCategoryClose} />
      )}
      <CredibilitySection />

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div>
              <OfferSection items={items} />
              <ItemsAll items={items} />
            </div>
          } />
          <Route path="/FAQs" element={<FAQsPage />} />
          <Route path="/Customer-Feedback" element={<FeedbackPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/order-support" element={<OrderSupport />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/item-details/:id" element={<ItemDetails items={items} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Support />
      </main>

      <Footer />
    </div>
  );
};

export default App;
