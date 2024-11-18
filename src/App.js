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
import ShowModals from './components/Modals';

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  // Fetch items from the server on initial load
  useEffect(() => {
    // const fetchItems = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch("http://localhost:8001/items");
    //     const data = await response.json();
    //     setItems(data);
    //     setFilteredItems(data); // Show all items initially
    //   } catch (error) {
    //     setError("Failed to fetch items.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchItems();
    fetch("http://127.0.0.1:5555/api/items")
    .then(response => response.json())
    .then(data => setItems(data));
  }, []);

  // Handle category selection
  const handleCategoryClick = async (category) => {
    try {
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

  // Add item to cart and ensure quantity is valid
  // Add item to cart and ensure quantity is valid
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex >= 0) {
        // Item already in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add item to cart with quantity of 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Handle search input change
  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

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
    setFilteredItems(items); // Reset to show all items
  };

  return (
    <div className="App">
      <Navbar
        addToCart={addToCart}
        cartItems={cart}
        onSearchSubmit={handleSearchSubmit}  //Pass function to Navbar
        onCategoryClick={handleCategoryClick} // Pass the handleCategoryClick function
      />
      {/* Render SearchResults based on showSearchResults */}
      {showSearchResults && (
        <SearchResults results={filteredItems} onClose={handleSearchClose} addToCart={addToCart}/>
      )}

      {/* CategoryItems component to display fetched category-specific items */}
      {categoryItems.length > 0 && (
        <CategoryItems items={categoryItems} onClose={handleCategoryClose} addToCart={addToCart}/>
      )}

      <CredibilitySection />

      <main className="main-content">
        <OfferSection items={items} addToCart={addToCart} />
        <ItemsAll items={items} addToCart={addToCart} />
        <Routes>
          <Route path="/item-details/:id" element={<ItemDetails />} />
          <Route path="/modify-items-modals" element={<ShowModals />} />
        </Routes>
        {/* <Routes>
          <Route path="/modify-items-modals" element={<ShowModals />} />
        </Routes> */}
          <Routes>
          {/* <Route path="/" element={
            <div>
              <OfferSection items={items} addToCart={addToCart}/>
              <ItemsAll items={items} addToCart={addToCart} />
            </div>
          } /> */}
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
