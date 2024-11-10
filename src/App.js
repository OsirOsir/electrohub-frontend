import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import FAQsPage from './components/FAQsPage';
import FeedbackPage from './components/FeedbackPage';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // No need to import Router
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';
import Support from './components/Support';
import Warranty from './components/Warranty';
import OrderSupport from './components/OrderSupport';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CredibilitySection from './components/CredibilitySection';

const App = () => {
function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/items")
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <CredibilitySection />
        <main className="main-content">
          <Routes>
            {/* Customer Support Routes */}
            <Route path="/FAQs" element={<FAQsPage />} />
            <Route path="/Customer-Feedback" element={<FeedbackPage />} />
            <Route path="/" element={<Support />} />
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
        </main>
        <Footer />
      </Router>
      <Navbar addToCart={addToCart} cartItems={cart.length} /> {/* Pass cart item count to Navbar */}
      <div className="main-content">
        <Routes>
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/" element={
            <div>
              <OfferSection items={items} />
              <ItemsAll items={items} addToCart={addToCart} />
            </div>
          } />
          {/* Default route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
