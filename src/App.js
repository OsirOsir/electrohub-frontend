import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import AboutUs from './components/pages/AboutUs';

function App() {
  const [items, setItems] = useState([]);

  // Fetch items data from API on component mount
  useEffect(() => {
    fetch("http://localhost:8001/items")
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/" element={<div>
              <OfferSection items={items} />
              <ItemsAll items={items} />
            </div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
